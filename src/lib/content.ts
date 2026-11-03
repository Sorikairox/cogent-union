import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, isLang, type Lang } from '../i18n/utils';
import type { UiKey } from '../i18n/ui';

export type SectionName = 'statements' | 'news' | 'rights' | 'dossiers';

export const SECTIONS: SectionName[] = ['statements', 'news', 'rights', 'dossiers'];

/** URL segment + translation keys for each section. */
export const SECTION_META: Record<
  SectionName,
  { segment: string; titleKey: UiKey; labelKey: UiKey }
> = {
  statements: { segment: 'statements', titleKey: 'section.statements', labelKey: 'label.statement' },
  news: { segment: 'news', titleKey: 'section.news', labelKey: 'label.news' },
  rights: { segment: 'rights', titleKey: 'section.rights', labelKey: 'label.rights' },
  dossiers: { segment: 'dossiers', titleKey: 'section.dossiers', labelKey: 'label.dossier' },
};

export type AnyArticle = CollectionEntry<SectionName>;

/** `en/my-article` -> { lang: 'en', slug: 'my-article' } */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [maybeLang, ...rest] = id.split('/');
  if (isLang(maybeLang) && rest.length > 0) {
    return { lang: maybeLang, slug: rest.join('/') };
  }
  return { lang: defaultLang, slug: id };
}

const isPublished = (entry: { data: { draft: boolean; pubDate: Date } }) =>
  !entry.data.draft && (import.meta.env.DEV || entry.data.pubDate <= new Date());

const byDateDesc = (a: AnyArticle, b: AnyArticle) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** Every published article of one section, in one language, newest first. */
export async function getArticles(section: SectionName, lang: Lang): Promise<AnyArticle[]> {
  const entries = await getCollection(section, isPublished);
  return entries.filter((e) => splitId(e.id).lang === lang).sort(byDateDesc);
}

/** Every published article of every section, in one language, newest first. */
export async function getAllArticles(lang: Lang): Promise<
  { section: SectionName; entry: AnyArticle }[]
> {
  const lists = await Promise.all(
    SECTIONS.map(async (section) =>
      (await getArticles(section, lang)).map((entry) => ({ section, entry })),
    ),
  );
  return lists
    .flat()
    .sort((a, b) => byDateDesc(a.entry, b.entry));
}

/** The same article in another language, if it has been translated. */
export async function getTranslation(
  section: SectionName,
  translationKey: string,
  lang: Lang,
): Promise<AnyArticle | undefined> {
  const entries = await getCollection(section, isPublished);
  return entries.find(
    (e) => e.data.translationKey === translationKey && splitId(e.id).lang === lang,
  );
}

export type TopicCount = { topic: string; count: number };

/** Topics used by published articles in one language, most used first. */
export async function getTopics(lang: Lang): Promise<TopicCount[]> {
  const all = await getAllArticles(lang);
  const counts = new Map<string, number>();
  for (const { entry } of all) {
    for (const topic of entry.data.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

export function topicSlug(topic: string): string {
  return encodeURIComponent(topic.toLowerCase().replace(/\s+/g, '-'));
}

/** Rough reading time, good enough for both Latin and Japanese text. */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const cjk = (body.match(/[　-鿿＀-￯]/g) ?? []).length;
  const words = body.replace(/[　-鿿＀-￯]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200 + cjk / 500));
}
