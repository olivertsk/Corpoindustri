import type { Metadata } from 'next';

import { getProduct } from '@/src/api/ProductApi';
import BackBtn from '@/src/components/BackBtn';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import AddProductFavorite from '@/src/components/products/AddProductFavorite';
import ImagePreview from '@/src/components/products/ImagePreview';
import ProductBreadcrumb from '@/src/components/products/ProductBreadcrumb';
import { apiUrl } from '@/src/lib/global';
import ProductDetailPrices from '@/src/components/products/ProductDetailPrices';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id, true);

  return {
    title: product.name,
    description: product.longDescription || product.description || '',
    openGraph: {
      images: [`${apiUrl}/file/${product.coverImage}` || ''],
      description: product.longDescription || product.description || '',
      title: product.name,
    },
  };
}

export default async function ProductShowPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id, true);

  return (
    <>
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
                  Descripción del Producto
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
        <ProductsSlider
          products={product.relations}
          titleSection='Productos Relacionados'
        />
      </div>
    </>
  );
}
