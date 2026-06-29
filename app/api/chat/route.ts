// app/api/chat/route.ts — Route serveur du chatbot (Mistral, garde la clé secrète, streame la réponse)

import { SYSTEM_PROMPT, PHONE } from '@/lib/systemPrompt';
import { createIntervention, type InterventionInput } from '@/lib/crm';
import { villes } from '@/lib/villes';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-small-latest';

// Tool function (format OpenAI/Mistral) — déclenché UNIQUEMENT par le modèle.
const TOOL = {
  type: 'function',
  function: {
    name: 'creer_intervention',
    description:
      "Crée une demande d'intervention dépannage dans le CRM une fois toutes les infos collectées",
    parameters: {
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
        date_souhaitee: {
          type: 'string',
          description: 'Date/créneau confirmé avec le client si intervention planifiée (ex: "mardi 30 juin matin", "2026-07-02 14h")',
        },
        details: { type: 'string' },
      },
      required: ['nom', 'telephone', 'localisation', 'type_probleme'],
    },
  },
};

interface ChatMsg {
  role: string;
  content: string | null;
  tool_calls?: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
  name?: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return new Response(
      `Le service est momentanément indisponible. Appelez-nous directement au ${PHONE}.`,
      { status: 503 },
    );
  }

  let payload: { messages?: { role: string; content: string }[] };
  try {
    payload = await req.json();
  } catch {
    return new Response('Requête invalide.', { status: 400 });
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : [];
  if (incoming.length === 0) {
    return new Response('Aucun message fourni.', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Date/heure réelles (Europe/Paris) pour permettre au bot de proposer des créneaux concrets.
      const now = new Date();
      const dateFr = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris',
      }).format(now);
      const heureFr = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
      }).format(now);
      const dateContext = `CONTEXTE TEMPS RÉEL : nous sommes le ${dateFr}, il est ${heureFr} (heure de Paris). Utilise cette date pour proposer des créneaux précis (demain, jours suivants).`;

      // Liste exacte des villes couvertes (source unique : lib/villes.ts).
      const villesContext = `VILLES COUVERTES (zone d'intervention exacte) : ${villes
        .map((v) => `${v.nom} (${v.cp})`)
        .join(', ')}. Si une ville n'est pas dans cette liste, dis-le honnêtement et propose une vérification au ${PHONE}.`;

      const convo: ChatMsg[] = [
        { role: 'system', content: `${SYSTEM_PROMPT}\n\n${dateContext}\n\n${villesContext}` },
        ...incoming.map((m) => ({ role: m.role, content: m.content })),
      ];

      try {
        // Boucle agentique bornée : continue tant que le modèle appelle des tools.
        for (let guard = 0; guard < 4; guard++) {
          const res = await fetch(MISTRAL_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: MODEL,
              max_tokens: 1024,
              temperature: 0.3, // réponses factuelles et stables (bot de service)
              stream: true,
              tools: [TOOL],
              tool_choice: 'auto',
              messages: convo,
            }),
          });

          if (!res.ok || !res.body) {
            controller.enqueue(
              encoder.encode(`Désolé, service indisponible. Appelez-nous au ${PHONE}.`),
            );
            break;
          }

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let finishReason: string | null = null;
          let assistantText = '';
          const toolAcc: Record<number, { id: string; name: string; args: string }> = {};

          let streamDone = false;
          while (!streamDone) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const data = trimmed.slice(5).trim();
              if (data === '[DONE]') {
                streamDone = true;
                break;
              }
              let json: {
                choices?: Array<{
                  delta?: { content?: string; tool_calls?: Array<{ index?: number; id?: string; function?: { name?: string; arguments?: string } }> };
                  finish_reason?: string | null;
                }>;
              };
              try {
                json = JSON.parse(data);
              } catch {
                continue;
              }
              const choice = json.choices?.[0];
              if (!choice) continue;
              const delta = choice.delta ?? {};

              if (delta.content) {
                assistantText += delta.content;
                controller.enqueue(encoder.encode(delta.content)); // effet « en train d'écrire »
              }
              if (delta.tool_calls) {
                for (const tc of delta.tool_calls) {
                  const idx = tc.index ?? 0;
                  toolAcc[idx] ??= { id: '', name: '', args: '' };
                  if (tc.id) toolAcc[idx].id = tc.id;
                  if (tc.function?.name) toolAcc[idx].name = tc.function.name;
                  if (tc.function?.arguments) toolAcc[idx].args += tc.function.arguments;
                }
              }
              if (choice.finish_reason) finishReason = choice.finish_reason;
            }
          }

          const calls = Object.values(toolAcc).filter((c) => c.name);

          // Sécurité : on ne crée une intervention QUE sur un vrai tool_call du modèle.
          if (finishReason === 'tool_calls' && calls.length > 0) {
            convo.push({
              role: 'assistant',
              content: assistantText || '',
              tool_calls: calls.map((c) => ({
                id: c.id,
                type: 'function',
                function: { name: c.name, arguments: c.args || '{}' },
              })),
            });

            for (const c of calls) {
              if (c.name !== 'creer_intervention') continue;
              let result: unknown;
              try {
                const input = JSON.parse(c.args || '{}') as InterventionInput;
                result = await createIntervention(input);
              } catch {
                result = { success: false, error: `CRM indisponible — appeler le ${PHONE}` };
              }
              convo.push({
                role: 'tool',
                tool_call_id: c.id,
                name: c.name,
                content: JSON.stringify(result),
              });
            }
            continue; // reboucle : le modèle confirme au client à partir du tool_result
          }

          break;
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
