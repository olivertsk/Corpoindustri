import Link from 'next/link';
import Image from 'next/image';

import { useAuthStore } from '@/src/store/authStore';
import { apiUrl } from '@/src/lib/global';
import Logo from '../Logo';
import { toast } from 'react-toastify';
import { useCartStore } from '@/src/store/cartSlice';
import { useMemo } from 'react';

const menuBtnStyles = `text-white flex lg:flex-col items-center gap-2 p-4 lg:p-0`;
const subStyles = 'bottom-0 lg:-bottom-[5px]';

type HeaderButtonsProps = {
  handleOpenMenu?: () => void;
};

export default function HeaderButtons({ handleOpenMenu }: HeaderButtonsProps) {
  /** IMPLEMENTING AUTH STORE */
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const orderProducts = useCartStore((state) => state.orderProducts);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
  };

  const productsQuantity = useMemo(() => orderProducts.length, [orderProducts]);

  return (
    <nav className='flex lg:gap-8 lg:ml-8 flex-col items-start lg:flex-row'>
      <div className='flex w-full p-4 justify-between items-center lg:hidden'>
        <div className='max-w-[80px]'>
          <Logo />
        </div>
        <button onClick={handleOpenMenu} className='text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z'
            />
          </svg>
        </button>
      </div>
      <div className={`${menuBtnStyles} group`}>
        <Link
          className={menuBtnStyles}
          href={user !== null ? '/profile' : '/auth/sign-in'}
        >
          {user !== null && user.avatar ? (
            <Image
              className='rounded-full'
              src={`${apiUrl}/file/${user.avatar}`}
              alt='upload image'
              width={24}
              height={24}
            />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                color='currentColor'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M7.5 17c2.332-2.442 6.643-2.557 9 0m-2.005-7.5c0 1.38-1.12 2.5-2.503 2.5a2.5 2.5 0 0 1-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.5 2.5 0 0 1 2.503 2.5' />
              </g>
            </svg>
          )}
          <sub className={subStyles}>
            {user !== null ? user.name : 'Iniciar Sesión'}
          </sub>
        </Link>
        {user !== null && (
          <div className='absolute top-[80%] w-64 bg-white p-4 hidden user-options group-hover:flex shadow-lg rounded-md text-black flex-col gap-2 text-sm'>
            <Link
              className='hover:text-gray-700 p-1 flex justify-between'
              href='/profile'
            >
              Perfil
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <g fill='none' stroke='currentColor'>
                  <path
                    strokeLinejoin='round'
                    d='M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'
                  />
                  <circle cx='12' cy='7' r='3' />
                </g>
              </svg>
            </Link>
            <Link
              className='hover:text-gray-700 p-1 flex justify-between'
              href='/profile/orders'
            >
              Mis Pedidos
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M11.962 20q-3.046 0-5.311-1.99q-2.264-1.989-2.62-5.01h1.011q.408 2.58 2.351 4.29T11.962 19q2.925 0 4.962-2.037T18.962 12t-2.038-4.963T11.962 5q-1.553 0-2.918.656q-1.365.655-2.41 1.805h2.481v1H4.962V4.309h1v2.388q1.16-1.273 2.718-1.984T11.962 4q1.663 0 3.118.626t2.542 1.714t1.714 2.542t.626 3.118t-.626 3.118t-1.714 2.542t-2.542 1.714t-3.118.626m3.204-4.146l-3.647-3.646V7h1v4.792l3.354 3.354z'
                />
              </svg>
            </Link>
            <button
              className='hover:text-gray-700 p-1 text-left flex justify-between'
              type='button'
              onClick={handleLogout}
            >
              Cerrar Sesión
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <Link href='/cart' className={menuBtnStyles}>
        <div className='relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M160 96.039v32h304v63.345l-35.5 112.655H149.932L109.932 16H16v32h66.068l40 288.039h329.9L496 196.306V96.039zm16.984 272.305a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.07 64.07 0 0 0-64-64m0 96a32 32 0 1 1 32-32a32.04 32.04 0 0 1-32 32m224-96a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.07 64.07 0 0 0-64-64m0 96a32 32 0 1 1 32-32a32.04 32.04 0 0 1-32 32'
            />
          </svg>
          <span className='absolute text-xs -top-1 -right-1 bg-accent-100 text-black rounded-full px-1'>
            {productsQuantity}
          </span>
        </div>
        <sub className={subStyles}>Carrito</sub>
      </Link>
      <Link href='/home/favorites' className={menuBtnStyles}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79'
          />
        </svg>
        <sub className={subStyles}>Favoritos</sub>
      </Link>
      <Link href='/home/favorites' className={menuBtnStyles}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 512 512'
        >
          <path
            fill='currentColor'
            d='m450.27 348.569l-43.67-80.624V184c0-83.813-68.187-152-152-152s-152 68.187-152 152v83.945l-43.672 80.623A24 24 0 0 0 80.031 384h86.935a89 89 0 0 0-.367 8a88 88 0 0 0 176 0c0-2.7-.129-5.364-.367-8h86.935a24 24 0 0 0 21.1-35.431ZM310.6 392a56 56 0 1 1-111.419-8h110.837a56 56 0 0 1 .582 8M93.462 352l41.138-75.945V184a120 120 0 0 1 240 0v92.055L415.736 352Z'
          />
        </svg>
        <sub className={subStyles}>Notificaciones</sub>
      </Link>
      <Link
        href='/home/favorites'
        className={`${menuBtnStyles} block lg:hidden`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h6.403v1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h6.404v1zm10.846-4.461l-.702-.72l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.702-.718L20 12z'
          />
        </svg>
        <sub className={subStyles}>Cerrar Sesión</sub>
      </Link>
    </nav>
  );
}
