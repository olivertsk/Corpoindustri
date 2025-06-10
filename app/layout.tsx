import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@/src/components/AppHeader';
import Footer from '@/src/components/Footer';
import ToastWrapper from '@/src/components/ToastWrapper';
import TransitionWrapper from '@/src/components/TransitionWrapper';
import RequestFavorites from '@/src/components/RequestFavorites';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

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
      {/* Remove synchronous script and use Next.js Script component below */}

      <Script src='https://www.google.com/recaptcha/enterprise.js?render=6Lek1kUrAAAAAJbq8i-BupfcyP1WaN3ZV9_t-8-3' />
      <body className='bg-gray-100 relative'>
        <RequestFavorites />
        <TransitionWrapper />
        <ToastWrapper />
        <AppHeader />
        {children}
        <Footer />
        <GoogleAnalytics gaId='G-DCPK0TYTBP' />
        {/* Load reCAPTCHA asynchronously using Next.js Script */}
      </body>
    </html>
  );
}
