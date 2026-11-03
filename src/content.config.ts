import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The CMS writes an empty string for an optional field the editor left blank,
 * and `z.coerce.date('')` is an invalid date, not an absent one. Treat empty
 * as absent.
 */
const blankAsUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value === '' ? undefined : value), schema.optional());

/**
 * Articles live as plain Markdown files in /content/<section>/<lang>/<slug>.md
 * so that every article is a file in this GitHub repository. The CMS writes to
 * the exact same files.
 *
 * The translations of one article are paired by their file name: the English
 * and Japanese versions share a slug. Nothing in the frontmatter records the
 * pairing, so there is nothing an editor can blank out by accident.
 */
const article = z.object({
  title: z.string(),
  description: z.string().default(''),
  pubDate: z.coerce.date(),
  updatedDate: blankAsUndefined(z.coerce.date()),
  topics: z.array(z.string()).default([]),
  author: blankAsUndefined(z.string()),
  cover: blankAsUndefined(z.string()),
  coverAlt: blankAsUndefined(z.string()),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type Article = z.infer<typeof article>;

const section = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: `./content/${folder}` }),
    schema: article,
  });

/** Standalone pages (about, demands, legal...) — same file-based rule. */
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    updatedDate: blankAsUndefined(z.coerce.date()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  statements: section('statements'),
  news: section('news'),
  rights: section('rights'),
  dossiers: section('dossiers'),
  pages,
};
