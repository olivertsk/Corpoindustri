import { Product } from '@/types';
import { normalizeAmounts } from '@/utils/normalizeAmounts';
import Image from 'next/image';
import Link from 'next/link';

type CardProductsProps = {
  product: Product;
};

export default function CardProducts({ product }: CardProductsProps) {
  const handleButtonClick = () => {
    console.log('Botón clicado');
  };

  return (
    <div className='bg-white block shadow-md rounded-md pb-3 overflow-hidden'>
      <Link href='/products/1' className='block'>
        <Image
          width={1024}
          height={1024}
          alt='Harina Pan'
          src={product.image}
          style={{ width: '100%', height: '100%' }}
        />
        <h5 className='px-4 font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
          {product.name}
        </h5>
      </Link>
      <div className='flex px-4 justify-between items-center mt-2'>
        <p className='text-lg font-bold flex-1 overflow-hidden text-ellipsis'>
          {normalizeAmounts(product.price)}
        </p>
        <button
          className='text-black hover:bg-accent-200 transition-colors bg-accent-100 p-2 rounded-md'
          onClick={handleButtonClick}
          title='Agregar al carrito'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M160 96.039v32h304v63.345l-35.5 112.655H149.932L109.932 16H16v32h66.068l40 288.039h329.9L496 196.306V96.039zm16.984 272.305a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.07 64.07 0 0 0-64-64m0 96a32 32 0 1 1 32-32a32.04 32.04 0 0 1-32 32m224-96a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.07 64.07 0 0 0-64-64m0 96a32 32 0 1 1 32-32a32.04 32.04 0 0 1-32 32'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
