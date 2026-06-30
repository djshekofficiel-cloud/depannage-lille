// app/api/send-whatsapp/route.ts — Envoie un message WhatsApp via CallMeBot (sécurisé, clé serveur)

export const runtime = 'nodejs';
export const maxDuration = 10;

const PHONE = '33767878034'; // Format international sans + (07 67 87 80 34)
const APIKEY = '6674209'; // Clé API CallMeBot activée

export async function POST(req: Request) {
  try {
    // Vérifier la clé API
    if (!APIKEY) {
      return new Response(
        JSON.stringify({ error: 'Clé API CallMeBot non configurée' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message vide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Appeler l'API CallMeBot
    const response = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodeURIComponent(message)}&apikey=${APIKEY}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => 'Erreur inconnue');
      console.error('CallMeBot error:', text);
      return new Response(
        JSON.stringify({ error: 'Erreur CallMeBot: ' + text }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'WhatsApp envoyé avec succès' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur: ' + String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
