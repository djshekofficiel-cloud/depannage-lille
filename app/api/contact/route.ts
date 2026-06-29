// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidTel(tel: string): boolean {
  return /^[0-9+\s\-.]{8,20}$/.test(tel);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, tel, lieu, typePanne, message, website } = body;

    // Honeypot anti-bot
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!nom || typeof nom !== "string" || nom.trim().length < 2) {
      return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
    }
    if (!tel || !isValidTel(tel)) {
      return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
    }
    if (!lieu || typeof lieu !== "string" || lieu.trim().length < 3) {
      return NextResponse.json({ error: "Lieu de la panne requis." }, { status: 400 });
    }
    if (!typePanne || typeof typePanne !== "string") {
      return NextResponse.json({ error: "Type de panne requis." }, { status: 400 });
    }

    const safNom = sanitize(nom).substring(0, 100);
    const safTel = sanitize(tel).substring(0, 25);
    const safLieu = sanitize(lieu).substring(0, 300);
    const safTypePanne = sanitize(typePanne).substring(0, 100);
    const safMessage = typeof message === "string" ? sanitize(message).substring(0, 800) : "";

    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL;

    if (!resendKey || !recipientEmail) {
      console.log("[DEV] Intervention:", { safNom, safTel, safLieu, safTypePanne, safMessage });
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const authHeader = "Bearer " + resendKey;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SMDepannage <contact@votredomaine.fr>",
        to: [recipientEmail],
        subject: "Intervention - " + safTypePanne + " - " + safNom,
        html: "<h2>Demande intervention</h2><p>Nom: " + safNom + "</p><p>Tel: " + safTel + "</p><p>Lieu: " + safLieu + "</p><p>Type: " + safTypePanne + "</p><p>Message: " + safMessage + "</p>",
        text: "Nom: " + safNom + "\nTel: " + safTel + "\nLieu: " + safLieu + "\nType: " + safTypePanne + "\nMessage: " + safMessage,
      }),
    });

    if (!emailRes.ok) {
      console.error("Resend error:", await emailRes.text());
      return NextResponse.json({ error: "Erreur envoi. Appelez-nous." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
