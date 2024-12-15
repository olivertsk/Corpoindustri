import { apiUrl } from '@/src/lib/global';
import { OrderProduct } from '@/src/types/product';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import Image from 'next/image';
import CartProductsQuantity from './CartProductsQuantity';
import Link from 'next/link';

type CartProductCardProps = {
  orderProduct: OrderProduct;
};

export default function CartProductCard({
  orderProduct,
}: CartProductCardProps) {
  return (
    <div className='grid grid-cols-3 border rounded-lg p-2 overflow-hidden'>
      <Image
        src={`${apiUrl}/file/${orderProduct.coverImage}`}
        alt={orderProduct.name}
        width={100}
        height={100}
      />
      <div className='col-span-2'>
        <Link href={`/products/${orderProduct.id}`} className='font-bold'>
          {orderProduct.name}
        </Link>
        <p
          className={`${
            orderProduct.promotionalPrice &&
            'line-through text-slate-400 text-sm'
          }`}
        >
          {normalizeAmounts(orderProduct.price)}
        </p>
        {orderProduct.promotionalPrice !== null &&
          orderProduct.promotionalPrice > 0 && (
            <p>{normalizeAmounts(orderProduct.promotionalPrice)}</p>
          )}
        <CartProductsQuantity orderProduct={orderProduct} />
      </div>
    </div>
  );
}
