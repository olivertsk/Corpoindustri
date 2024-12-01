'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Breadcrumb from '@/src/components/admin/Breadcrumb';
import Logo from '@/src/components/Logo';
import { adminButtons } from '@/src/config/adminPages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { ISplitProps } from 'split-pane-react/esm/types';

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [mQuery, setMQuery] = useState<{ matches: boolean }>({
  //   matches: false,
  // });

  const [sizes, setSizes] = useState<ISplitProps['sizes']>([0, '100%']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 1023px)');
      // setMQuery({ matches: mediaQuery.matches });
      setSizes(mediaQuery.matches ? [100, '40%'] : [0, '100%']);

      mediaQuery.addEventListener('change', (ev) => {
        if (ev.matches) {
          // setMQuery({ matches: true });
          setSizes([100, '40%']);
        } else {
          // setMQuery({ matches: false });
          setSizes([0, '100%']);
        }
      });
    }
  }, []);

  const pathname = usePathname();

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
          <Pane minSize={50} className='transition-all'>
            <div className='min-h-screen bg-primary space-y-4 p-2'>
              <div className='max-w-[150px] mx-auto my-4 mb-7'>
                <Logo />
              </div>
              {adminButtons.map((button) => (
                <Link
                  className={`${
                    pathname.includes(button.url)
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
            <Breadcrumb></Breadcrumb>
            <section className='p-4'>{children}</section>
          </Pane>
        </SplitPane>
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </main>
    </QueryClientProvider>
  );
}
