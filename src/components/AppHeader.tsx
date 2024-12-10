'use client';

import HeaderButtons from './header/HeaderButtons';
import HeaderSearchbar from './header/HeaderSearchbar';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AppHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const handleOpenMenu = () => setOpenMenu(!openMenu);

  return (
    !pathname.includes('auth') &&
    !pathname.includes('admin') && (
      <header className='bg-primary py-4 px-2 sticky top-0 z-30'>
        <div className='container mx-auto flex gap-4 items-center'>
          <div className='max-w-[50px] lg:max-w-[100px]'>
            <Logo />
          </div>
          <HeaderSearchbar />
          <div className='hidden lg:block'>
            <HeaderButtons />
          </div>
          <div className='block lg:hidden'>
            <button className='text-white' onClick={handleOpenMenu}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z'
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 transition-all  lg:hidden bg-primary overflow-hidden min-h-screen ${
            openMenu ? 'w-full' : 'w-0'
          } z-30`}
        >
          <HeaderButtons handleOpenMenu={handleOpenMenu} />
        </div>
      </header>
    )
  );
}
