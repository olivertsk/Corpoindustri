import { apiUrl } from '@/src/lib/global';
import { OrderProduct } from '@/src/types/product';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import Image from 'next/image';
import HandleQuantity from './HandleQuantity';
import { useCartStore } from '@/src/store/cartSlice';

type CartProductCardProps = {
  orderProduct: OrderProduct;
};

export default function CartProductCard({
  orderProduct,
}: CartProductCardProps) {
  const addQuantity = useCartStore((state) => state.addQuantity);
  const subtractQuantity = useCartStore((state) => state.subtractQuantity);

  const minusCb = () => {
    subtractQuantity(orderProduct);
  };

  const plusCb = () => {
    addQuantity(orderProduct);
  };

  return (
    <div className='grid grid-cols-3 border rounded-lg p-2 overflow-hidden'>
      <Image
        src={`${apiUrl}/file/${orderProduct.coverImage}`}
        alt={orderProduct.name}
        width={100}
        height={100}
      />
      <div className='col-span-2'>
        <h2>{orderProduct.name}</h2>
        <p
          className={`${
            orderProduct.promotionalPrice &&
            'line-through text-slate-400 text-sm'
          }`}
        >
          {normalizeAmounts(orderProduct.price)}
        </p>
        {orderProduct.promotionalPrice && (
          <p>{normalizeAmounts(orderProduct.promotionalPrice)}</p>
        )}
        <HandleQuantity
          minusCb={minusCb}
          plusCb={plusCb}
          quantity={orderProduct.quantity}
          orderProduct={orderProduct}
          showRemove={true}
        />
      </div>
    </div>
  );
}
