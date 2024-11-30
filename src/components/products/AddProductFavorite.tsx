import { Product } from '@/src/types/product';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

type AddProductFavoriteProps = {
  product: Product;
};

export default function AddProductFavorite({
  product,
}: AddProductFavoriteProps) {
  return (
    <button
      className={`${
        product.isFavorite ? 'bg-red-200' : 'bg-transparent'
      } rounded-full p-2 border border-red-500 `}
      title={` ${
        product.isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'
      } `}
    >
      {product.isFavorite ? (
        <HeartIcon className='w-4 h-4 text-red-500 hover:scale-110 transition-transform' />
      ) : (
        <HeartIconOutline className='w-4 h-4 text-red-500 hover:scale-110 transition-transform' />
      )}
    </button>
  );
}
