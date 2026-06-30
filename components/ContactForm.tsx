"use client";
// components/ContactForm.tsx
// Formulaire de demande d'intervention avec honeypot anti-bot
// Validation côté client + renvoi vers l'API route /api/contact

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      tel: (form.elements.namedItem("tel") as HTMLInputElement).value,
      lieu: (form.elements.namedItem("lieu") as HTMLInputElement).value,
      typePanne: (form.elements.namedItem("typePanne") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value, // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("✅ Votre demande a bien été envoyée ! Nous vous rappelons dans les plus brefs délais.");
        form.reset();
      } else {
        const err = await res.json();
        setStatus("error");
        setMessage(err.error || "Une erreur est survenue. Appelez-nous directement.");
      }
    } catch {
      setStatus("error");
      setMessage("Problème de connexion. Appelez-nous directement au 07 67 87 80 34.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Formulaire de demande d'intervention"
    >
      {/* Champ honeypot anti-bot — caché visuellement */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Nom */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nom" className="text-sm font-semibold text-white/70">
          Votre nom <span className="text-ember-400">*</span>
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          autoComplete="name"
          placeholder="Jean Dupont"
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-white/70">
          Votre email <span className="text-ember-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jean@example.com"
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition"
        />
      </div>

      {/* Téléphone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="tel" className="text-sm font-semibold text-white/70">
          Téléphone <span className="text-ember-400">*</span>
        </label>
        <input
          id="tel"
          name="tel"
          type="tel"
          required
          autoComplete="tel"
          placeholder="06 12 34 56 78"
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition"
        />
      </div>

      {/* Lieu de la panne */}
      <div className="flex flex-col gap-2">
        <label htmlFor="lieu" className="text-sm font-semibold text-white/70">
          Lieu de la panne <span className="text-ember-400">*</span>
        </label>
        <input
          id="lieu"
          name="lieu"
          type="text"
          required
          placeholder="Adresse, nom de rue, autoroute A1 sortie 18..."
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition"
        />
      </div>

      {/* Type de panne */}
      <div className="flex flex-col gap-2">
        <label htmlFor="typePanne" className="text-sm font-semibold text-white/70">
          Type de panne <span className="text-ember-400">*</span>
        </label>
        <select
          id="typePanne"
          name="typePanne"
          required
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white outline-none transition cursor-pointer"
        >
          <option value="">— Sélectionner —</option>
          <option value="batterie">Batterie à plat</option>
          <option value="crevaison">Crevaison / Pneu</option>
          <option value="remorquage">Remorquage</option>
          <option value="moto">Moto / scooter</option>
          <option value="panne-moteur">Panne moteur</option>
          <option value="transport">Transport de véhicule</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Description libre */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-white/70">
          Description (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={800}
          placeholder="Ex: véhicule ne démarre plus, batterie à plat sur parking Euralille, accès par rue X..."
          className="bg-ink-900/80 border border-white/10 focus:border-ember-500 focus:ring-1 focus:ring-ember-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition resize-y min-h-[120px]"
        />
      </div>

      {/* Bouton d'envoi */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      {/* Message de retour */}
      {message && (
        <p
          role="alert"
          className={`text-sm rounded-lg px-4 py-3 ${
            status === "success"
              ? "bg-green-900/50 text-green-300 border border-green-700"
              : "bg-red-900/50 text-red-300 border border-red-700"
          }`}
        >
          {message}
        </p>
      )}

      {/* Mention RGPD */}
      <p className="text-xs text-gray-500 leading-relaxed">
        * Champs obligatoires. En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour traiter votre demande de dépannage.{" "}
        <a href="/politique-confidentialite" className="underline hover:text-gray-400">
          Politique de confidentialité
        </a>
      </p>
    </form>
  );
}
