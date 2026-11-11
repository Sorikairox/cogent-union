import { ui, defaultLang, languages, type Lang, type UiKey } from './ui';

export { languages, defaultLang };
export type { Lang };

export const locales = Object.keys(languages) as Lang[];

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in ui;
}

/**
 * The sub-path the site is served from ('/' on Netlify, or a sub-path such
 * as '/cogent-union/'). Astro only applies it to its own asset URLs, so every link we write
 * by hand has to go through `withBase`.
 */
const BASE = import.meta.env.BASE_URL;

/** Prefixes a root-relative path with the site's base path. */
export function withBase(p: string): string {
  return `${BASE.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
}

/** Reads the language out of a URL such as /ja/news/foo/. */
export function getLangFromUrl(url: URL): Lang {
  const withoutBase = url.pathname.slice(BASE.replace(/\/$/, '').length);
  const [, lang] = withoutBase.split('/');
  return isLang(lang) ? lang : defaultLang;
}

/** Returns the translation function for a language. Falls back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

/** Builds a locale-prefixed path: path('ja', 'news') -> '/<base>/ja/news/'. */
export function path(lang: Lang, ...segments: (string | undefined)[]): string {
  const parts = [lang, ...segments.filter((s): s is string => !!s)]
    .join('/')
    .split('/')
    .filter(Boolean);
  return withBase(`${parts.join('/')}/`);
}

const DATE_LOCALE: Record<Lang, string> = { en: 'en-GB', ja: 'ja-JP' };

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
