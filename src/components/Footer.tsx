'use client';
import Link from 'next/link';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  return (
    !pathname?.includes('acceso') &&
    !pathname?.includes('admin') && (
      <>
        <footer className='container mx-auto px-3 lg:px-4 pb-6 lg:pb-10'>
          <div className='rounded-3xl bg-gradient-to-br from-primary to-primaryHover p-6 lg:p-10 shadow-[0_22px_48px_rgba(8,26,50,0.34)] border border-white/15 grid grid-cols-3 gap-10'>
            <div className='col-span-3 lg:col-span-1'>
              <div className='max-w-[200px] mx-auto'>
                <Logo></Logo>
              </div>
              <p className='text-center text-white/80 text-xs mt-4'>
                Inversiones Corpoindustri 2014, C.A.
              </p>
              <p className='text-center text-white text-xs font-bold'>
                Todos los derechos reservados
              </p>
            </div>
            <div className='col-span-3 lg:col-span-1'>
              <h4 className='text-center text-white font-bold text-2xl display-title'>
                Síguenos en nuestras redes
              </h4>
              <div className='flex items-center flex-wrap gap-x-4 mt-3'>
                <Link
                  href='https://www.instagram.com/corpoindustri/'
                  target='_blank'
                  className='flex gap-2 text-white py-2 px-3 rounded-xl w-full lg:w-auto hover:bg-white/10 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#ffffff'
                      d='M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2m4.6 2.42a7.6 7.6 0 0 0-.46-2.43a4.9 4.9 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.8 4.8 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.8 4.8 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.6 7.6 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12M20.14 16a5.6 5.6 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.2 3.2 0 0 1-1.15.75a5.6 5.6 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.7 5.7 0 0 1-1.94-.3a3.3 3.3 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.5 5.5 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.5 5.5 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.1 3.1 0 0 1 1.1-.8A5.7 5.7 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.6 5.6 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.1 3.1 0 0 1 .75 1.1a5.6 5.6 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4M12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87m0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33'
                    />
                  </svg>
                  Alimentos Corpoindustri
                </Link>
                <Link
                  href='https://www.facebook.com/Corpoindustri?locale=es_LA'
                  target='_blank'
                  className='flex gap-2 text-white py-2 px-3 rounded-xl w-full lg:w-auto hover:bg-white/10 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#ffffff'
                      d='M2.002 12.002a10.005 10.005 0 0 0 8.437 9.879v-6.989H7.902v-2.89h2.54v-2.2a3.528 3.528 0 0 1 3.773-3.9c.75.012 1.5.079 2.24.2v2.459h-1.264a1.446 1.446 0 0 0-1.628 1.563v1.878h2.771l-.443 2.891h-2.328v6.988a10 10 0 1 0-11.561-9.879Z'
                    />
                  </svg>
                  Alimentos Corpoindustri
                </Link>
                <Link
                  href='https://www.tiktok.com/@corpoindustri'
                  target='_blank'
                  className='flex gap-2 text-white py-2 px-3 rounded-xl w-full lg:w-auto hover:bg-white/10 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#ffffff'
                      d='M12.438 2.017C13.53 2 14.613 2.008 15.696 2c.067 1.275.525 2.575 1.459 3.475c.933.925 2.25 1.35 3.533 1.492v3.358c-1.2-.042-2.408-.292-3.5-.808c-.475-.217-.917-.492-1.35-.775c-.008 2.433.008 4.866-.017 7.291a6.36 6.36 0 0 1-1.125 3.283c-1.091 1.6-2.983 2.642-4.924 2.675c-1.192.067-2.384-.258-3.4-.858c-1.684-.992-2.867-2.808-3.042-4.758a16 16 0 0 1-.008-1.242c.15-1.583.933-3.1 2.15-4.133c1.383-1.2 3.316-1.775 5.125-1.433c.016 1.233-.034 2.466-.034 3.7c-.825-.267-1.791-.192-2.516.308a2.9 2.9 0 0 0-1.134 1.458c-.175.425-.125.892-.116 1.342c.2 1.366 1.516 2.516 2.916 2.392c.934-.009 1.825-.55 2.309-1.342c.158-.275.333-.559.341-.884c.084-1.491.05-2.975.059-4.466c.008-3.358-.009-6.708.016-10.058'
                    />
                  </svg>
                  corpoindustri
                </Link>
              </div>
            </div>
            <div className='text-center flex flex-col gap-3 col-span-3 lg:col-span-1'>
              <p className='text-white/80 text-xs font-semibold uppercase tracking-wide'>
                Centro de ayuda
              </p>
              <Link
                href='/about'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Conócenos
              </Link>
              <Link
                href='/profile/orders'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Estado de pedido
              </Link>
              <Link
                href='/contact'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Cotizaciones
              </Link>
              <Link
                href='/terms'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Términos y Condiciones
              </Link>
              <Link
                href='/terms'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Preguntas Frecuentes
              </Link>
              <Link
                href='/contact'
                className='text-white/95 text-center hover:text-accent-100 transition-colors'
              >
                Contáctanos
              </Link>
            </div>
            <div className='text-center col-span-3 flex justify-center'>
              <p className='mt-4 text-white'>
                🏅 Distribuidor Mayorista # 1 de Alimentos y Productos de
                Higiene de la Gran <strong>Caracas</strong> y{' '}
                <strong>Catia</strong>
              </p>
            </div>
          </div>
        </footer>
      </>
    )
  );
}
