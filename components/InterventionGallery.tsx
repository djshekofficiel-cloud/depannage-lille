import Image from "next/image";
import Link from "next/link";
import { REF_GALLERY } from "@/lib/images";

export default function InterventionGallery() {
  const [featured, ...rest] = REF_GALLERY;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-slate-950 to-black border-t border-orange-500/15">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-300 border border-orange-500/40 bg-orange-950/20 mb-4">
            Nos interventions
          </span>
          <h2 className="font-black text-white leading-none mb-4" style={{ fontSize: "clamp(2rem,6vw,4rem)" }}>
            Le dépannage automobile,{" "}
            <span className="neon-accent">en images</span>
          </h2>
          <p className="text-slate-400 mx-auto max-w-2xl" style={{ fontSize: "clamp(0.9rem,2.2vw,1rem)" }}>
            Remorquage, batterie, crevaison, panne moteur — voitures, motos et utilitaires.
            Intervention 24h/24 sur Lille, la MEL et le 59/62.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <article className="card-glow-orange lg:col-span-7 overflow-hidden group">
            <div className="card-glow-top" aria-hidden />
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-200 border border-orange-500/40 bg-orange-950/40 mb-2">
                  {featured.tag}
                </span>
                <p className="font-bold text-white text-lg sm:text-xl">{featured.legend}</p>
              </div>
            </div>
          </article>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {rest.slice(0, 4).map((photo) => (
              <article key={photo.src} className="card-glow-orange overflow-hidden group">
                <div className="card-glow-top" aria-hidden />
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[11px] sm:text-xs font-semibold text-orange-200/90 uppercase tracking-wide mb-0.5">
                      {photo.tag}
                    </p>
                    <p className="text-white text-xs sm:text-sm font-medium leading-tight">{photo.legend}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {rest.slice(4).map((photo) => (
            <article key={photo.src} className="card-glow-orange overflow-hidden group">
              <div className="card-glow-top" aria-hidden />
              <div className="relative aspect-[16/10]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-[11px] font-semibold text-orange-200/90 uppercase tracking-wide mb-0.5">
                    {photo.tag}
                  </p>
                  <p className="text-white text-sm font-medium">{photo.legend}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-ghost">
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
