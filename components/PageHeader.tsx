// components/PageHeader.tsx — En-tête de page : fil d'Ariane + titre, fond aurora.

import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}
interface PageHeaderProps {
  crumbs: Crumb[];
  kicker?: string;
  titre: React.ReactNode;
  sous?: React.ReactNode;
}

export default function PageHeader({ crumbs, kicker, titre, sous }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute -top-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-ember-600/20 blur-[120px] animate-aurora" />
      </div>

      <div className="container-x py-16">
        <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-white/40">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? (
                <Link href={c.href} className="hover:text-ember-300 transition-colors">{c.label}</Link>
              ) : (
                <span className="text-white/70">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="mx-2 text-white/25">/</span>}
            </span>
          ))}
        </nav>

        {kicker && <span className="chip mb-4">{kicker}</span>}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white text-balance max-w-3xl">{titre}</h1>
        {sous && <p className="text-white/55 text-lg mt-5 max-w-2xl text-pretty">{sous}</p>}
      </div>
    </section>
  );
}
