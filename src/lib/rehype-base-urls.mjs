/**
 * Rewrites root-relative URLs written inside Markdown — `/uploads/photo.jpg`,
 * `/en/news/something/` — so that they carry the site's base path.
 *
 * Astro's `base` only applies to the URLs it generates itself, and an editor
 * typing a link in the CMS has no reason to know about the sub-path. Without
 * this, every image added through the CMS would 404 in production.
 */
const ATTRIBUTES = ['src', 'href', 'poster'];

export function rehypeBaseUrls(base = '/') {
  const prefix = base.replace(/\/$/, '');
  if (!prefix) return () => {};

  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.properties) {
        for (const attr of ATTRIBUTES) {
          const value = node.properties[attr];
          // Only root-relative paths: leave //host, /base/… and full URLs alone.
          if (
            typeof value === 'string' &&
            value.startsWith('/') &&
            !value.startsWith('//') &&
            !value.startsWith(`${prefix}/`)
          ) {
            node.properties[attr] = prefix + value;
          }
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}
