// Sjekker alle pakker i content/pakker/ før bygging og gir feilmeldinger på norsk.
// Kjøres automatisk av «npm run build», eller alene med «npm run sjekk».
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { z } from "zod";
import { lagPakkeskjema } from "../src/lib/pakkeskjema.mjs";
import { standardoverskrifter, fagomrader, statuser, interneKategorier } from "../site.config.mjs";

const MAPPE = "content/pakker";
const MATERIELL = "public/materiell";
const skjema = lagPakkeskjema(z);

const rødt = (s) => `\x1b[31m${s}\x1b[0m`;
const grønt = (s) => `\x1b[32m${s}\x1b[0m`;

const eksempler = {
  tittel: "tittel: Navn på pakken",
  slug: "slug: navn-pa-pakken",
  sammendrag: "sammendrag: To setninger om hva pakken handler om.",
  fagomrade: `fagomrade: ${fagomrader[0]}`,
  tidsbruk: "tidsbruk: 2 × 2 timer + forberedelse",
  antall_moter: "antall_moter: 2",
  status: "status: Under utvikling",
  intern_kategori: "intern_kategori: lokal",
  kreditering: "kreditering: Utviklet av …",
  sist_oppdatert: "sist_oppdatert: 2026-11-11",
};

function avstand(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const nærmeste = (verdi, liste) =>
  liste.map((v) => [v, avstand(String(verdi), v)]).sort((x, y) => x[1] - y[1])[0];

function oversett(issue, data) {
  const felt = issue.path.join(".");
  const navn = issue.path[0];
  const verdi = issue.path.reduce((o, k) => (o == null ? o : o[k]), data);

  if (issue.code === "unrecognized_keys")
    return `Ukjent felt: ${issue.keys.map((k) => `«${k}»`).join(", ")}. Sjekk stavemåten (se _mal.md).`;
  if (verdi === undefined)
    return `Feltet «${felt}» mangler.` + (eksempler[navn] ? ` Eksempel: ${eksempler[navn]}` : "");

  const lister = { fagomrade: fagomrader, status: statuser, intern_kategori: interneKategorier };
  if (lister[navn]) {
    const [likest, d] = nærmeste(verdi, lister[navn]);
    const delvis = lister[navn].find((v) => v.toLowerCase().includes(String(verdi).toLowerCase()));
    const forslag = d <= 6 ? likest : delvis;
    return `«${felt}»: «${verdi}» er ikke en gyldig verdi.` +
      (forslag ? ` Mente du «${forslag}»?` : "") +
      `\n      Gyldige verdier: ${lister[navn].join(", ")} (se site.config.mjs).`;
  }
  if (navn === "slug") return `«slug»: bruk bare små bokstaver a–z, tall og bindestrek (f.eks. «antibiotika-luftveier»).`;
  if (navn === "sammendrag" && issue.code === "too_big") return `«sammendrag» er for langt (${String(verdi).length} tegn, maks 320). Hold det til to setninger.`;
  if (navn === "antall_moter") return `«antall_moter» må være et helt tall, f.eks. antall_moter: 3`;
  if (navn === "sist_oppdatert") return `«sist_oppdatert» må være en dato på formen ÅÅÅÅ-MM-DD.`;
  if (navn === "fremhevet") return `«fremhevet» må være true eller false.`;
  if (issue.code === "too_small") return `«${felt}» er for kort.`;
  if (issue.code === "invalid_type") return `«${felt}» har feil format (${issue.message}).`;
  return `«${felt}»: ${issue.message}`;
}

const filer = readdirSync(MAPPE).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const feil = new Map();
const pakker = [];
const leggTil = (fil, melding) => feil.set(fil, [...(feil.get(fil) ?? []), melding]);

for (const fil of filer) {
  const tekst = readFileSync(join(MAPPE, fil), "utf8").replace(/\r\n/g, "\n");
  const m = tekst.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { leggTil(fil, "Fant ikke frontmatter. Filen må starte med en linje med --- og ha en ny --- etter feltene."); continue; }

  let data;
  try { data = parse(m[1]) ?? {}; }
  catch (e) { leggTil(fil, `Frontmatter kan ikke leses (YAML-feil): ${e.message.split("\n")[0]}`); continue; }

  const res = skjema.safeParse(data);
  if (!res.success) for (const issue of res.error.issues) leggTil(fil, oversett(issue, data));

  if (data.slug && fil !== `${data.slug}.md`)
    leggTil(fil, `Filnavnet bør være «${data.slug}.md» så det stemmer med slug.`);

  // Overskrifter
  const kropp = m[2].replace(/```[\s\S]*?```/g, "");
  const h2 = [...kropp.matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map((x) => x[1]);
  for (const o of h2) {
    if (!standardoverskrifter.includes(o)) {
      const [forslag, d] = nærmeste(o, standardoverskrifter);
      leggTil(fil, `Overskriften «## ${o}» er ikke en av standardoverskriftene.` + (d <= 8 ? ` Mente du «## ${forslag}»?` : " Bruk ### for underoverskrifter."));
    }
  }
  for (const o of standardoverskrifter)
    if (!h2.includes(o)) leggTil(fil, `Overskriften «## ${o}» mangler i brødteksten.`);
  const rekkefølge = h2.filter((o) => standardoverskrifter.includes(o));
  const forventet = standardoverskrifter.filter((o) => rekkefølge.includes(o));
  if (rekkefølge.join("|") !== forventet.join("|"))
    leggTil(fil, "Standardoverskriftene står i feil rekkefølge. Se _mal.md.");
  if (/^#\s/m.test(kropp)) leggTil(fil, "Brødteksten skal ikke ha «# »-overskrift (H1). Tittelen kommer fra frontmatter.");

  // Materiell
  (data.materiell ?? []).forEach((mt, i) => {
    if (mt?.fil && !existsSync(join(MATERIELL, mt.fil)))
      leggTil(fil, `materiell[${i}]: fant ikke filen ${MATERIELL}/${mt.fil}`);
  });

  pakker.push({ fil, data });
}

// Unike slugs og gyldige relaterte pakker
const slugs = new Map();
for (const { fil, data } of pakker) {
  if (!data.slug) continue;
  if (slugs.has(data.slug)) leggTil(fil, `slug «${data.slug}» brukes også i ${slugs.get(data.slug)}.`);
  slugs.set(data.slug, fil);
}
for (const { fil, data } of pakker)
  for (const r of data.relaterte_pakker ?? [])
    if (!slugs.has(r)) leggTil(fil, `relaterte_pakker: fant ingen pakke med slug «${r}».`);

if (feil.size) {
  let n = 0;
  for (const [fil, liste] of feil) {
    console.error(rødt(`\n✖ Feil i ${MAPPE}/${fil}\n`));
    for (const f of liste) { console.error(`  • ${f}`); n++; }
  }
  console.error(rødt(`\nByggingen stoppet: ${n} feil i ${feil.size} ${feil.size === 1 ? "pakke" : "pakker"}. Ingenting er publisert.\n`));
  process.exit(1);
}
console.log(grønt(`✔ ${pakker.length} ${pakker.length === 1 ? "pakke" : "pakker"} sjekket uten feil.`));
