'use client';
import CheckoutStepper from '@/src/components/cart/checkout/CheckoutStepper';
import Heading from '@/src/components/Heading';
import CartProductCard from '@/src/components/products/CartProductCard';
import SubHeading from '@/src/components/SubHeading';
import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { containerStyles, primaryBtn } from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { useCartStore } from '@/src/store/cartSlice';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export default function CartPage() {
  const orderProducts = useCartStore((state) => state.orderProducts);
  const [isCheckoutStarted, setIsCheckoutStarted] = useState(false);
  const user = useAuthStore((store) => store.user);

  const handleOpen = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para continuar con la compra');
      return;
    }
    setIsCheckoutStarted(true);
  };

  const { choosePrice, validateNormalizeAmount } = useCalcAmount();
  const total = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) => (init += item.quantity * choosePrice(item)),
        0,
      ),
    [orderProducts, choosePrice],
  );

  const existProductByCoin = orderProducts.some((orderProduct) =>
    choosePrice(orderProduct),
  );

  const totalProducts = useMemo(
    () =>
      orderProducts.reduce(
        (acc, orderProduct) => acc + orderProduct.quantity,
        0,
      ),
    [orderProducts],
  );

  return (
    <main className='container mx-auto my-8'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start'>
        <section className='lg:col-span-8'>
          {isCheckoutStarted ? (
            <CheckoutStepper onCancel={() => setIsCheckoutStarted(false)} />
          ) : (
            <div className={containerStyles}>
              <Heading>Resumen de Carrito</Heading>
              <SubHeading>
                Aquí podrás ver todos los productos que has agregado al carrito
                de compras
              </SubHeading>
              <section className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
                {orderProducts.map((orderProduct, index) => (
                  <CartProductCard key={index} orderProduct={orderProduct} />
                ))}
                {!orderProducts.length && (
                  <h4 className='text-center col-span-2 font-bold text-2xl text-slate-500'>
                    Aún no hay productos agregados.
                  </h4>
                )}
              </section>
              {existProductByCoin && (
                <h4 className='text-slate-600 text-2xl mt-8 text-center'>
                  Total: <b>{validateNormalizeAmount(undefined, total)}</b>
                </h4>
              )}
            </div>
          )}
        </section>

        <aside className='lg:col-span-4'>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24'>
            <h3 className='text-3xl font-semibold text-slate-800'>
              Resumen del pedido
            </h3>

            <div className='mt-6 space-y-4 border-y border-slate-200 py-4'>
              <div className='flex items-center justify-between text-slate-700'>
                <span>Productos</span>
                <b>{totalProducts}</b>
              </div>
              <div className='flex items-center justify-between text-slate-700'>
                <span>Costo de productos</span>
                <b>{validateNormalizeAmount(undefined, total)}</b>
              </div>
            </div>

            <div className='mt-4 flex items-center justify-between text-2xl font-bold text-slate-900'>
              <span>Total</span>
              <span>{validateNormalizeAmount(undefined, total)}</span>
            </div>

            <button
              onClick={handleOpen}
              disabled={!existProductByCoin || isCheckoutStarted}
              className={`${primaryBtn} mt-6 w-full disabled:bg-gray-300 disabled:text-gray-500`}
            >
              {isCheckoutStarted
                ? 'Checkout en progreso'
                : 'Continuar con el pago'}
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
