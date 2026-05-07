'use client';
import { getSuggestions, SuggestionParams } from '@/src/api/SuggestionApi';
import Spinner from '@/src/components/spinner/Spinner';
import SuggestionDetail from '@/src/components/suggestions/SuggestionDetail';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { editBtn } from '@/src/lib/global';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

const queryKey = 'suggestions';

export default function SuggestionPage() {
  useBreadcrumb('Sugerencias', 'Todas las sugerencias');

  const allColumns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Fecha', minWidth: 150, flex: 1 },
    { field: 'title', headerName: 'Razón', minWidth: 150, flex: 1 },
    {
      field: 'description',
      headerName: 'Descripción',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <div
          className='whitespace-pre-line break-words'
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`/admin/suggestions?id=${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Ver
          </Link>
        </div>
      ),
    },
  ];
  const [filters, setFilters] = useState<SuggestionParams>({
    pag: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryFn: () => getSuggestions(filters),
    queryKey: [queryKey],
    refetchOnWindowFocus: false,
  });

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
            <TaskTable<SuggestionParams>
              rows={data.data.map((item) => ({
                id: item.id,
                createdAt: normalizeDate(item.createdAt),
                title: item.title,
                description: item.description,
              }))}
              columns={allColumns}
              rowCount={data.meta.total}
              isLoading={isLoading}
              page={data.meta.actualPage - 1}
              pageSize={filters.limit!}
              onRowClick={() => {}}
              setFilters={setFilters}
              filters={filters}
              queryClientKey={queryKey}
            />

            <SuggestionDetail />
          </>
        )}
      </>
    );
}
