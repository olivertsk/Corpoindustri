import { getProduct, getProducts } from '@/src/api/ProductApi';
import BackBtn from '@/src/components/BackBtn';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import ImagePreview from '@/src/components/products/ImagePreview';
import ProductBreadcrumb from '@/src/components/products/ProductBreadcrumb';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';

export default async function ProductShowPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id, false);
  const relatedProducts = await getProducts({
    pag: 1,
    categoryId: product.category?.id,
  });

  return (
    <>
      <div className='container mx-auto my-4 space-y-4 p-4'>
        <BackBtn />
        <ProductBreadcrumb product={product} />
      </div>
      <main className='container mx-auto bg-white py-8 rounded-xl shadow-sm'>
        <div className='grid grid-cols-3 px-8 gap-8 lg:gap-0'>
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
                <button className='text-accent-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79'
                    />
                  </svg>
                </button>
              </div>
              <h5
                className={`text-3xl font-bold mb-3 ${
                  product.promotionalPrice &&
                  'line-through text-slate-400 text-xl'
                }`}
              >
                {normalizeAmounts(product.price)}
              </h5>
              {product.promotionalPrice && (
                <h5 className='text-3xl font-bold mb-3'>
                  {normalizeAmounts(product.promotionalPrice)}
                </h5>
              )}
              <div
                className='whitespace-pre-wrap'
                dangerouslySetInnerHTML={{
                  __html: product.description || '',
                }}
              ></div>
              <button className='bg-accent-100 hover:bg-accent-200 transition-colors py-3 font-bold mt-8 w-full px-8 rounded-full'>
                Comprar
              </button>
            </div>
          </aside>
        </div>
      </main>
      <div className='container mx-auto mt-10'>
        <ProductsSlider
          products={relatedProducts.data}
          titleSection='Productos Relacionados'
        />
      </div>
    </>
  );
}
