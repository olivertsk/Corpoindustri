'use client';
import { getSuggestions, SuggestionParams } from '@/src/api/SuggestionApi';
import Spinner from '@/src/components/spinner/Spinner';
import SuggestionDetail from '@/src/components/suggestions/SuggestionDetail';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { primaryBtn, tableBodyStyles, thClass } from '@/src/lib/global';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { Pagination } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

export default function SuggestionPage() {
  useBreadcrumb('Sugerencias', 'Todas las sugerencias');

  const [filters, setFilters] = useState<SuggestionParams>({
    pag: 1,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => getSuggestions(filters),
    queryKey: ['suggestions'],
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        {data.data.length === 0 ? (
          <div className='flex justify-center my-8'>
            <p className='text-2xl text-slate-400'>No hay ordenes...</p>
          </div>
        ) : (
          <>
            <section className='overflow-hidden'>
              <div className='overflow-auto'>
                <table className='w-full rounded-md overflow-hidden bg-white'>
                  <thead>
                    <tr>
                      <th className={thClass}>Fecha</th>
                      <th className={thClass}>Razon</th>
                      <th className={thClass}>Descripción</th>
                      <th className={thClass}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((item) => (
                      <tr key={item.id}>
                        <td className={tableBodyStyles}>
                          {normalizeDate(item.createdAt)}
                        </td>
                        <td className={tableBodyStyles}>{item.title}</td>
                        <td className={tableBodyStyles}>{item.description}</td>
                        <td className={tableBodyStyles}>
                          <Link
                            href={`/admin/suggestions?id=${item.id}`}
                            className={primaryBtn}
                          >
                            Ver
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-center mt-8'>
                <Pagination
                  count={data.meta.totalPage}
                  page={data.meta.actualPage}
                  onChange={(_, page) => changePage(page)}
                  showFirstButton
                  showLastButton
                />
              </div>
            </section>
            <SuggestionDetail />
          </>
        )}
      </>
    );
}
