'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Breadcrumb from '@/src/components/admin/Breadcrumb';
import Logo from '@/src/components/Logo';
import { adminButtons } from '@/src/config/adminPages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { ISplitProps } from 'split-pane-react/esm/types';

const hideMenuSize = '45px';
const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loaded, setLoaded] = useState(false);
  const [mQuery, setMQuery] = useState<{ matches: boolean }>({
    matches: false,
  });

  const [sizes, setSizes] = useState<ISplitProps['sizes']>([
    mQuery.matches ? 100 : 0,
    mQuery.matches ? '40%' : '100%',
  ]);

  console.log('sizes :>> ', sizes);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 1023px)');
      console.log(mediaQuery.matches);
      setSizes(mediaQuery.matches ? [100, '40%'] : [0, '100%']);
      setLoaded(true);
      mediaQuery.addEventListener('change', (ev) => {
        if (ev.matches) {
          setSizes([100, '40%']);
        } else {
          console.log('aqui');
          setSizes([0, '100%']);
        }
      });
    }
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    if (!mQuery.matches && loaded) {
      console.log('aqui 2');
      setSizes([0, '100%']);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 1023px)');
      setMQuery({
        matches: window.innerWidth >= 1024 ? true : false,
      });
      mediaQuery.addEventListener('change', (ev) => {
        if (ev.matches) {
          setMQuery({ matches: true });
          setSizes([100, '40%']);
        } else {
          setMQuery({ matches: false });
          setSizes([0, '100%']);
        }
      });
    }
  }, []);

  const handleExpandMenu = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 1023px)');
      if (!mediaQuery.matches) {
        if (sizes[0] === 0) {
          setSizes(['100%', '0%']);
        } else {
          setSizes([0, '100%']);
        }
      } else {
        if (sizes[0] === 100) {
          setSizes([hideMenuSize, '100%']);
        } else {
          setSizes([100, '40%']);
        }
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className='h-screen'>
        <SplitPane
          sashRender={() => <></>}
          split='vertical'
          sizes={sizes}
          onChange={setSizes}
          allowResize={false}
        >
          <Pane className='transition-all !overflow-auto'>
            <div className='min-h-screen bg-primary space-y-4 p-2'>
              <div className='mx-auto my-4 mb-7 flex justify-between lg:block'>
                <div className='max-w-[120px] lg:mx-auto'>
                  <Logo />
                </div>
                <button className='lg:hidden' onClick={handleExpandMenu}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#ffffff'
                      d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z'
                    />
                  </svg>
                </button>
              </div>
              {adminButtons.map((button) => (
                <Link
                  className={`${
                    pathname.includes(button.url) && button.url !== '/'
                      ? 'bg-white shadow-lg'
                      : ' text-white'
                  } p-2 flex rounded-md  text-sm gap-2`}
                  key={button.url}
                  href={button.url}
                >
                  <div dangerouslySetInnerHTML={{ __html: button.svg }}></div>
                  {button.text}
                </Link>
              ))}
            </div>
          </Pane>
          <Pane className={` !overflow-auto transition-all`}>
            <Breadcrumb handleExpandMenu={handleExpandMenu}></Breadcrumb>
            <section className='p-4'>{children}</section>
          </Pane>
        </SplitPane>
      </main>
    </QueryClientProvider>
  );
}
