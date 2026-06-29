// app/api/chat/route.ts — Route serveur du chatbot (garde la clé secrète, streame la réponse)

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, PHONE } from '@/lib/systemPrompt';
import { createIntervention, type InterventionInput } from '@/lib/crm';

export const runtime = 'nodejs';
export const maxDuration = 30;

const CREER_INTERVENTION: Anthropic.Tool = {
  name: 'creer_intervention',
  description:
    "Crée une demande d'intervention dépannage dans le CRM une fois toutes les infos collectées",
  input_schema: {
    type: 'object',
    properties: {
      nom: { type: 'string' },
      telephone: { type: 'string' },
      localisation: {
        type: 'string',
        description: 'Ville/route/repère, autoroute + sens si applicable',
      },
      type_probleme: {
        type: 'string',
        enum: ['panne', 'accident', 'crevaison', 'batterie', 'carburant', 'remorquage', 'autre'],
      },
      vehicule: { type: 'string' },
      urgence: { type: 'boolean' },
      details: { type: 'string' },
    },
    required: ['nom', 'telephone', 'localisation', 'type_probleme'],
  },
};

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      `Le service est momentanément indisponible. Appelez-nous directement au ${PHONE}.`,
      { status: 503 },
    );
  }

  let payload: { messages?: Anthropic.MessageParam[] };
  try {
    payload = await req.json();
  } catch {
    return new Response('Requête invalide.', { status: 400 });
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : [];
  if (incoming.length === 0) {
    return new Response('Aucun message fourni.', { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const convo: Anthropic.MessageParam[] = [...incoming];
      try {
        // Boucle agentique : continue tant que Claude appelle des tools.
        while (true) {
          const messageStream = client.messages.stream({
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            tools: [CREER_INTERVENTION],
            messages: convo,
          });

          // Streaming « en train d'écrire » vers le front.
          messageStream.on('text', (delta) => {
            controller.enqueue(encoder.encode(delta));
          });

          const final = await messageStream.finalMessage();

          // Pas d'appel de tool → réponse terminée.
          if (final.stop_reason !== 'tool_use') break;

          // Sécurité : on ne crée une intervention QUE sur un vrai tool_use de Claude.
          convo.push({ role: 'assistant', content: final.content });
          const toolResults: Anthropic.ToolResultBlockParam[] = [];

          for (const block of final.content) {
            if (block.type === 'tool_use' && block.name === 'creer_intervention') {
              try {
                const result = await createIntervention(block.input as InterventionInput);
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: block.id,
                  content: JSON.stringify(result),
                });
              } catch {
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: block.id,
                  content: `Le CRM est indisponible. Demande au client d'appeler le ${PHONE}.`,
                  is_error: true,
                });
              }
            }
          }

          convo.push({ role: 'user', content: toolResults });
          // On reboucle : Claude confirme au client à partir du tool_result.
        }
      } catch {
        controller.enqueue(
          encoder.encode(`\n\nDésolé, une erreur est survenue. Appelez-nous au ${PHONE}.`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
