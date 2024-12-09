import { getProduct, getProducts } from '@/src/api/ProductApi';
import BackBtn from '@/src/components/BackBtn';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import AddProductFavorite from '@/src/components/products/AddProductFavorite';
import AddProductToOrder from '@/src/components/products/AddProductToOrder';
import ImagePreview from '@/src/components/products/ImagePreview';
import ProductBreadcrumb from '@/src/components/products/ProductBreadcrumb';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';

export default async function ProductShowPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id, true);
  const relatedProducts = await getProducts({
    pag: 1,
    categoryId: product.category?.id,
  });

  console.log('product :>> ', product);

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
                <AddProductFavorite product={product} />
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
              <AddProductToOrder product={product} />
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
