/**
 * Single place to edit the identity of the site.
 * Everything here shows up in the header, footer, metadata and CMS previews.
 */
export const SITE = {
  /** Origin of the deployed site. Used for sitemap, RSS and canonical links. */
  url: 'https://sorikairox.github.io',
  /**
   * Sub-path the site is served from. GitHub Pages serves a project site under
   * /<repo>/. Set this to '/' if you move to a custom domain, and drop the
   * CNAME step in the README.
   */
  base: '/cogent-union',
  /** Repository that holds the articles (used by the CMS). */
  repo: 'Sorikairox/cogent-union',
  branch: 'main',
  email: 'cogentlabsunion@gmail.com',
  /** Optional external links shown in the footer. Remove what you do not need. */
  links: {
    discord: '',
    rss: 'rss-en.xml',
  },
};

/** Locales, in the order they appear in the language switcher. */
export const LOCALES = /** @type {const} */ (['en', 'ja']);
export const DEFAULT_LOCALE = 'en';

/** Content sections. Each one is a folder under /content and a collection. */
export const SECTIONS = /** @type {const} */ ([
  'statements',
  'news',
  'rights',
  'dossiers',
]);
