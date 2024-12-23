import { apiUrl } from '@/src/lib/global';
import { OrderProduct } from '@/src/types/product';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import Image from 'next/image';
import CartProductsQuantity from './CartProductsQuantity';
import Link from 'next/link';
import calcProductTax from '@/src/utils/calcProductTax';

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
          Ref. <b> {normalizeAmounts(orderProduct.price)}</b>
        </p>
        {orderProduct.promotionalPrice !== null &&
          orderProduct.promotionalPrice > 0 && (
            <p>
              Ref Promo.{' '}
              <b> {normalizeAmounts(orderProduct.promotionalPrice)}</b>
            </p>
          )}
        <p>
          IVA Ref. <b> {calcProductTax(orderProduct, orderProduct.taxRate)} </b>
        </p>
        <p>
          Subtotal:{' '}
          <b>
            {normalizeAmounts(
              orderProduct.quantity *
                (orderProduct.priceWithTax ||
                  orderProduct.promotionalPrice ||
                  orderProduct.price)
            )}
          </b>
        </p>
        <CartProductsQuantity orderProduct={orderProduct} />
      </div>
    </div>
  );
}
