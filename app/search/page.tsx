'use client';

import { getProducts, ProductFilters } from '@/src/api/ProductApi';
import Accordion from '@/src/components/accordion/Accordion';
import Paginator from '@/src/components/paginator/Paginator';
import CardProducts from '@/src/components/products/CardProducts';
import Spinner from '@/src/components/spinner/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>({
    pag: searchParams.get('pag') ? parseInt(searchParams.get('pag')!) : 1,
    name: searchParams.get('name') || '',
    departmentIds: searchParams.get('departmentIds')?.split(',') || [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    order: (searchParams.get('order') as 'maxPrice' | 'minPrice') || 'maxPrice',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
  });

  const handlePaginatino = (pag: number) => {
    setFilters({ ...filters, pag });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }, 100);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      name: searchParams.get('name') || '',
    }));

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }, 100);
  }, [searchParams, queryClient]);

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        <main className='container mx-auto grid grid-cols-4  lg:gap-4 lg:py-8 p-4 gap-y-4'>
          <aside className='col-span-4 lg:col-span-1'>
            <Accordion filters={filters} setFilters={setFilters} />
          </aside>
          <div className='col-span-4 lg:col-span-3 grid grid-cols-4 gap-4 h-fit'>
            {data?.data.map((product) => (
              <CardProducts
                className='col-span-2 lg:col-span-1'
                key={product.id}
                product={product}
              />
            ))}
            {!data.data.length && (
              <div className='col-span-4 flex justify-center items-center h-[300px]'>
                <p className='font-bold text-slate-500 text-lg'>
                  No hay resultados para tu busqueda
                </p>
              </div>
            )}
          </div>
          <div className='col-span-4 flex justify-center mt-4'>
            <Paginator
              count={data?.meta.totalPage || 1}
              onChange={handlePaginatino}
            />
          </div>
        </main>
      </>
    );
}
