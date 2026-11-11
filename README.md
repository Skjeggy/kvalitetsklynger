# Kvalitetsklynger i allmennpraksis

Statisk nettsted for klyngepakker til fastleger. Astro med Markdown og skjemavalidering, publisert på
Cloudflare Workers med statiske filer.

- **Legge til pakker:** se [VEILEDNING.md](VEILEDNING.md)
- **Regler for AI-assistenter:** se [CLAUDE.md](CLAUDE.md)
- **Pakketyper og samarbeidspartnere:** se [RESSURSER.md](RESSURSER.md)

## Lokalt

```bash
npm install
npm run dev        # forhåndsvisning på http://localhost:4321
npm run sjekk      # sjekker bare pakkene
npm run build      # sjekker og bygger til dist/
npm run preview    # kjører dist/ slik Cloudflare gjør (wrangler dev)
```

## Publisering på Cloudflare Workers (automatisk fra Git)

1. Legg prosjektet i et Git-repo (GitHub eller GitLab).
2. Gå til Cloudflare-dashbordet → **Workers & Pages** → **Create** → **Import a repository**, og velg repoet.
3. Innstillinger:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
   - **Produksjonsgren:** `main`
4. Node-versjonen leses fra `.node-version` (24). Andre miljøvariabler trengs ikke.
5. Etter første deploy ligger nettstedet på `kvalitetsklynger.<konto>.workers.dev`. Eget domene legges til under
   **Settings → Domains & Routes**. Oppdater da `nettadresse` i `site.config.mjs`.

Output-mappen er `dist/`. Den er angitt i `wrangler.jsonc` (`assets.directory`), og det trengs ingen Worker-kode.
`public/_headers` setter sikkerhetshoder, og `public/_redirects` sender `/pakker/` til forsiden.

## Gjenstår før publisering

- [ ] E-postadresse: `epost` i `site.config.mjs` (nå `[E-POSTADRESSE]`)
- [ ] Domene: `nettadresse` i `site.config.mjs` (nå `kvalitetsklynger.example`)
- [ ] Første ekte pakker. Slett deretter `content/pakker/eksempelpakke.md` og `public/materiell/eksempelpakke/`
- [ ] Fyll inn `[FYLL INN]` på «Slik fungerer det» (gruppestørrelse, møtehyppighet, klyngelederrollen, hvem som står bak)
- [ ] Kort beskrivelse av Bærekraftig legekontor i `RESSURSER.md`
- [ ] Bekreft med KIAP, SKIL og Bærekraftig legekontor at de kan nevnes som samarbeidspartnere
- [ ] Logo: gjør teksten i `public/logo.svg` om til konturer, f.eks. i Inkscape (nettstedet bruker HTML-tekst, så dette gjelder bare SVG-filen)
- [ ] Opprett Git-repo og koble det til Cloudflare (se over)
