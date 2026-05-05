import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { getProduct } from '@/src/api/ProductApi';
import BackBtn from '@/src/components/BackBtn';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import AddProductFavorite from '@/src/components/products/AddProductFavorite';
import ImagePreview from '@/src/components/products/ImagePreview';
import ProductBreadcrumb from '@/src/components/products/ProductBreadcrumb';
import ProductDetailPrices from '@/src/components/products/ProductDetailPrices';
import BannerProduct from '@/src/components/products/BannerProduct';
import { apiUrl } from '@/src/lib/global';
import {
  buildProductSlug,
  extractProductIdFromSlug,
} from '@/src/utils/productSlug';

type Props = {
  params: Promise<{ slug: string }>;
};

const getProductFromSlug = async (slug: string) => {
  const id = extractProductIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  return await getProduct(id, true);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductFromSlug(slug);
  const canonicalSlug = buildProductSlug({
    id: product.id,
    name: product.name,
  });
  const description = product.longDescription || product.description || '';
  const productImage = product.coverImage
    ? `${apiUrl}/file/${product.coverImage}`
    : product.images?.[0]?.file
      ? `${apiUrl}/file/${product.images[0].file}`
      : '';

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/productos/${canonicalSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      images: productImage ? [productImage] : [],
      description,
      title: product.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: productImage ? [productImage] : [],
    },
  };
}

export default async function ProductShowBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductFromSlug(slug);
  const canonicalSlug = buildProductSlug({
    id: product.id,
    name: product.name,
  });

  if (slug !== canonicalSlug) {
    permanentRedirect(`/productos/${canonicalSlug}`);
  }

  const productImage = product.coverImage
    ? `${apiUrl}/file/${product.coverImage}`
    : product.images?.[0]?.file
      ? `${apiUrl}/file/${product.images[0].file}`
      : '';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: productImage ? [productImage] : [],
    description: product.longDescription || product.description || product.name,
    sku: product.code,
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.promotionalPrice || product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `https://corpoindustri.com/productos/${canonicalSlug}`,
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <div className='container mx-auto py-3 flex lg:flex-row flex-col'>
        <BackBtn /> <ProductBreadcrumb product={product} />
      </div>
      <main className='container mx-auto bg-white py-4 rounded-xl shadow-sm'>
        <div className='grid grid-cols-3 gap-8 lg:gap-0'>
          <div className='col-span-3 lg:col-span-2'>
            <ImagePreview images={product.images} alt={product.name} />
            {product.longDescription && (
              <div className='pb-8 px-8 mt-8'>
                <h4 className='text-2xl font-bold mb-4'>
                  Descripcion del Producto
                </h4>
                <div
                  className='whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{
                    __html: product.longDescription || '',
                  }}
                ></div>
              </div>
            )}
          </div>
          <aside className='col-span-3 lg:col-span-1 lg:px-8'>
            <div className='border rounded-xl p-4'>
              <div className='flex justify-between items-center'>
                <h4 className='font-bold text-2xl mb-4'>{product.name}</h4>
                <AddProductFavorite product={product} />
              </div>
              <ProductDetailPrices product={product} />
            </div>
          </aside>
        </div>
      </main>
      <div className='container mx-auto mt-10'>
        <BannerProduct />
      </div>
      <div className='container mx-auto mt-10'>
        <ProductsSlider
          products={product.relations}
          titleSection='Productos Relacionados'
        />
      </div>
    </>
  );
}
