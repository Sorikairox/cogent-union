// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.mjs';
import { rehypeTableScroll } from './src/lib/rehype-table-scroll.mjs';
import { rehypeBaseUrls } from './src/lib/rehype-base-urls.mjs';

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  /**
   * 'ignore', not 'always': with 'always' the dev server answers 404 on
   * /rss-en.xml (it serves it at /rss-en.xml/), while the build writes a real
   * file and the host serves it. Every link we generate still ends in a slash.
   */
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } } })],
  /**
   * No `i18n` block on purpose. Locale routing here is plain file routing —
   * src/pages/[lang]/… — and the language alternates are emitted by the layout.
   * Astro's i18n middleware would add nothing and, in `astro dev`, answers 404
   * to every page outside a locale, /admin/ included.
   */
  markdown: {
    shikiConfig: { theme: 'github-light' },
    // [plugin, options] — calling the factory here would hand unified a
    // transformer where it expects a plugin, and the whole chain breaks.
    rehypePlugins: [rehypeTableScroll, [rehypeBaseUrls, SITE.base]],
  },
});
