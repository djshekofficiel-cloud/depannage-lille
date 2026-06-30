// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { notifyContactForm } from "@/lib/crm";

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

    const ok = await notifyContactForm({
      nom: sanitize(nom).substring(0, 100),
      tel: sanitize(tel).substring(0, 25),
      lieu: sanitize(lieu).substring(0, 300),
      typePanne: sanitize(typePanne).substring(0, 100),
      message:
        typeof message === "string" ? sanitize(message).substring(0, 800) : undefined,
    });

    if (!ok) {
      return NextResponse.json(
        { error: "Erreur envoi. Appelez-nous directement." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
