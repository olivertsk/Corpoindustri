import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@/src/components/AppHeader';
import Footer from '@/src/components/Footer';
import ToastWrapper from '@/src/components/ToastWrapper';
import TransitionWrapper from '@/src/components/TransitionWrapper';
import RequestFavorites from '@/src/components/RequestFavorites';

export const metadata: Metadata = {
  title: 'Corpoindustri',
  description:
    'Somos una compañía mayorista de alimentos, brindamos servicios como delivery, combos personalizados, cotizaciones y atención personalizada, acá te anexo una imagen con información relativa a nuestra empresa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('aqui');
  return (
    <html lang='es'>
      <body className='bg-gray-100 relative'>
        <RequestFavorites />
        <TransitionWrapper />
        <ToastWrapper />
        <AppHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
