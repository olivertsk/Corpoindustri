import Image from 'next/image';
import Link from 'next/link';

import { apiUrl } from '@/src/lib/global';
import { Favorite } from '@/src/types/favorite';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import calcProductTax from '@/src/utils/calcProductTax';

type FavoriteCardProps = {
  favorite: Favorite;
};

export default function FavoriteCard({
  favorite: { product },
}: FavoriteCardProps) {
  return (
    product && (
      <Link
        href={`/products/${product.id}`}
        className='grid grid-cols-3 border rounded-lg p-2 overflow-hidden'
      >
        <Image
          src={
            product.coverImage || product.images.length > 0
              ? `${apiUrl}/file/${
                  product.coverImage || product?.images[0]?.file
                }`
              : '/logo.png'
          }
          alt={product.name}
          width={100}
          height={100}
          className='rounded-md'
        />
        <div className='col-span-2'>
          <h2 className='font-bold'>{product.name}</h2>
          <div>
            <p
              className={`text-sm  text-slate-500 flex-1 overflow-hidden text-ellipsis ${
                product.promotionalPrice &&
                'line-through text-slate-400 text-sm'
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
                product.priceWithTax ||
                  product.promotionalPrice ||
                  product.price
              )}
            </p>
          </div>
        </div>
      </Link>
    )
  );
}
