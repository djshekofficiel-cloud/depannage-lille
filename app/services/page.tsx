// app/services/page.tsx — Liste de tous les services

import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import PageHeader from "@/components/PageHeader";
import { services } from "@/lib/services";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos services de dépannage auto — Remorquage, Batterie, Pneu...",
  description:
    "Remorquage, dépannage sur place, batterie, crevaison, transport véhicule, dépannage moto. SM Dépannage intervient 24h/24 à Lille et dans le 59/62.",
  alternates: { canonical: canonical("/services") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        kicker="Nos services"
        titre={<>Tout pour vous remettre <span className="text-gradient">sur la route.</span></>}
        sous="Nous couvrons toutes les situations de panne. Disponibles 24h/24, 7j/7 sur Lille et le Nord–Pas-de-Calais."
      />
      <section className="container-x py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} slug={s.slug} nom={s.nom} icon={s.icon} resume={s.resume} />
          ))}
        </div>
      </section>
    </>
  );
}
