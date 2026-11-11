// Felles innstillinger for hele nettstedet. Endre her – ingen andre steder.

export const site = {
  navn: "Kvalitetsklynger i allmennpraksis",
  kortnavn: "Kvalitetsklynger",
  beskrivelse:
    "Fastleger møtes i små grupper, bruker en klyngepakke sammen og gjør konkrete forbedringer i egen praksis.",

  // E-postadressen all kontakt og påmelding går til. Byttes kun her.
  epost: "[E-POSTADRESSE]",

  // Full adresse til nettstedet, uten skråstrek til slutt. Brukes i sidekart,
  // robots.txt og Open Graph. Byttes hvis dere får eget domene.
  nettadresse: "https://kvalitetsklynger.sondrerekdal.workers.dev",
};

// Gyldige fagområder. Rekkefølgen her er rekkefølgen i filteret.
// En pakke må bruke en av disse verdiene nøyaktig i feltet «fagomrade».
export const fagomrader = [
  "Hjerte og kar",
  "Diabetes og stoffskifte",
  "Lunger og luftveier",
  "Infeksjoner og antibiotika",
  "Legemidler og forskrivning",
  "Psykisk helse og rus",
  "Muskel og skjelett",
  "Barn og unge",
  "Eldre og skrøpelighet",
  "Prøvetaking og diagnostikk",
  "Samhandling og henvisninger",
  "Trygdemedisin og attester",
  "Praksisdrift og arbeidsmiljø",
];

export const statuser = ["Klar", "Under utvikling"];

// Intern kategorisering. Vises aldri på nettstedet. Se RESSURSER.md.
export const interneKategorier = ["skil", "baerekraftig-legekontor", "kiap", "lokal"];

// Faste H2-overskrifter i hver pakke, i denne rekkefølgen.
export const standardoverskrifter = [
  "Sammendrag og relevans",
  "Læringsmål",
  "Innhold og struktur",
  "Forberedelse",
  "Gjennomføring steg for steg",
  "Materiell og nedlastinger",
  "Forbedringsoppgave i egen praksis og oppfølging",
  "Kreditering og kilder",
];
