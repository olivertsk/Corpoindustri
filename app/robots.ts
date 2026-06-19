import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://corpoindustri.com/sitemap.xml',
    host: 'https://corpoindustri.com',
  };
}
