'use client';

import { useCartStore } from '@/src/store/cartSlice';
import { Product } from '@/src/types/product';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import HandleQuantity from './HandleQuantity';
import { useMultiCoinStore } from '@/src/store/multicoinStore';

type AddProductToOrderProps = {
  product: Product;
};

export default function AddProductToOrder({ product }: AddProductToOrderProps) {
  const [quantity, setQuantity] = useState(1);
  const addProduct = useCartStore((state) => state.addProduct);
  const selectedCoin = useMultiCoinStore((state) => state.selectedCoin);

  const handleAddCart = () => {
    addProduct(product, quantity, selectedCoin);
    setQuantity(1);
    toast.success('Producto agregado al carrito');
  };

  if (!product.status) {
    return (
      <div className='bg-red-100 p-4 rounded-xl text-red-700'>
        Producto no disponible
      </div>
    );
  }

  return (
    <>
      <div className='flex gap-4 mt-4 '>
        <HandleQuantity
          minusCb={setQuantity}
          plusCb={setQuantity}
          quantity={quantity}
        />
        <button
          onClick={handleAddCart}
          className='bg-accent-100 hover:bg-accent-200 transition-colors py-3 font-bold px-8 flex items-center gap-2 rounded-full'
        >
          <ShoppingCartIcon className='w-4' />
          Agregar
        </button>
      </div>
      <Link
        href='/cart'
        className='rounded-full block w-full text-center p-3 bg-slate-200 font-bold mt-4 hover:bg-slate-300 transition-colors'
      >
        Ir al carrito
      </Link>
    </>
  );
}
