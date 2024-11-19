import { Product } from '@/src/types';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import Image from 'next/image';
import Link from 'next/link';
import HandleProductClick from './HandleProductClick';

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
      className={`bg-white block shadow-md rounded-md pb-3 overflow-hidden ${className}`}
    >
      <Link href='/products/1' className='block'>
        <Image
          width={1024}
          height={1024}
          alt='Harina Pan'
          src={product.image}
          style={{ width: '100%', height: '100%' }}
        />
        <h5 className='px-4 font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
          {product.name}
        </h5>
      </Link>
      <div className='flex px-4 justify-between items-center mt-2'>
        <p className='text-lg font-bold flex-1 overflow-hidden text-ellipsis'>
          {normalizeAmounts(product.price)}
        </p>
        <HandleProductClick />
      </div>
    </div>
  );
}
