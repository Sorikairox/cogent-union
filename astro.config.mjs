// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.mjs';
import { rehypeTableScroll } from './src/lib/rehype-table-scroll.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } } })],
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true },
  },
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [rehypeTableScroll],
  },
});
