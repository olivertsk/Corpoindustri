'use client';
import CartProductCard from '@/src/components/products/CartProductCard';
import { containerStyles, primaryBtn } from '@/src/lib/global';
import { useCartStore } from '@/src/store/cartSlice';

export default function CartPage() {
  const orderProducts = useCartStore((state) => state.orderProducts);

  return (
    <main className='container mx-auto my-8'>
      <div className={`${containerStyles} !shadow-sm !rounded-xl`}>
        <h4 className='font-bold text-slate-600 text-3xl'>
          Resumen de Carrito
        </h4>
        <p>
          Aquí podrás ver todos los productos que has agregado al carrito de
          compras
        </p>
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
        <div className='mt-8 flex justify-center'>
          <button className={`${primaryBtn} !rounded-full`}>
            {' '}
            Continuar con la compra
          </button>
        </div>
      </div>
    </main>
  );
}
