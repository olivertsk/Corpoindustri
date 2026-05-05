import { getProduct } from '@/src/api/ProductApi';
import { permanentRedirect } from 'next/navigation';
import { buildProductSlug } from '@/src/utils/productSlug';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductIdRedirectPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id, true);
  const slug = buildProductSlug({ id: product.id, name: product.name });

  permanentRedirect(`/productos/${slug}`);
}
