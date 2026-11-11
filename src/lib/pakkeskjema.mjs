// Skjema for frontmatter i content/pakker/*.md.
// Brukes både av Astro (src/content.config.ts) og av scripts/sjekk-pakker.mjs.
import { fagomrader, statuser, interneKategorier } from "../../site.config.mjs";

export function lagPakkeskjema(z) {
  return z.object({
    // Obligatoriske felt
    tittel: z.string().min(3),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    sammendrag: z.string().min(20).max(320),
    fagomrade: z.enum(fagomrader),
    tidsbruk: z.string().min(2),
    antall_moter: z.number().int().min(1),
    status: z.enum(statuser),
    intern_kategori: z.enum(interneKategorier),
    kreditering: z.string().min(3),
    sist_oppdatert: z.coerce.date(),

    // Valgfrie felt
    kurspoeng: z.string().optional(),
    forfattere: z.array(z.string()).optional(),
    versjon: z.string().optional(),
    relaterte_pakker: z.array(z.string()).optional(),
    fremhevet: z.boolean().default(false),
    materiell: z
      .array(
        z.object({
          tittel: z.string().min(2),
          fil: z.string().min(3),
        }),
      )
      .default([]),
  }).strict();
}
