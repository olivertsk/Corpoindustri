import { apiUrl } from '@/src/lib/global';
import { OrderProduct } from '@/src/types/product';
import Image from 'next/image';
import CartProductsQuantity from './CartProductsQuantity';
import Link from 'next/link';
import { useCartStore } from '@/src/store/cartSlice';
import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { buildProductSlug } from '@/src/utils/productSlug';

type CartProductCardProps = {
  orderProduct: OrderProduct;
};

export default function CartProductCard({
  orderProduct,
}: CartProductCardProps) {
  const { choosePrice, validateNormalizeAmount, calcProductTax, currentCoin } =
    useCalcAmount();
  const productSlug = buildProductSlug({
    id: orderProduct.id,
    name: orderProduct.name,
  });

  const totalRef = choosePrice(orderProduct, false);

  const removeProduct = useCartStore((state) => state.removeProduct);

  return (
    <div className='flex flex-col'>
      <div
        className={`grid grid-cols-3 border rounded-lg p-2 overflow-hidden ${
          !totalRef && 'opacity-50 pointer-events-none'
        }`}
      >
        <Image
          src={
            orderProduct.coverImage
              ? `${apiUrl}/file/${orderProduct.coverImage}`
              : '/logo.png'
          }
          alt={orderProduct.name}
          width={100}
          height={100}
          className='rounded-md'
        />
        <div className='col-span-2'>
          <Link href={`/productos/${productSlug}`} className='font-bold'>
            {orderProduct.name}
          </Link>
          <p
            className={`${
              orderProduct.promotionalPrice &&
              'line-through text-slate-400 text-sm'
            }`}
          >
            Ref. <b> {validateNormalizeAmount(orderProduct)}</b>
          </p>
          {orderProduct.promotionalPrice !== null &&
            orderProduct.promotionalPrice > 0 && (
              <p>
                Ref Promo.{' '}
                <b>
                  {' '}
                  {validateNormalizeAmount(
                    orderProduct,
                    undefined,
                    'promoPrice',
                  )}
                </b>
              </p>
            )}
          <p>
            IVA Ref.{' '}
            <b> {calcProductTax(orderProduct, orderProduct.taxRate)} </b>
          </p>
          <p>
            Subtotal:{' '}
            <b>
              {validateNormalizeAmount(
                undefined,
                orderProduct.quantity * totalRef,
              )}
            </b>
          </p>
          {!!totalRef && <CartProductsQuantity orderProduct={orderProduct} />}
        </div>
      </div>
      {!totalRef && (
        <div className='flex justify-between gap-2'>
          <p className='text-slate-400 text-sm mt-1'>
            Este producto no está disponible en {currentCoin.value} <br /> (No
            será agregado en la compra)
          </p>
          <button
            onClick={() => removeProduct(orderProduct)}
            className='flex items-center gap-1 text-red-500 text-sm mt-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 56 56'
            >
              <path
                fill='#e11d48'
                d='M28 51.906c13.055 0 23.906-10.851 23.906-23.906c0-13.078-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.922 4.095 28c0 13.055 10.828 23.906 23.906 23.906m-5.79-9.984c-1.663 0-2.624-.914-2.695-2.578l-.867-19.125h-1.406a1.19 1.19 0 0 1-1.172-1.172c0-.656.54-1.172 1.172-1.172h5.32v-1.898c0-1.829 1.196-2.977 2.93-2.977h4.898c1.735 0 2.93 1.148 2.93 2.977v1.898h5.32c.633 0 1.149.516 1.149 1.172c0 .633-.516 1.172-1.148 1.172h-1.36l-.867 19.125c-.094 1.664-1.055 2.578-2.719 2.578Zm2.72-24.047h6.023v-1.453c0-.633-.445-1.055-1.102-1.055h-3.843c-.633 0-1.078.422-1.078 1.055Zm-1.29 21.469c.587 0 .938-.399.915-.961l-.563-15.703c-.047-.563-.398-.938-.937-.938c-.586 0-.961.399-.938.938l.633 15.726c.023.563.375.938.89.938m4.313-.024c.586 0 .961-.375.961-.937V22.68c0-.54-.375-.938-.961-.938s-.96.399-.96.938v15.703c0 .562.398.937.96.937m4.336.024c.516 0 .867-.375.89-.938l.633-15.726c.024-.54-.375-.938-.96-.938c-.516 0-.891.375-.915.938l-.562 15.703c-.024.562.328.96.914.96'
              />
            </svg>
            Remover
          </button>
        </div>
      )}
    </div>
  );
}
