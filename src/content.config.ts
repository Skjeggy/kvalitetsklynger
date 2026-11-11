import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { lagPakkeskjema } from "./lib/pakkeskjema.mjs";

const pakker = defineCollection({
  // Filer som begynner med _ (f.eks. _mal.md) hoppes over.
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/pakker" }),
  schema: lagPakkeskjema(z),
});

export const collections = { pakker };
