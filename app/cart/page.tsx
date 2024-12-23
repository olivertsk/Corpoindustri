'use client';
import ContinuePayment from '@/src/components/cart/ContinuePayment';
import Heading from '@/src/components/Heading';
import CartProductCard from '@/src/components/products/CartProductCard';
import SubHeading from '@/src/components/SubHeading';
import { containerStyles, primaryBtn } from '@/src/lib/global';
import { useCartStore } from '@/src/store/cartSlice';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import { useMemo, useState } from 'react';

export default function CartPage() {
  const orderProducts = useCartStore((state) => state.orderProducts);
  const [open, setOpen] = useState(false);

  const total = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) =>
          (init +=
            item.quantity *
            (item.priceWithTax || item.promotionalPrice || item.price)),
        0
      ),
    [orderProducts]
  );

  return (
    <main className='container mx-auto my-8'>
      <div className={containerStyles}>
        <Heading>Resumen de Carrito</Heading>
        <SubHeading>
          Aquí podrás ver todos los productos que has agregado al carrito de
          compras
        </SubHeading>
        <section className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {orderProducts.map((orderProduct, index) => (
            <CartProductCard key={index} orderProduct={orderProduct} />
          ))}
          {!orderProducts.length && (
            <h4 className='text-center col-span-4 font-bold text-2xl text-slate-500'>
              Aún no hay productos agregados.
            </h4>
          )}
        </section>
        {orderProducts.length > 0 && (
          <>
            <h4 className='text-slate-600 text-2xl mt-8 text-center'>
              Total: <b>{normalizeAmounts(total)}</b>
            </h4>
            <div className='mt-8 flex justify-center'>
              <button
                onClick={() => setOpen(true)}
                className={`${primaryBtn} !rounded-full`}
              >
                {' '}
                Continuar con la compra
              </button>
            </div>
          </>
        )}
      </div>

      <ContinuePayment open={open} setOpen={setOpen} />
    </main>
  );
}
