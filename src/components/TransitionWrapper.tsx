'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { sleep } from '../utils/addTransitionAnimation';
import Logo from './Logo';
import Spinner from './spinner/Spinner';

export default function TransitionWrapper() {
  const pathName = usePathname();
  const transitionWrapper = document.querySelector('#transition-wrapper');

  useEffect(() => {
    console.log('changedpathName :>> ', pathName);
    setTimeout(async () => {
      if (transitionWrapper) {
        await sleep(500);
        transitionWrapper.classList.remove('page-transition');
      }
    });
  }, [pathName]);

  return (
    <div
      id='transition-wrapper'
      className='fixed w-full h-[0vh] opacity-0 overflow-hidden z-50 top-0 left-0 bg-gradient-to-b from-primary to-secondary flex justify-center items-center'
    >
      <div className='max-w-[200px] m-auto '>
        <Logo />
        <Spinner spinnerColor='#fff' />
      </div>
    </div>
  );
}
