import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  containerStyles,
  deleteBtn,
  editBtn,
  primaryBtn,
} from '@/src/lib/global';
import Link from 'next/link';
import Spinner from '../../spinner/Spinner';
import TaskTable from '../../TaskTable';
import { deleteView, getAllViewsForTable } from '@/src/api/ViewApi';

const columnStyles =
  'bg-secondary-200 text-white [&_svg]:text-white [&_div]:font-bold';

const queryKey = 'views';

export default function ViewsPage() {
  const [filters, setFilters] = useState({ pag: 1, limit: 10 });
  const navigate = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => getAllViewsForTable(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteView,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Vista eliminada exitosamente');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const manageDeleteItem = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta vista?')) {
      deleteMutate(id);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      headerClassName: columnStyles,
      maxWidth: 40,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`categories/${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Editar
          </Link>
          <button
            onClick={() => manageDeleteItem(params.row.id)}
            className={`${deleteBtn} h-[32px] flex items-center justify-center`}
          >
            Eliminar
          </button>
        </div>
      ),
    },
    {
      field: 'icon',
      headerName: 'Icono',
      flex: 1,
      headerClassName: columnStyles,
      renderCell: (params) => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d={params.value}
          />
        </svg>
      ),
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      headerClassName: columnStyles,
    },
    {
      field: 'route',
      headerName: 'Ruta',
      flex: 1,
      headerClassName: columnStyles,
    },
    {
      field: 'url',
      headerName: 'URL API',
      flex: 1,
      headerClassName: columnStyles,
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <div className='mb-4 flex gap-2'>
          <div className='flex-1'></div>
          <button
            onClick={() => navigate.push('/views/new')}
            className={`${primaryBtn}`}
          >
            Nueva Vista
          </button>
        </div>

        {data && (
          <TaskTable
            pageSize={filters?.limit || 10}
            rowCount={data.meta?.total || 0}
            isLoading={isLoading}
            onRowClick={(params) => navigate.push(`/views/edit/${params.id}`)}
            page={filters.pag ? filters.pag - 1 : 0}
            rows={data.items}
            columns={columns}
            setFilters={setFilters}
            filters={filters}
            queryClientKey={queryKey}
          />
        )}
      </div>
    </div>
  );
}
