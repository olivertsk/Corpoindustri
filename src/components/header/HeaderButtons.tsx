import Link from 'next/link';

import { useAuthStore } from '@/src/store/authStore';
import Logo from '../Logo';
import { toast } from 'react-toastify';
import { useCartStore } from '@/src/store/cartSlice';
import { useMemo } from 'react';
import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';
import AuthButton from './AuthButton';
import AuthButtonMobile from './AuthButtonMobile';
import { useRouter } from 'next/navigation';
import PushNotification from './PushNotification';

export const menuBtnStyles = `text-white flex lg:flex-col items-center gap-2 p-4 lg:p-0`;
export const subStyles = 'bottom-0 lg:-bottom-[5px]';

type HeaderButtonsProps = {
  handleOpenMenu?: () => void;
};

export default function HeaderButtons({ handleOpenMenu }: HeaderButtonsProps) {
  /** IMPLEMENTING AUTH STORE */
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const orderProducts = useCartStore((state) => state.orderProducts);
  const favoriteProducts = useAppGlobalStore((state) => state.favorite);

  const handleLogout = () => {
    logout();
    router.replace('/');
    toast.success('Sesión cerrada correctamente');
    toggleMenu();
  };

  const toggleMenu = () => {
    if (handleOpenMenu) handleOpenMenu();
  };

  const productsQuantity = useMemo(() => orderProducts.length, [orderProducts]);
  const favoriteQuantity = useMemo(
    () => favoriteProducts.length,
    [favoriteProducts]
  );

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
      <AuthButton toggleMenu={toggleMenu} handleLogout={handleLogout} />
      <AuthButtonMobile toggleMenu={toggleMenu} />
      <Link href='/cart' className={menuBtnStyles} onClick={toggleMenu}>
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
      <Link href='/favorites' className={menuBtnStyles} onClick={toggleMenu}>
        <div className='relative'>
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
          <span className='absolute text-xs -top-1 -right-1 bg-accent-100 text-black rounded-full px-1'>
            {favoriteQuantity}
          </span>
        </div>
        <sub className={subStyles}>Favoritos</sub>
      </Link>
      <PushNotification />
      <button
        onClick={handleLogout}
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
      </button>
    </nav>
  );
}
