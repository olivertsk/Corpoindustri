import Image from 'next/image';
import Link from 'next/link';

import { apiUrl } from '@/src/lib/global';
import { Favorite } from '@/src/types/favorite';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';

type FavoriteCardProps = {
  favorite: Favorite;
};

export default function FavoriteCard({
  favorite: { product },
}: FavoriteCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className='grid grid-cols-3 border rounded-lg p-2 overflow-hidden'
    >
      <Image
        src={`${apiUrl}/file/${product.coverImage}`}
        alt={product.name}
        width={100}
        height={100}
      />
      <div className='col-span-2'>
        <h2 className='font-bold'>{product.name}</h2>
        <p
          className={`${
            product.promotionalPrice && 'line-through text-slate-400 text-sm'
          }`}
        >
          {normalizeAmounts(product.price)}
        </p>
        {product.promotionalPrice && (
          <p>{normalizeAmounts(product.promotionalPrice)}</p>
        )}
      </div>
    </Link>
  );
}
