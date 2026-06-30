// lib/site.ts — URL, téléphone et métadonnées site (source unique)

const DEFAULT_SITE_URL = "https://depannage-lille.vercel.app";
const DEFAULT_PHONE_E164 = "+33767878034";
const DEFAULT_PHONE_DISPLAY = "07 67 87 80 34";

export const SITE_NAME = "SM Dépannage";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
).replace(/\/$/, "");

/** Numéro affiché (ex. 07 67 87 80 34) */
export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? DEFAULT_PHONE_DISPLAY;

/** Lien tel: sans espaces */
export const PHONE_TEL =
  process.env.NEXT_PUBLIC_PHONE?.replace(/\s/g, "") ??
  DEFAULT_PHONE_E164;

export function canonical(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
