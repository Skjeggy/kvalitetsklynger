# CLAUDE.md – Kvalitetsklynger i allmennpraksis

Instruks for AI-assistenter som vedlikeholder dette nettstedet. Les hele filen før du endrer noe.

## Hva dette er

Et statisk nettsted for prosjektet «Kvalitetsklynger i allmennpraksis»: fastleger møtes i små
grupper (klynger), bruker en klyngepakke sammen og gjør konkrete forbedringer i egen praksis.
Modellen er inspirert av KIAP i Danmark. Eier og fagansvarlig er en fastlege som ikke er utvikler.
Det meste av vedlikeholdet er å legge til eller oppdatere pakker i Markdown.

## Filstruktur

```
site.config.mjs            Navn, e-postadresse, nettadresse, fagområder, standardoverskrifter
content/pakker/            Én .md-fil per pakke. _mal.md er malen (publiseres ikke)
public/materiell/<slug>/   Nedlastbart materiell for hver pakke
public/                    Logo, favicon, og.png, _headers (sikkerhet), _redirects
src/lib/pakkeskjema.mjs    Felles skjema (Zod) for frontmatter
scripts/sjekk-pakker.mjs   Byggesjekk med norske feilmeldinger (kjøres før hver bygging)
src/pages/                 index (forside = pakkeoversikt), pakker/[slug], slik-fungerer-det, kontakt, 404
src/layouts/Base.astro     Topp, bunn, SEO og Open Graph
src/styles/global.css      Alle farger (designtokens) og stiler
src/lib/epost.ts           Mailto-maler for de tre kontakthandlingene
RESSURSER.md               Pakketyper, samarbeidspartnere, oversettelse av KIAP-pakker
VEILEDNING.md              Slik legger du til og publiserer en ny pakke
skisser/                   Designskisse og logoforslag (ikke en del av nettstedet)
```

## Frontmatter

| Felt | Påkrevd | Format |
|---|---|---|
| `tittel` | ja | tekst |
| `slug` | ja | små bokstaver, tall, bindestrek. **Lik filnavnet** (`slug.md`) |
| `sammendrag` | ja | høyst to setninger, maks 320 tegn |
| `fagomrade` | ja | nøyaktig én verdi fra `fagomrader` i `site.config.mjs` |
| `tidsbruk` | ja | tekst, f.eks. `"2 × 2 timer + 1 time forberedelse"` |
| `antall_moter` | ja | heltall |
| `status` | ja | `Klar` eller `Under utvikling` |
| `intern_kategori` | ja | `skil`, `baerekraftig-legekontor`, `kiap` eller `lokal`. **Vises aldri** |
| `kreditering` | ja | én setning, se reglene under |
| `sist_oppdatert` | ja | `ÅÅÅÅ-MM-DD` |
| `kurspoeng` | nei | tekst. Bare hvis godkjenning faktisk er gitt |
| `forfattere` | nei | liste med navn |
| `versjon` | nei | tekst, f.eks. `"1.0"` |
| `relaterte_pakker` | nei | liste med slugs som finnes |
| `fremhevet` | nei | `true` løfter pakken øverst i oversikten |
| `materiell` | nei | liste med `tittel` og `fil` (sti under `public/materiell/`) |

Ukjente felt gir byggefeil. Nye fagområder legges til i `site.config.mjs`, ikke i pakken.

## Standardoverskrifter

Brødteksten skal ha nøyaktig disse H2-overskriftene, i denne rekkefølgen. Ingen andre H2, og ingen H1:

1. `## Sammendrag og relevans`
2. `## Læringsmål`
3. `## Innhold og struktur`
4. `## Forberedelse`
5. `## Gjennomføring steg for steg`
6. `## Materiell og nedlastinger`
7. `## Forbedringsoppgave i egen praksis og oppfølging`
8. `## Kreditering og kilder`

Under disse brukes `###` (f.eks. `### Møte 1`). Tidsplan per økt skrives som tabell (Tid | Aktivitet).
Tips til klyngeleder skrives som sitat: `> **Tips til klyngeleder:** …` (vises som sandfarget boks).
Nedlastingskortene fra `materiell` settes automatisk inn nederst i seksjon 6.

## Språk og tone

- Norsk bokmål. Kollegial og nøktern faglig tone, skrevet til fastleger. Ingen markedsføringsspråk.
- Korte setninger og aktiv form. Unngå unødvendige anglisismer og danismer (f.eks. «kjøreplan», ikke «drejebok»).
- Tall og enheter med mellomrom: «2 timer», «15 min». Datoer i teksten: «11. november 2026».

## Faglig innhold – absolutte regler

- **Aldri dikt opp** faglig innhold, retningslinjer, referanser, tall, kurspoeng, læringsmål eller diskusjonsspørsmål.
- Skriv `[FYLL INN]` der noe mangler. Det er bedre med en tydelig plassholder enn en gjetning.
- Eieren leverer innholdet. Du strukturerer det inn i malen **uten å endre faglig betydning**. Du kan
  rette språk og forkorte, men si fra hvis en endring kan påvirke betydningen.
- Ingen pasientdata eller identifiserbare pasienteksempler. Kasuistikk skal være konstruert og generell.
- Referanser skal være ekte og etterprøvbare. Er du usikker på en kilde, merk den `[KONTROLLER]`.

## Kreditering

- Kreditering står alltid i feltet `kreditering`, og kilder står under `## Kreditering og kilder`.
- Den interne kategorien skal **aldri** nevnes i grensesnittet som «kategori» eller «type».
- Formuleringer (velg den som passer, og fyll inn navn):
  - KIAP: «Basert på klyngepakken «[dansk tittel]» fra KIAP, Danmark. Oversatt og tilpasset av [navn].»
  - SKIL: «Basert på kurset «[tittel]» fra SKIL (Senter for kvalitet i legekontor). Tilpasset av [navn].»
  - Bærekraftig legekontor: «Utviklet i samarbeid med Bærekraftig legekontor ([navn]).»
  - Lokal: «Utviklet av [navn] for Kvalitetsklynger i allmennpraksis.»
- Ikke bruk KIAPs (eller andres) logoer, bilder, illustrasjoner eller tekst uten at det er avklart. Oversatt tekst er tillatt bare når samarbeidet dekker det.

## Sjekkliste: legg til ny pakke

1. Kopier `content/pakker/_mal.md` til `content/pakker/<slug>.md`.
2. Fyll inn alle obligatoriske felt. Velg fagområde fra `site.config.mjs`.
3. Sett `intern_kategori` og skriv `kreditering` etter reglene over.
4. Legg innholdet fra eieren inn under de åtte standardoverskriftene. Ingen oppdiktet tekst.
5. Legg materiell i `public/materiell/<slug>/` og før det opp i `materiell`.
6. Sett `status` (`Under utvikling` til innholdet er komplett) og `sist_oppdatert` til dagens dato.
7. Kjør `npm run build`. Rett alle feil til byggingen går gjennom.
8. Se over siden med `npm run dev`. Søk etter `[FYLL INN]` og rapporter det som gjenstår til eieren.
9. Commit med en beskrivende melding, f.eks. «Ny pakke: <tittel>». Push publiserer.

## Sjekkliste: oversett dansk KIAP-pakke

1. Bekreft at eieren har avklart med KIAP at pakken kan oversettes og publiseres.
2. Noter dansk tittel, URL og versjon/revisjonsdato til kildene.
3. Oversett til bokmål. Bevar faglig innhold. Ikke legg til eller fjern faglige poeng.
4. **Tilpass til Norge**, men bare der eieren har gitt grunnlag. Merk ellers med `[TILPASS: …]`:
   - danske retningslinjer → norske kilder (Helsedirektoratet, NEL, Legemiddelhåndboka, NOKLUS, SKIL)
   - danske organisasjoner og ordninger (region, kommune, PLO, DSAM, Sundhedsdatastyrelsen) → norske motstykker
   - datauttrekk og kvalitetsindikatorer → hva som faktisk finnes i norske journalsystemer og registre
   - takster, attester, henvisningsveier og legemidler med annen status i Norge
5. Sett `intern_kategori: kiap` og bruk KIAP-krediteringen.
6. List alle `[TILPASS]`- og `[FYLL INN]`-punkter for eieren når du er ferdig.
7. Videre som i «legg til ny pakke», fra punkt 5.

Mer om arbeidsflyten står i `RESSURSER.md`.

## Teknisk

- Astro (statisk) med content collections og Zod. Node ≥ 22.23 (se `.node-version`).
- `npm run dev` gir lokal visning, `npm run sjekk` sjekker bare pakkene, og `npm run build` sjekker og bygger til `dist/`.
- Deploy: Cloudflare Workers med statiske filer (`wrangler.jsonc`). Automatisk deploy ved push til `main`.
- Ingen backend, ingen cookies, ingen sporing og ingen eksterne skript eller fonter. CSP i `public/_headers` blokkerer inline-skript.
- E-postadressen endres bare i `site.config.mjs`.
- WCAG 2.1 AA: behold hoppelenken, synlig fokus, kontrastene i `global.css` og logisk overskriftsrekkefølge.
