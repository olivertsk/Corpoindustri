import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto y Cotizaciones',
  description:
    'Contacta a Corpoindustri para cotizaciones, consultas y soporte comercial para compras al mayor en Venezuela.',
  alternates: {
    canonical: '/contacto',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
