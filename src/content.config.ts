import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Articles live as plain Markdown files in /content/<section>/<lang>/<slug>.md
 * so that every article is a file in this GitHub repository. The CMS writes to
 * the exact same files through the GitHub API.
 */
const article = z.object({
  title: z.string(),
  description: z.string().default(''),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  /** Shared id across languages: links the EN and JA versions of one article. */
  translationKey: z.string(),
  topics: z.array(z.string()).default([]),
  author: z.string().optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
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
    updatedDate: z.coerce.date().optional(),
    translationKey: z.string(),
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
