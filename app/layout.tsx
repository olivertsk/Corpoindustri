import type { Metadata } from 'next';
import AppHeader from '@/src/components/AppHeader';
import Footer from '@/src/components/Footer';
import ToastWrapper from '@/src/components/ToastWrapper';
import TransitionWrapper from '@/src/components/TransitionWrapper';
import RequestFavorites from '@/src/components/RequestFavorites';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { googleCaptchaPublicKey } from '@/src/config/google_captcha';
import './globals.css';
import 'react-quill-new/dist/quill.snow.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://corpoindustri.com'),
  title: {
    default:
      'Corpoindustri | Mayorista de alimentos y productos para tu negocio',
    template: '%s | Corpoindustri',
  },
  description:
    'Mayorista B2B en Venezuela para abastos, bodegas y comercios. Compra víveres, limpieza y productos de alta rotación con delivery, cotizaciones y atención personalizada. Distribuidor Mayorista # 1 de Alimentos y Productos de Higiene de la Gran Caracas y Catia.',
  keywords: [
    'mayorista de alimentos en venezuela',
    'víveres al mayor en caracas',
    'distribuidora de alimentos',
    'combos mayoristas',
    'proveedor para bodegas',
    'proveedor de víveres para bodegas',
    'corpoindustri',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://corpoindustri.com',
    siteName: 'Corpoindustri',
    title: 'Corpoindustri | Mayorista de alimentos y productos para tu negocio',
    description:
      'Compra al mayor para tu negocio en Venezuela con precios competitivos, cobertura y atención personalizada. Distribuidor Mayorista # 1 de Alimentos y Productos de Higiene de la Gran Caracas y Catia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corpoindustri | Mayorista de alimentos y productos para tu negocio',
    description:
      'Mayorista B2B para abastos, bodegas y comercios con delivery y cotizaciones rápidas. Distribuidor Mayorista # 1 de Alimentos y Productos de Higiene de la Gran Caracas y Catia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Corpoindustri',
    url: 'https://corpoindustri.com',
    logo: 'https://corpoindustri.com/logo.png',
    sameAs: [
      'https://www.instagram.com/corpoindustri/',
      'https://www.facebook.com/Corpoindustri?locale=es_LA',
      'https://www.tiktok.com/@corpoindustri',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        areaServed: 'VE',
        availableLanguage: ['Spanish'],
      },
    ],
  };

  return (
    <html lang='es'>
      {/* Remove synchronous script and use Next.js Script component below */}

      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${googleCaptchaPublicKey}`}
      />
      <body className='relative'>
        <RequestFavorites />
        <TransitionWrapper />
        <ToastWrapper />
        <Script
          id='organization-jsonld'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <AppHeader />
        {children}
        <Footer />
        <GoogleAnalytics gaId='G-DCPK0TYTBP' />
        {/* Load reCAPTCHA asynchronously using Next.js Script */}
      </body>
    </html>
  );
}
