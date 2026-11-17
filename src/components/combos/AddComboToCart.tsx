'use client';

import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { useCartStore } from '@/src/store/cartSlice';
import { Combo } from '@/src/types/combo';
import { toast } from 'react-toastify';

type AddComboToCartProps = {
  combo: Combo;
  className?: string;
};

export default function AddComboToCart({
  combo,
  className,
}: AddComboToCartProps) {
  const addProduct = useCartStore((state) => state.addProduct);
  const { currentCoin } = useCalcAmount();

  const handleAddCombo = () => {
    const products = combo.products || [];
    const added = products.filter((item) => item.productDetail);
    if (added.length === 0) {
      toast.info('Este combo no tiene productos disponibles');
      return;
    }
    /** Provisional: se agregan los productos del combo individualmente al carrito */
    added.forEach((item) => {
      addProduct(item.productDetail!, item.quantity || 1, currentCoin);
    });
    toast.success('Combo agregado al carrito');
  };

  return (
    <button
      className={`text-sm lg:text-base transition-colors flex items-center w-full justify-between lg:px-3 p-2 rounded-md bg-accent-100 border-yellow-400 border-2 text-slate-700 font-bold hover:bg-yellow-200 ${className || ''}`}
      onClick={handleAddCombo}
      type='button'
      title='Agregar combo al carrito'
    >
      Agregar combo al carrito
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 42 42'
      >
        <path
          fill='currentColor'
          d='M40.5 12.5c0-1.48-.311-2-1.872-2H11.726l-.801-5c-.109-1.46-.85-2-2.421-2H2.501C1.02 3.5.5 3.99.5 5.5v1c0 1.551.52 2 2.001 2h3.722l3.282 19c.35 1.04 1.311 1.95 3.001 2h22.012c1.75 0 2.57-.359 3.002-2zm-7.023 12H13.696l-1.471-9h22.951zm-19.97 12a4 4 0 0 0 4.002 4a4 4 0 1 0 0-8a4 4 0 0 0-4.002 4m13.007 0a4 4 0 0 0 4.002 4a4 4 0 1 0 0-8a4 4 0 0 0-4.002 4'
        />
      </svg>
    </button>
  );
}
