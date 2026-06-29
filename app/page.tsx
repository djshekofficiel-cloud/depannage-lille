// app/page.tsx — Page d'accueil

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { villes } from "@/lib/villes";
import { services } from "@/lib/services";
import { IMG } from "@/lib/images";
import { BorderBeam } from "@/components/ui/BorderBeam";

export const metadata: Metadata = {
  title: "Dépannage auto Lille & Métropole 24h/24 — SM Dépannage",
  description:
    "Dépannage et remorquage auto à Lille, Roubaix, Tourcoing et toute la MEL. Intervention en 20-30 min, 24h/24, 7j/7. Appelez maintenant !",
  alternates: { canonical: "https://votredomaine.fr" },
};

const PHONE = "07 67 87 80 34";

function SectionTitle({ kicker, titre, sous }: { kicker: string; titre: React.ReactNode; sous?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="chip mb-4">{kicker}</span>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white text-balance">{titre}</h2>
      {sous && <p className="text-white/65 text-lg mt-4 text-pretty">{sous}</p>}
    </div>
  );
}

const TRUST_BADGES = [
  "Intervention 24h/24 · 7j/7",
  "Arrivée 20 à 30 min sur Lille",
  "Tarif annoncé avant départ",
  "Techniciens assurés",
  "Paiement CB, espèces, virement",
];

const STEPS = [
  { n: "01", t: "Vous appelez", d: "On décroche immédiatement, on identifie votre panne et votre position." },
  { n: "02", t: "On confirme le prix", d: "Le tarif est annoncé avant départ, sans surprise à l'arrivée." },
  { n: "03", t: "On intervient", d: "Réparation sur place si possible, sinon remorquage vers votre destination." },
];

const ATOUTS = [
  { t: "Rapidité", d: "Délai moyen de 20 à 30 minutes sur Lille et la MEL.", icon: "M13 2 3 14h7l-1 8 10-12h-7l1-8z" },
  { t: "Disponibilité", d: "Service continu, 24h/24 et 7j/7, y compris nuits et jours fériés.", icon: "M12 6v6l4 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
  { t: "Transparence", d: "Aucun montant caché : vous connaissez le prix avant l'intervention.", icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { t: "Fiabilité", d: "Intervenants qualifiés, matériel adapté, véhicule couvert pendant le transport.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

export default function HomePage() {
  const villesDept59 = villes.filter((v) => v.dept === "59").slice(0, 6);
  const villesDept62 = villes.filter((v) => v.dept === "62").slice(0, 6);

  return (
    <>
      <Hero />

      {/* BARRE DE CONFIANCE */}
      <section className="border-y border-white/10 bg-ink-900/45">
        <div className="container-x py-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TRUST_BADGES.map((item) => (
              <li key={item} className="glass rounded-xl px-3 py-2 text-xs sm:text-sm text-white/80 text-center">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20">
        <SectionTitle
          kicker="Nos services"
          titre={<>Votre panne, <span className="text-gradient">notre solution immédiate.</span></>}
          sous="Chaque intervention est adaptée à votre situation : dépannage sur place quand c&apos;est possible, remorquage si nécessaire."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} slug={service.slug} nom={service.nom} icon={service.icon} resume={service.resume} />
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link href="/services" className="btn-ghost">Voir le détail de tous les services</Link>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-20 border-y border-white/10 bg-ink-900/40">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="container-x">
          <SectionTitle
            kicker="Comment ça marche"
            titre={<>Un process simple, <span className="text-gradient">même dans l&apos;urgence.</span></>}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative card p-7">
                <span className="font-display font-extrabold text-5xl text-white/10">{s.n}</span>
                <h3 className="font-display font-bold text-xl text-white mt-2">{s.t}</h3>
                <p className="text-white/65 text-sm mt-2 leading-relaxed">{s.d}</p>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="hidden md:block absolute top-1/2 -right-3 text-sm-red-500/60 text-2xl">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS PREVIEW */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/55 p-7 sm:p-10">
          <div aria-hidden className="absolute -top-20 right-10 h-56 w-56 rounded-full bg-sm-red-500/20 blur-[90px]" />
          <div className="relative grid gap-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="chip mb-4">Tarifs</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white text-balance">
                Des prix clairs, annoncés <span className="text-gradient">avant départ.</span>
              </h2>
              <p className="text-white/65 mt-4 max-w-xl">
                Nous détaillons le coût de l&apos;intervention avant validation : base, distance éventuelle et majoration nuit/jours fériés.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3">
              <div className="glass rounded-2xl p-4">
                <p className="text-white/50 text-xs uppercase tracking-[0.18em]">Remorquage</p>
                <p className="font-display text-2xl text-gradient font-bold mt-1">dès 80 €</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-white/50 text-xs uppercase tracking-[0.18em]">Batterie</p>
                <p className="font-display text-2xl text-gradient font-bold mt-1">dès 60 €</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-white/50 text-xs uppercase tracking-[0.18em]">Crevaison</p>
                <p className="font-display text-2xl text-gradient font-bold mt-1">dès 50 €</p>
              </div>
            </div>
          </div>
          <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/tarifs" className="btn-primary">Voir tous les tarifs</Link>
            <a href={`tel:${PHONE}`} className="btn-ghost">Appeler pour un devis immédiat</a>
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section className="container-x py-20">
        <SectionTitle
          kicker="Zones d'intervention"
          titre={<>Présents partout dans le <span className="text-gradient">59 & 62.</span></>}
          sous="Lille, MEL, Nord et Pas-de-Calais : nous adaptons le délai d&apos;intervention selon votre secteur et le trafic." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { dept: "59", nom: "Nord", liste: villesDept59 },
            { dept: "62", nom: "Pas-de-Calais", liste: villesDept62 },
          ].map((bloc) => (
            <div key={bloc.dept} className="card p-7">
              <h3 className="flex items-center gap-3 mb-5">
                <span className="chip">Dept. {bloc.dept}</span>
                <span className="font-display font-bold text-xl text-white">{bloc.nom}</span>
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {bloc.liste.map((ville) => (
                  <li key={ville.slug}>
                    <Link href={`/zones-intervention/${ville.slug}`} className="group flex items-center gap-2 text-white/65 hover:text-sm-red-300 transition-colors text-sm">
                      <span className="text-sm-red-500 group-hover:translate-x-0.5 transition-transform">→</span>
                      {ville.nom}
                      <span className="text-white/30 text-xs ml-auto">{ville.delai}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/zones-intervention" className="btn-ghost">Voir toutes les villes</Link>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="relative py-20 border-t border-white/10 bg-ink-900/40">
        <div className="container-x">
          <SectionTitle
            kicker="Pourquoi nous"
            titre={<>La différence <span className="text-gradient">SM Dépannage.</span></>}
            sous="Un service pensé pour réduire votre stress et remettre votre véhicule en sécurité le plus vite possible."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATOUTS.map((item) => (
              <div key={item.t} className="card p-6 text-center">
                <span className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-sm-red-500/20 to-gold-500/10 border border-sm-red-500/30 mb-4">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-sm-red-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={item.icon} />
                  </svg>
                </span>
                <h3 className="font-display text-white font-bold text-lg mb-2">{item.t}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-glow-lg">
          <BorderBeam duration={7} lightColor="#d32f2f" lightWidth={240} />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMG.truckNight}')` }} aria-hidden />
          <div aria-hidden className="absolute inset-0 bg-ink-950/75" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-sm-red-900/35 to-transparent" />
          <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-sm-red-500/30 blur-[100px]" />

          <div className="relative text-center px-6 py-20">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white text-balance">
              En panne <span className="text-gradient">maintenant ?</span>
            </h2>
            <p className="text-white/70 text-lg mt-5 max-w-xl mx-auto">
              Appelez-nous ou envoyez votre localisation. Un technicien part dès validation.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${PHONE}`} className="btn-primary text-lg">Appeler maintenant</a>
              <Link href="/contact" className="btn-ghost text-lg">Demande de rappel</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
