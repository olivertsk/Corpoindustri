import type { Metadata } from 'next';
import './globals.css';

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
  return (
    <html lang='es'>
      <body className='bg-gray-100'>{children}</body>
    </html>
  );
}
