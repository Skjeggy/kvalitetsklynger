// Lager mailto-lenker med ferdig utfylt emne og en kort mal i meldingsteksten.
import { site } from "../../site.config.mjs";

function mailto(emne: string, linjer: string[]) {
  const q = `subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(linjer.join("\n"))}`;
  return `mailto:${site.epost}?${q}`;
}

export function meldPa(pakke?: string) {
  return mailto(pakke ? `Påmelding: ${pakke}` : "Påmelding til klynge", [
    "Hei,",
    "",
    "Vi ønsker å melde oss på en klynge.",
    "",
    `Ønsket pakke: ${pakke ?? ""}`,
    "Navn på kontaktperson/klyngeleder: ",
    "Legekontor og kommune: ",
    "Klyngens navn (hvis dere har en): ",
    "Deltakere (navn og legekontor): ",
    "Ønsket oppstart: ",
    "",
    "Hilsen",
  ]);
}

export function merInfo(pakke?: string) {
  return mailto(pakke ? `Spørsmål om pakken: ${pakke}` : "Ønsker mer informasjon", [
    "Hei,",
    "",
    pakke ? `Jeg har et spørsmål om pakken «${pakke}»:` : "Jeg ønsker mer informasjon om:",
    "",
    "",
    "Navn: ",
    "Legekontor og kommune: ",
    "",
    "Hilsen",
  ]);
}

export function oppdaterMedlemmer() {
  return mailto("Oppdatering av medlemmer i klynge", [
    "Hei,",
    "",
    "Vi ønsker å oppdatere medlemslisten i klyngen vår.",
    "",
    "Klyngens navn: ",
    "Kontaktperson/klyngeleder: ",
    "Nye medlemmer (navn og legekontor): ",
    "Medlemmer som skal fjernes: ",
    "",
    "Hilsen",
  ]);
}
