// lib/crm.ts — Création d'une demande d'intervention (CRM ou email)

import { sendInterventionEmail } from "@/lib/notify";

export interface InterventionInput {
  nom: string;
  telephone: string;
  localisation: string;
  type_probleme: "panne" | "accident" | "crevaison" | "batterie" | "carburant" | "remorquage" | "autre";
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

function makeRef(): string {
  return `SM-${Date.now().toString(36).toUpperCase()}`;
}

async function pushToCrm(
  ref: string,
  input: InterventionInput,
): Promise<InterventionResult | null> {
  const url = process.env.CRM_API_URL;
  const key = process.env.CRM_API_KEY;

  if (!url || !key || url.includes("...")) return null;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        ...input,
        ref,
        source: "chatbot",
        created_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("[CRM]", res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as { ref?: string };
    return { success: true, ref: data.ref ?? ref };
  } catch (err) {
    console.error("[CRM]", err);
    return null;
  }
}

/**
 * Crée une demande d'intervention : CRM si configuré, sinon notification email Resend.
 */
export async function createIntervention(input: InterventionInput): Promise<InterventionResult> {
  const ref = makeRef();

  const crmResult = await pushToCrm(ref, input);
  if (crmResult?.success) return crmResult;

  const emailed = await sendInterventionEmail({ ref, ...input, source: "chatbot" });
  if (emailed) return { success: true, ref };

  return {
    success: false,
    error: "Impossible d'enregistrer la demande pour le moment.",
  };
}

/** Notification formulaire contact (même canal email). */
export async function notifyContactForm(data: {
  nom: string;
  tel: string;
  lieu: string;
  typePanne: string;
  message?: string;
}): Promise<boolean> {
  const ref = makeRef();
  return sendInterventionEmail({
    ref,
    source: "formulaire",
    nom: data.nom,
    telephone: data.tel,
    localisation: data.lieu,
    type_probleme: mapTypePanne(data.typePanne),
    details: data.message,
  });
}

function mapTypePanne(type: string): InterventionInput["type_probleme"] {
  const map: Record<string, InterventionInput["type_probleme"]> = {
    batterie: "batterie",
    crevaison: "crevaison",
    remorquage: "remorquage",
    moto: "remorquage",
    "panne-moteur": "panne",
    transport: "remorquage",
    autre: "autre",
  };
  return map[type] ?? "autre";
}
