import { Product } from '@/src/types/product';

const UUID_REGEX =
  /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;

export const slugify = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const buildProductSlug = (
  product: Pick<Product, 'id' | 'name'>,
): string => {
  const productId = product.id || '';
  const base = slugify(product.name || 'producto');

  if (!productId) {
    return base;
  }

  return `${base}-${productId}`;
};

export const extractProductIdFromSlug = (slug: string): string | null => {
  const match = slug.match(UUID_REGEX);
  return match?.[1] || null;
};
