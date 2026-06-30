// lib/notify.ts — Notification des demandes d'intervention (email Resend)

import type { InterventionInput } from "@/lib/crm";

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface InterventionNotification extends InterventionInput {
  ref: string;
  source: "formulaire" | "chatbot";
}

/** Envoie la demande par email via Resend. Retourne true si envoyé. */
export async function sendInterventionEmail(
  data: InterventionNotification,
): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;

  if (!resendKey || !recipient) {
    console.log("[DEV] Intervention non envoyée (Resend non configuré):", data);
    return process.env.NODE_ENV !== "production";
  }

  const from =
    process.env.RESEND_FROM ?? "SM Dépannage <onboarding@resend.dev>";

  const lines = [
    ["Référence", data.ref],
    ["Source", data.source],
    ["Nom", sanitize(data.nom)],
    ["Téléphone", sanitize(data.telephone)],
    ["Localisation", sanitize(data.localisation)],
    ["Type", data.type_probleme],
    ...(data.vehicule ? [["Véhicule", sanitize(data.vehicule)]] : []),
    ...(data.urgence != null ? [["Urgence", data.urgence ? "Oui" : "Non"]] : []),
    ...(data.date_souhaitee ? [["Date souhaitée", sanitize(data.date_souhaitee)]] : []),
    ...(data.details ? [["Détails", sanitize(data.details)]] : []),
  ] as const;

  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = lines
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: `[${data.ref}] Intervention ${data.type_probleme} — ${sanitize(data.nom)}`,
      text,
      html: `<h2>Nouvelle demande d'intervention</h2><table>${html}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[Resend]", await res.text());
    return false;
  }

  return true;
}
