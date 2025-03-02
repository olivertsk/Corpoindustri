import Image from 'next/image';
import Link from 'next/link';

import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import HandleProductClick from './HandleProductClick';
import { Product } from '@/src/types/product';
import { apiUrl } from '@/src/lib/global';
import calcProductTax from '@/src/utils/calcProductTax';

type CardProductsProps = {
  product: Product;
  className?: string;
};

export default function CardProducts({
  product,
  className,
}: CardProductsProps) {
  return (
    <div
      className={`bg-white product block shadow-sm rounded-xl pb-3 overflow-hidden ${className} relative group min-h-[350px]`}
    >
      {/* <div className='absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
        <AddProductFavorite product={product} />
      </div> */}
      <Link href={`/products/${product.id}`} className='block'>
        <Image
          width={1024}
          height={1024}
          alt='Harina Pan'
          src={
            `${apiUrl}/file/${
              product?.coverImage || product?.images[0]?.file
            }` || ''
          }
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1/1',
            objectFit: 'cover',
          }}
        />
        <h4 className='px-4 overflow-hidden text-ellipsis text-sm mt-3 text-slate-400'>
          {product.department?.name}
        </h4>
        <h5 className='px-4 font-bold overflow-hidden text-ellipsis text-base mt-2 h-[calc(1.25rem*2)] leading-5 line-clamp-2'>
          {product.name}
        </h5>
      </Link>
      <div className='flex px-4 justify-between h-[80px] mt-1'>
        <div>
          <p
            className={`text-sm  text-slate-500 flex-1 overflow-hidden text-ellipsis ${
              product.promotionalPrice && 'line-through text-slate-400 text-sm'
            }`}
          >
            Ref. {normalizeAmounts(product.price)}
          </p>
          {product.promotionalPrice ? (
            <p className='text-sm  text-slate-600 flex-1 overflow-hidden text-ellipsis w-full'>
              Ref Promo. {normalizeAmounts(product.promotionalPrice)}
            </p>
          ) : (
            ''
          )}
          {product.taxRate != null && product.taxRate > 0 && (
            <p className='text-sm text-slate-600'>
              IVA Ref. {calcProductTax(product, product.taxRate)}
            </p>
          )}
          <p className='text-sm font-bold'>
            Total Ref.{' '}
            {normalizeAmounts(
              product.priceWithTax || product.promotionalPrice || product.price
            )}
          </p>
        </div>
      </div>
      <div className='min-h-12 flex items-center justify-center px-4 mt-2'>
        <HandleProductClick product={product} />
      </div>
    </div>
  );
}
