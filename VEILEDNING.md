# Slik legger du til og publiserer en ny pakke

Kort veiledning for deg som eier nettstedet. Du trenger ingen programmeringskunnskap, bare en
AI-assistent (f.eks. Claude Code) åpnet i prosjektmappen.

## 1. Samle innholdet

Ha dette klart: tittel, kort sammendrag, fagområde, tidsbruk, antall møter, læringsmål,
møteopplegg med diskusjonsspørsmål, forberedelse, forbedringsoppgave, kilder og kreditering.
Det kan være et Word-dokument, en PDF, løse notater eller en dansk KIAP-pakke.

## 2. Be assistenten lage pakken

Eksempel på beskjed:

> Lag en ny pakke fra vedlagt dokument. Følg CLAUDE.md. Ikke dikt opp noe, bruk [FYLL INN] der
> noe mangler. Fagområde: Infeksjoner og antibiotika. Status: Under utvikling.

For en dansk pakke:

> Oversett og tilpass denne KIAP-pakken etter sjekklisten i CLAUDE.md. List alle [TILPASS]-punkter til slutt.

Assistenten lager `content/pakker/<navn>.md`, legger materiell i `public/materiell/<navn>/` og kjører sjekken.

## 3. Se over

Be assistenten starte forhåndsvisning (`npm run dev`), og åpne adressen den gir deg. Kontroller:

- at faglig innhold er riktig og ikke endret i betydning
- at alle `[FYLL INN]` er fylt ut eller bevisst står igjen (pakken er da «Under utvikling»)
- kreditering og kilder
- at nedlastingene fungerer

## 4. Publiser

Be assistenten: «Commit og push den nye pakken.»
Cloudflare bygger og publiserer automatisk i løpet av noen minutter.
Har pakken feil, stopper byggingen, og den gamle versjonen av nettstedet blir liggende. Be i så fall
assistenten lese feilmeldingen i Cloudflare og rette den.

## Endre eller fjerne en pakke

- **Endre:** rediger filen, oppdater `sist_oppdatert` og eventuelt `versjon`, og publiser.
- **Midlertidig skjule:** gi filen navn som begynner med `_` (f.eks. `_antibiotika.md`).
- **Fjerne:** slett filen og mappen i `public/materiell/`.

## Andre vanlige endringer

| Hva | Hvor |
|---|---|
| E-postadressen | `site.config.mjs` → `epost` |
| Nettadressen (domenet) | `site.config.mjs` → `nettadresse` |
| Nytt fagområde | `site.config.mjs` → `fagomrader` |
| Tekst på «Slik fungerer det» | `src/pages/slik-fungerer-det.astro` |
| Farger | `src/styles/global.css` (øverst) |
