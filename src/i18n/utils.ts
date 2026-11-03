import { ui, defaultLang, languages, type Lang, type UiKey } from './ui';

export { languages, defaultLang };
export type { Lang };

export const locales = Object.keys(languages) as Lang[];

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in ui;
}

/** Reads the language out of a URL such as /ja/news/foo/. */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  return isLang(lang) ? lang : defaultLang;
}

/** Returns the translation function for a language. Falls back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

/** Builds an absolute, locale-prefixed path: path('ja', 'news') -> '/ja/news/'. */
export function path(lang: Lang, ...segments: (string | undefined)[]): string {
  const parts = [lang, ...segments.filter((s): s is string => !!s)]
    .join('/')
    .split('/')
    .filter(Boolean);
  return `/${parts.join('/')}/`;
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
