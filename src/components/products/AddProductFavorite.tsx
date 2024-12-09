'use client';

import { Product } from '@/src/types/product';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import {
  addProductToFavorites,
  removeProductToFavorites,
} from '@/src/api/FavoriteApi';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/src/store/authStore';
import { useState } from 'react';
import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';

type AddProductFavoriteProps = {
  product: Product;
};

export default function AddProductFavorite({
  product,
}: AddProductFavoriteProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(!!product.favorite);
  const user = useAuthStore((state) => state.user);
  const getFavorites = useAppGlobalStore((state) => state.getFavorites);

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      return;
    }
    try {
      if (!isFavorite) {
        await addProductToFavorites(product.id);
        toast.success('Producto agregado a favoritos');
      } else {
        await removeProductToFavorites(product.id);
        toast.success('Producto removido de favoritos');
      }
      getFavorites();
      setIsFavorite(!isFavorite);
    } catch {
      console.log('caitog aqui');
      toast.error('Ha ocurrido un error');
    }
  };

  return (
    <button
      className={`${
        isFavorite ? 'bg-red-200' : 'bg-transparent'
      } rounded-full p-2 border border-red-500 `}
      title={` ${isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'} `}
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <HeartIcon className='w-4 h-4 text-red-500 hover:scale-110 transition-transform' />
      ) : (
        <HeartIconOutline className='w-4 h-4 text-red-500 hover:scale-110 transition-transform' />
      )}
    </button>
  );
}
