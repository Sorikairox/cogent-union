# Union website

Static, bilingual (English / 日本語) website for the union section, built with
[Astro](https://astro.build). Every article is a Markdown file in this
repository, edited either directly or through a Git-based CMS.

The visual design reproduces the one used by
[cgtbedrockstreaming.fr](https://cgtbedrockstreaming.fr/), with their permission.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
npm run check    # type-check pages, components and content schemas
```

Two things about that cache in `.astro/`:

- Stop `npm run dev` before running `npm run build`. Both write the cache, and
  a build racing the dev server silently drops pages.
- **After deleting an article, build with `npx astro build --force`.** A plain
  local build keeps serving entries whose files are gone, because the cache is
  not pruned. The Netlify deploy is unaffected — it builds from a fresh
  checkout with no cache.

---

## Where things live

```
content/                  ← every article, as a file in this repository
  statements/{en,ja}/     ← statements (communiqués)
  news/{en,ja}/           ← news posts
  rights/{en,ja}/         ← practical guides on workers' rights
  dossiers/{en,ja}/       ← background dossiers
  pages/{en,ja}/          ← about, demands, legal notice
public/
  cms-config.yml          ← CMS collections and fields
  uploads/                ← images added through the CMS
src/
  site.config.mjs         ← site URL, repo, contact address, links
  i18n/ui.ts              ← every interface string, per language
  i18n/utils.ts           ← language helpers (paths, dates, translations)
  content.config.ts       ← frontmatter schema for every collection
  lib/content.ts          ← queries: by section, by language, by topic
  layouts/Base.astro      ← <head>, header, footer, language alternates
  components/             ← Header, Footer, ArticleList, LangSwitcher, Logo
  pages/                  ← routes (see below), including admin/ (the CMS)
  styles/global.css       ← all of the design: colours, type, components
```

### Routes

| URL | Page |
| --- | --- |
| `/` | redirects to the visitor's language |
| `/en/`, `/ja/` | home page |
| `/en/statements/`, `/en/news/`, `/en/rights/`, `/en/dossiers/` | section index |
| `/en/<section>/<slug>/` | one article |
| `/en/topics/`, `/en/topics/<topic>/` | topic index and topic page |
| `/en/about/`, `/en/demands/`, `/en/legal/` | standalone pages |
| `/rss-en.xml`, `/rss-ja.xml` | RSS feed per language |
| `/sitemap-index.xml` | sitemap |
| `/admin/` | the content manager |

---

## Writing an article

Create a file under `content/<section>/<lang>/<slug>.md`. The English and
Japanese versions of one article are two files with the **same file name** —
that is what links them for the language switcher and for
`<link rel="alternate">`. Rename one side and the pair is broken.

```markdown
---
title: A stronger union, speaking up
description: One or two sentences, shown in lists and in search results.
pubDate: 2026-11-02
updatedDate: 2026-11-10      # optional
topics:
  - Union life
author: The section          # optional
cover: /uploads/photo.jpg    # optional
coverAlt: What the photo shows
featured: false              # statements/dossiers: pin to the home page
draft: false                 # a draft is never published
---

The body, in Markdown. `.mdx` works too if you need components.
```

Notes:

- **Optional fields may be left blank.** The CMS writes `updatedDate: ''` for
  a field an editor did not fill; the schema reads an empty string as absent.
- **Topics are translated.** `Union life` and `組合活動` are separate topics,
  each with its own page. That is deliberate: a Japanese reader browses
  Japanese topic names.
- **Drafts are per language.** You can publish the English version while the
  Japanese one is still `draft: true`.
- A `pubDate` in the future keeps the article out of the production build, but
  it is visible in `npm run dev`.
- An article with no translation shows a short notice on the page.

---

## Editing with the CMS

The CMS is [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — a Git-based
editor: there is no database and no server. It reads and writes the Markdown
files in `content/`, so publishing an article is making a commit.

### How the section edits (local repository mode)

1. Clone this repository, once:
   ```bash
   git clone git@github.com:Sorikairox/cogent-union.git
   cd cogent-union
   npm install
   ```
2. Start the site:
   ```bash
   npm run dev
   ```
3. Open <http://localhost:4321/admin/> **in Chrome or Edge**, click
   **Work with Local Repository** and pick the folder from step 1.
4. Write. Each save writes the Markdown file on disk — nothing is public yet.
   The site at <http://localhost:4321/> reloads as you go, so you
   see the article exactly as readers will.
5. Publish by committing and pushing:
   ```bash
   git add content public/uploads && git commit -m "Add: <article title>" && git push
   ```
   Netlify rebuilds and publishes the site in about a minute.

Local mode needs a Chromium-based browser: it uses the File System Access API,
which Firefox and Safari do not implement.

Two editors should not work on the same article at the same time; otherwise
whoever pushes second gets a merge conflict in a Markdown file. Pull before you
start.

### Editing without a checkout

The sign-in buttons on the same page use the GitHub API instead of the disk:

- **Sign In with GitHub Using PAT** — create a fine-grained personal access
  token with read/write access to this repository, paste it once. Good enough
  for a handful of editors.
- **Sign In with GitHub** — needs a hosted OAuth endpoint, because the token
  exchange requires a client secret that cannot live in a static site. Deploy
  [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) (a small
  Cloudflare Worker), create a GitHub OAuth app pointing at it, then uncomment
  `base_url:` in `public/cms-config.yml`. Worth it only when non-technical
  editors join.

Through either of those, `publish_mode: editorial_workflow` means a save opens
a pull request rather than committing to `main`.

### CMS configuration

`public/cms-config.yml` declares the collections and their fields. It sits at
the root of `public/`, not in `public/admin/`, because a directory there would
shadow the `/admin/` route in `astro dev` and editors would get a 404.

## Changing the site's identity

- `src/site.config.mjs` — public URL, base path, repository, contact email,
  external links.
- `src/i18n/ui.ts` — the union's name, tagline and every other interface string,
  in both languages. Nothing user-facing is hardcoded in a component.
- `src/components/Logo.astro` and `public/favicon.svg` — the placeholder mark.
- `src/styles/global.css` — the design tokens are the first block of the file
  (`--red`, `--yellow`, `--dark`, `--page-width`, fonts).

### Adding a third language

1. Add the code to `languages` in `src/i18n/ui.ts` and write its block of strings.
2. Add it to `i18n.locales` in `astro.config.mjs` and to `locales` in
   `public/cms-config.yml`.
3. Create `content/<section>/<code>/` folders.

Routes, feeds, sitemaps and the language switcher follow automatically.

---

## Deployment

Netlify builds the site and publishes it to <https://cogent-union.netlify.app/>
on every push to `main`. The build settings are in `netlify.toml`; the project
is `cogent-union` in the Netlify dashboard.

The origin and sub-path are `SITE.url` and `SITE.base` in
`src/site.config.mjs`, which feed `astro.config.mjs`. The base is `'/'` today.
Astro applies it to its own assets only, so every link written by hand goes
through `withBase()` from `src/i18n/utils.ts` — use it for any new one, so the
site keeps working if it is ever served under a sub-path.

### Moving to a custom domain

1. Add the domain in Netlify under **Domain management** and point the DNS
   record at Netlify.
2. Set `SITE.url` to the domain. `robots.txt` and the sitemap follow it.

---

## Privacy

No cookies, no analytics, no third-party scripts on the public pages, no
webfonts fetched from a third party. The CMS at `/admin/` loads from a CDN and
is excluded from `robots.txt`.
