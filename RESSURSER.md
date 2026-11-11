# Ressurser

Intern oversikt over pakketyper, samarbeidspartnere og arbeidsflyt. Ingenting her vises på nettstedet.

## De fire pakketypene (`intern_kategori`)

Brukerne ser bare fagområde og kreditering. Kategorien brukes internt til oversikt, kreditering og
avklaring av rettigheter.

| Verdi | Opphav | Kreditering (mal) | Avklar før publisering |
|---|---|---|---|
| `skil` | Kurs fra SKIL (Senter for kvalitet i legekontor), https://www.skilnet.no/ | «Basert på kurset «…» fra SKIL. Tilpasset av …» | At SKIL godtar gjenbruk og offentlig visning |
| `baerekraftig-legekontor` | Bærekraftig legekontor (bl.a. Linn Getz og Stefan Jordleifsson) | «Utviklet i samarbeid med Bærekraftig legekontor (…).» | Hvem som skal stå som forfattere |
| `kiap` | Oversatte og tilpassede klyngepakker fra KIAP, Danmark, https://www.kiap.dk/ | «Basert på klyngepakken «…» fra KIAP, Danmark. Oversatt og tilpasset av …» | At KIAP godtar oversettelse og publisering. Hvilken versjon som er brukt |
| `lokal` | Pakker prosjektet lager selv | «Utviklet av … for Kvalitetsklynger i allmennpraksis.» | Faglig gjennomgang |

## Samarbeidspartnere

- **KIAP – Kvalitet i Almen Praksis (Danmark).** Inspirasjon for klyngemodellen og pakkeformatet. Nevnes i tekst. Ingen logoer foreløpig.
- **SKIL – Senter for kvalitet i legekontor.** Kurs og kvalitetsarbeid i norsk allmennpraksis.
- **Bærekraftig legekontor.** [FYLL INN: kort beskrivelse og eventuell lenke.]

Logoer fra partnere legges bare inn etter skriftlig avtale. Avtalene noteres her:

| Partner | Hva er avtalt | Dato | Kontaktperson |
|---|---|---|---|
| [FYLL INN] | | | |

## Arbeidsflyt: oversette og tilpasse en dansk KIAP-pakke

1. **Avklar rettigheter.** Bekreft med KIAP at pakken kan oversettes og publiseres. Noter det i tabellen over.
2. **Samle kildemateriale.** Ta med pakkebeskrivelse, kjøreplan, presentasjoner og uddelingskopier. Noter dansk tittel, URL og revisjonsdato.
3. **Grovoversett med AI-assistent.** Gi assistenten teksten og be om oversettelse til bokmål etter `CLAUDE.md`. Assistenten merker alt som må tilpasses med `[TILPASS: …]`.
4. **Faglig tilpasning (fastlege).** Gå gjennom hvert `[TILPASS]`-punkt:
   - Retningslinjer: bytt til norske kilder (Helsedirektoratet, NEL, Legemiddelhåndboka, NOKLUS m.fl.).
   - Data: KIAP bygger mye på automatiske datauttrekk. Finn ut hva som er mulig i norske journalsystemer, eller gjør om til manuell registrering i egen praksis.
   - Organisering: dansk region og kommune og PLO-avtaler har ikke alltid norske motstykker. Skriv om til norsk samhandling (kommune, helseforetak, legevakt).
   - Legemidler, takster og attester: kontroller norsk status.
5. **Strukturer inn i malen.** Plasser innholdet under de åtte standardoverskriftene. KIAPs «før / under / efter» passer i Forberedelse, Gjennomføring og Forbedringsoppgave.
6. **Materiell.** Oversett og tilpass filene, fjern KIAP-logo og legg dem i `public/materiell/<slug>/`.
7. **Kreditering.** Bruk KIAP-malen og oppgi den danske originalen under «Kreditering og kilder».
8. **Publiser som «Under utvikling»**, test pakken i en klynge og sett den til «Klar» når den er justert.

## Nyttige norske kilder for tilpasning

Bruk dem som utgangspunkt, og kontroller alltid gjeldende versjon:

- Helsedirektoratet (nasjonale retningslinjer): https://www.helsedirektoratet.no/
- Norsk elektronisk legehåndbok (NEL): https://legehandboka.no/
- Norsk legemiddelhåndbok: https://www.legemiddelhandboka.no/
- NOKLUS: https://www.noklus.no/
- SKIL: https://www.skilnet.no/
