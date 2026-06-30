'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PHONE = '07 67 87 80 34';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/zones-intervention', label: 'Zones' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
        <div className="container-x">
          <div className="flex items-center justify-between h-16">
            {/* Logo + badge vert pulsant */}
            <Link href="/" aria-label="SM Dépannage — accueil" className="relative transition-transform hover:scale-[1.03] flex items-center gap-2" onClick={() => setOpen(false)}>
              <Image
                src="/logo-sm-depannage.svg"
                alt="SM Dépannage"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              {/* Point vert pulsant — statut disponible */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-white/70 hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-sm-red-500 hover:after:w-full after:transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA desktop + hamburger mobile */}
            <div className="flex items-center gap-3">
              <a href={`tel:${PHONE}`} className="hidden md:inline-flex btn-primary !px-5 !py-2.5 text-sm" aria-label="Appeler SM Dépannage">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {PHONE}
              </a>

              {/* Hamburger mobile */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-white/10 bg-white/5"
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={open}
              >
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-3' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <nav
            className="absolute top-16 left-0 right-0 bg-slate-950 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col divide-y divide-white/5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-6 py-4 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="p-4">
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-center"
                  style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', border: '1px solid rgba(239,68,68,0.4)' }}
                  onClick={() => setOpen(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
