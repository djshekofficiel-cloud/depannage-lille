'use client';

import { HeroNeon } from "@/components/HeroNeon";

const PHONE = '07 67 87 80 34';

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* HERO PREMIUM */}
      <HeroNeon />

      {/* SECTION SERVICES */}
      <section className="py-24 bg-gradient-to-b from-black via-slate-950 to-black border-t border-red-500/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-black text-5xl md:text-6xl text-white mb-6">
              Nos <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">services</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Dépannage complet et rapide pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔧', title: 'Dépannage', desc: 'Réparation sur place pour les petites pannes' },
              { icon: '🚗', title: 'Remorquage', desc: 'Transport sécurisé de votre véhicule' },
              { icon: '🔋', title: 'Batterie', desc: 'Changement et recharge batterie 24/7' },
              { icon: '⚙️', title: 'Crevaison', desc: 'Réparation rapide de pneu' },
              { icon: '📍', title: 'Rapatriement', desc: 'Assistance routière complète' },
              { icon: '✓', title: 'Urgence', desc: 'Intervention immédiate garantie' },
            ].map((service, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border-2 border-slate-700 bg-gradient-to-br from-slate-900/50 to-black hover:border-red-500/50 hover:from-red-950/20 transition-all duration-300"
                style={{
                  animation: `slide-up 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  boxShadow: 'inset 0 0 30px rgba(239, 68, 68, 0.1), 0 0 20px rgba(239, 68, 68, 0.2)',
                }} />

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-2xl text-white mb-3">{service.title}</h3>
                  <p className="text-slate-300">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION AVANTAGES */}
      <section className="py-24 bg-black border-t border-blue-500/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-black text-5xl md:text-6xl text-white mb-6">
              Pourquoi nous <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">choisir</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { num: '01', title: 'Rapidité', detail: '20-30 minutes d\'intervention sur Lille et la MEL' },
              { num: '02', title: 'Fiabilité', detail: 'Techniciens qualifiés et équipement professionnel' },
              { num: '03', title: 'Disponibilité', detail: 'Service 24h/24, 7j/7, même jours fériés' },
              { num: '04', title: 'Transparence', detail: 'Prix annoncés avant intervention, sans surprise' },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start group">
                <div className="text-6xl font-black text-red-500/20 group-hover:text-red-500/40 transition-colors">
                  {item.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-lg">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Vous avez besoin d&apos;aide?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Appelez-nous maintenant, nos techniciens arrivent en 20-30 minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="group relative px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xl rounded-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 hover:-translate-y-1 border-2 border-red-500/50"
            >
              ☎️ Appeler maintenant
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl" />
            </a>
            <button className="px-12 py-6 border-2 border-slate-400 text-slate-200 font-bold text-xl rounded-xl hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300">
              Demander une intervention
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-slate-800 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-white mb-4">SM Dépannage</h4>
              <p className="text-slate-400 text-sm">Dépannage automobile rapide et fiable 24h/24</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Dépannage</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Remorquage</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Batterie</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Zones</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Lille</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Nord (59)</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Pas-de-Calais (62)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-red-500 font-bold text-lg mb-2">{PHONE}</p>
              <p className="text-slate-400 text-sm">24h/24, 7j/7</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2026 SM Dépannage. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
