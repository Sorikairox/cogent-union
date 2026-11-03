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
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
npm run check    # type-check pages, components and content schemas
```

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
  admin/                  ← the CMS (config.yml + index.html)
  uploads/                ← images added through the CMS
src/
  site.config.mjs         ← site URL, repo, contact address, links
  i18n/ui.ts              ← every interface string, per language
  i18n/utils.ts           ← language helpers (paths, dates, translations)
  content.config.ts       ← frontmatter schema for every collection
  lib/content.ts          ← queries: by section, by language, by topic
  layouts/Base.astro      ← <head>, header, footer, language alternates
  components/             ← Header, Footer, ArticleList, LangSwitcher, Logo
  pages/                  ← routes (see below)
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

---

## Writing an article

Create a file under `content/<section>/<lang>/<slug>.md`. The English and
Japanese versions of one article are two files that share the same
`translationKey` — that is what links them for the language switcher and for
`<link rel="alternate">`.

```markdown
---
title: A stronger union, speaking up
description: One or two sentences, shown in lists and in search results.
pubDate: 2026-11-02
updatedDate: 2026-11-10      # optional
translationKey: union-takes-the-floor
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
editor: there is no database, and every save is a commit against this
repository.

### Locally, with no account

1. `npm run dev`
2. Open <http://localhost:4321/admin/index.html> in Chrome or Edge.
3. Choose **Work with Local Repository** and pick this folder.

Changes are written straight to the files on disk; commit them as usual.

### In production, for the section's editors

1. Set `repo:` in `public/admin/config.yml` to your GitHub repository
   (`owner/name`) and check `branch:`.
2. Give editors write access to the repository on GitHub.
3. Deploy an OAuth endpoint so they can sign in without a token — the
   one-file Cloudflare Worker
   [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) does this.
   Then uncomment `base_url:` in `config.yml` and point it at that worker.
4. Editors go to `https://<your-domain>/admin/` and sign in with GitHub.

`publish_mode: editorial_workflow` means a save opens a pull request instead of
publishing immediately. Set it to `simple` if the section would rather publish
directly.

**Alternative without any OAuth setup:** editors can use **Sign In with GitHub
Using PAT** and a personal access token scoped to this repository.

---

## Changing the site's identity

- `src/site.config.mjs` — public URL, repository, contact email, external links.
- `src/i18n/ui.ts` — the union's name, tagline and every other interface string,
  in both languages. Nothing user-facing is hardcoded in a component.
- `src/components/Logo.astro` and `public/favicon.svg` — the placeholder mark.
- `src/styles/global.css` — the design tokens are the first block of the file
  (`--red`, `--yellow`, `--dark`, `--page-width`, fonts).

### Adding a third language

1. Add the code to `languages` in `src/i18n/ui.ts` and write its block of strings.
2. Add it to `i18n.locales` in `astro.config.mjs` and to `locales` in
   `public/admin/config.yml`.
3. Create `content/<section>/<code>/` folders.

Routes, feeds, sitemaps and the language switcher follow automatically.

---

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages
on every push to `main`. In the repository settings, set **Pages → Source** to
**GitHub Actions**.

Any static host works just as well (Netlify, Cloudflare Pages, a plain web
server): build with `npm run build` and serve `dist/`.

Before going live, set `SITE.url` in `src/site.config.mjs` and the `Sitemap:`
line in `public/robots.txt` to the real domain.

---

## Privacy

No cookies, no analytics, no third-party scripts on the public pages, no
webfonts fetched from a third party. `/admin/` loads the CMS from a CDN and is
excluded from `robots.txt`.
