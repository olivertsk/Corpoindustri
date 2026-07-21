import Image from 'next/image';
import Link from 'next/link';

import { apiUrl } from '@/src/lib/global';
import { Favorite } from '@/src/types/favorite';
import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { buildProductSlug } from '@/src/utils/productSlug';

type FavoriteCardProps = {
  favorite: Favorite;
};

export default function FavoriteCard({
  favorite: { product },
}: FavoriteCardProps) {
  const { validateNormalizeAmount, calcProductTax } = useCalcAmount();
  const productSlug = buildProductSlug({ id: product.id, name: product.name });

  return (
    product && (
      <Link
        href={`/productos/${productSlug}`}
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
          loading='lazy'
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
              Ref. {validateNormalizeAmount(product, undefined, 'price')}
            </p>
            {product.promotionalPrice ? (
              <p className='text-sm  text-slate-600 flex-1 overflow-hidden text-ellipsis w-full'>
                Ref Promo.{' '}
                {validateNormalizeAmount(product, undefined, 'promoPrice')}
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
              Total Ref. {validateNormalizeAmount(product)}
            </p>
          </div>
        </div>
      </Link>
    )
  );
}
