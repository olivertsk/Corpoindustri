import type { Metadata } from 'next';
import SearchQueryProvider from '@/src/components/search/SearchQueryProvider';

export const metadata: Metadata = {
  title: 'Buscar Productos',
  description:
    'Explora el catalogo de Corpoindustri y encuentra productos mayoristas por categoria, precio y disponibilidad.',
  alternates: {
    canonical: '/buscar',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchQueryProvider>{children}</SearchQueryProvider>;
}
