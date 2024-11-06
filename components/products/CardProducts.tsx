import { Product } from '@/types';
import Image from 'next/image';

type CardProductsProps = {
  product: Product;
};

export default function CardProducts({ product }: CardProductsProps) {
  return (
    <div className='bg-white shadow-lg rounded-md pb-3'>
      <Image
        width={1024}
        height={1024}
        alt='Harina Pan'
        src='https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <h5 className='px-4 font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
        {product.name}
      </h5>
      <div className='flex px-4 justify-between items-center mt-2'>
        <p className='text-lg font-bold flex-1 overflow-hidden text-ellipsis'>
          $899.999999999999
        </p>
        <button className='text-white bg-secondary p-2 rounded-md'>
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
