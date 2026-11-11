export const dato = (d: Date) =>
  d.toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const moter = (n: number) => `${n} ${n === 1 ? "møte" : "møter"}`;

const formater: Record<string, string> = {
  pdf: "PDF", doc: "Word", docx: "Word", ppt: "PowerPoint", pptx: "PowerPoint",
  xls: "Excel", xlsx: "Excel", txt: "Tekst", odt: "Tekstdokument", csv: "CSV",
};
export const filformat = (fil: string) => formater[fil.split(".").pop()!.toLowerCase()] ?? fil.split(".").pop()!.toUpperCase();

export function filstorrelse(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} kB`;
  return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}
