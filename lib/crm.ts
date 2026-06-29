// lib/crm.ts — Création d'une demande d'intervention dans le CRM

export interface InterventionInput {
  nom: string;
  telephone: string;
  localisation: string;
  type_probleme: 'panne' | 'accident' | 'crevaison' | 'batterie' | 'carburant' | 'remorquage' | 'autre';
  vehicule?: string;
  urgence?: boolean;
  date_souhaitee?: string;
  details?: string;
}

export interface InterventionResult {
  success: boolean;
  ref?: string;
  error?: string;
}

/**
 * Crée une demande d'intervention dans le CRM / système d'intervention.
 *
 * IMPLÉMENTATION MOCKÉE pour le moment — elle logge la demande et renvoie une
 * référence factice. À remplacer par un vrai POST vers CRM_API_URL.
 */
export async function createIntervention(input: InterventionInput): Promise<InterventionResult> {
  const ref = `SM-${Date.now().toString(36).toUpperCase()}`;

  // TODO: brancher le vrai CRM ici
  // const res = await fetch(process.env.CRM_API_URL!, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
  //   },
  //   body: JSON.stringify({ ...input, ref, source: 'chatbot', created_at: new Date().toISOString() }),
  // });
  // if (!res.ok) throw new Error(`CRM ${res.status}`);
  // const data = await res.json();
  // return { success: true, ref: data.ref ?? ref };

  console.log('[CRM mock] Nouvelle intervention :', { ref, ...input });

  return { success: true, ref };
}
