// components/seo/JsonLd.tsx
// Injecte des données structurées JSON-LD de façon sécurisée.
// Le typage s'appuie sur schema-dts (WithContext<Thing>) pour éviter les erreurs.

import type { Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: WithContext<Thing> | WithContext<Thing>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Échappe `<` pour empêcher toute fermeture de balise via une chaîne.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
