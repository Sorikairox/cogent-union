import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { locales, useTranslations, path, type Lang } from '../i18n/utils';
import { getAllArticles, SECTION_META, splitId } from '../lib/content';
import { SITE } from '../site.config.mjs';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const items = await getAllArticles(lang);

  return rss({
    title: t('site.name'),
    description: t('site.description'),
    // The feed's own link must include the base path, not just the origin.
    site: new URL(import.meta.env.BASE_URL, site ?? SITE.url),
    customData: `<language>${lang}</language>`,
    items: items.map(({ section, entry }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      categories: entry.data.topics,
      link: path(lang, SECTION_META[section].segment, splitId(entry.id).slug),
    })),
  });
};
