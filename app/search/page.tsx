'use client';

import { getProducts, ProductFilters } from '@/src/api/ProductApi';
import Accordion from '@/src/components/accordion/Accordion';
import Paginator from '@/src/components/paginator/Paginator';
import CardProducts from '@/src/components/products/CardProducts';
import Spinner from '@/src/components/spinner/Spinner';
import { useMultiCoinStore } from '@/src/store/multicoinStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

function Main() {
  const searchParams = useSearchParams();
  const selectedCoin = useMultiCoinStore((state) => state.selectedCoin);
  const setArrayFilter = useCallback(
    (name: string) =>
      searchParams
        .get(name)
        ?.split(',')
        ?.filter((item) => item) || [],
    [searchParams]
  );

  const [filters, setFilters] = useState<ProductFilters>({
    pag: searchParams.get('pag') ? parseInt(searchParams.get('pag')!) : 1,
    name: searchParams.get('name') || '',
    departmentIds: setArrayFilter('departmentIds'),
    categoriesIds: setArrayFilter('categoriesIds'),
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    order: (searchParams.get('order') as 'maxPrice' | 'minPrice') || 'maxPrice',
    isClient: true,
    typePrice: selectedCoin.value === 'BS' ? 'priceBs' : 'price',
  });

  const { data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
  });

  const handlePagination = (pag: number) => {
    window.scrollTo(0, 0);
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
      departmentIds: setArrayFilter('departmentIds'),
      categoriesIds: setArrayFilter('categoriesIds'),
      pag: searchParams.get('pag') ? +searchParams.get('pag')! : 1,
      typePrice: selectedCoin.value === 'BS' ? 'priceBs' : 'price',
    }));

    console.log('selectedCoin', selectedCoin);

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }, 500);
  }, [searchParams, selectedCoin, queryClient, setArrayFilter]);

  const navigate = useRouter();
  const applyFilters = () => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        params.append(key, value.toString());
      } else {
        if (key === 'pag') {
          params.append(key, '1');
        } else if (key === 'name') {
          params.append(key, '');
        } else {
          params.append(key, value + '');
        }
      }
    }
    navigate.replace(`/search?${params.toString()}`);
  };

  return (
    <>
      <main
        className={`container mx-auto grid grid-cols-4 lg:gap-4 lg:py-8 p-4 gap-y-4  `}
      >
        <aside className='col-span-4 lg:col-span-1'>
          {filters.name && (
            <div className='flex items-center mb-4 gap-2'>
              <p className='text-lg text-slate-500 '>
                Resultados para:{' '}
                <span className='font-bold'>{filters.name}</span>
              </p>
              <button
                className='border-2 border-red-600 rounded-sm'
                onClick={applyFilters}
              >
                <XMarkIcon className='w-4 text-red-600' />
              </button>
            </div>
          )}
          <Accordion filters={filters} setFilters={setFilters} />
        </aside>
        {isFetching && (
          <div className='col-span-4 lg:col-span-3 h-[300px] flex justify-center items-center'>
            <Spinner />
          </div>
        )}
        {data && !isFetching && (
          <>
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
          </>
        )}
        <div className='col-span-4 flex justify-center mt-4'>
          <Paginator
            count={data?.meta.totalPage || 1}
            onChange={handlePagination}
          />
        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
}
