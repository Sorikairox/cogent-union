import type { APIRoute } from 'astro';
import { withBase } from '../i18n/utils';

// Built rather than static, so the paths follow the base of each host.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /
Disallow: ${withBase('admin/')}

Sitemap: ${new URL(withBase('sitemap-index.xml'), site)}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
