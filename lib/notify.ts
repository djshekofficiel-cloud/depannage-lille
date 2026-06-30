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
    ...(data.plaque ? [["Plaque", sanitize(data.plaque)]] : []),
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

// Convertit un numéro FR en format wa.me (international, sans + ni espaces).
function toWaNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("33")) return digits;
  if (digits.startsWith("0")) return "33" + digits.slice(1);
  return digits;
}

/**
 * Notifie le gérant par WhatsApp via CallMeBot (best-effort).
 * Le message contient un lien wa.me 1-clic vers le numéro du client.
 */
export async function sendInterventionWhatsApp(
  data: InterventionNotification,
): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE; // numéro WhatsApp du gérant (international)
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.log("[DEV] WhatsApp non envoyé (CallMeBot non configuré):", data.ref);
    return false;
  }

  const wa = toWaNumber(sanitize(data.telephone));
  const lines = [
    `🚗 NOUVELLE DEMANDE ${data.ref}${data.urgence ? " ⚠️ URGENT" : ""}`,
    ``,
    `👤 ${sanitize(data.nom)}`,
    `📞 ${sanitize(data.telephone)}`,
    `📍 ${sanitize(data.localisation)}`,
    `🔧 Panne : ${data.type_probleme}`,
    ...(data.vehicule ? [`🚙 Véhicule : ${sanitize(data.vehicule)}`] : []),
    ...(data.plaque ? [`🔖 Plaque : ${sanitize(data.plaque)}`] : []),
    ...(data.date_souhaitee ? [`🗓️ Créneau : ${sanitize(data.date_souhaitee)}`] : []),
    ...(data.details ? [`📝 ${sanitize(data.details)}`] : []),
    ``,
    `➡️ Rappeler le client : https://wa.me/${wa}`,
  ];

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(lines.join("\n"))}` +
    `&apikey=${encodeURIComponent(apikey)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[CallMeBot]", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[CallMeBot]", err);
    return false;
  }
}
