import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@/src/components/AppHeader';
import Footer from '@/src/components/Footer';
import ToastWrapper from '@/src/components/ToastWrapper';
import TransitionWrapper from '@/src/components/TransitionWrapper';
import RequestFavorites from '@/src/components/RequestFavorites';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Corpoindustri | Mayorista de alimentos al alcance de tu mano',
  description:
    'Somos una compañía mayorista de alimentos, brindamos servicios como delivery, combos personalizados, cotizaciones y atención personalizada.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <GoogleAnalytics gaId='G-DCPK0TYTBP' />
    </html>
  );
}
