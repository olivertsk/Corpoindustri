import type { MetadataRoute } from 'next';
import { getProducts } from '@/src/api/ProductApi';
import { buildProductSlug } from '@/src/utils/productSlug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://corpoindustri.com';
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    const limit = 200;
    let page = 1;
    let totalPages = 1;
    const productUrls: MetadataRoute.Sitemap = [];

    do {
      const response = await getProducts({
        pag: page,
        limit,
        isClient: true,
      });

      totalPages = response.meta.totalPage || 1;

      response.data.forEach((product) => {
        if (!product.id) {
          return;
        }

        const slug = buildProductSlug({ id: product.id, name: product.name });
        productUrls.push({
          url: `${baseUrl}/productos/${slug}`,
          lastModified: now,
          changeFrequency: 'daily',
          priority: 0.9,
        });
      });

      page += 1;
    } while (page <= totalPages);

    return [...staticUrls, ...productUrls];
  } catch {
    return staticUrls;
  }
}
