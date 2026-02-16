import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  containerStyles,
  deleteBtn,
  editBtn,
  primaryBtn,
} from '@/src/lib/global';
import Link from 'next/link';
import Spinner from '../../../spinner/Spinner';
import TaskTable from '../../../TaskTable';
import { deleteView, getAllViewsForTable } from '@/src/api/ViewApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { IView } from '@/src/types/permissionsTypes';

const columnStyles =
  'bg-secondary-200 text-white [&_svg]:text-white [&_div]:font-bold';

const queryKey = 'views';

export default function ViewsPage() {
  useBreadcrumb('Vistas', 'Todas las vistas');
  const [filters, setFilters] = useState({ pag: 1, limit: 10 });
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

  const manageDeleteItem = (id: IView['id']) => {
    if (window.confirm('¿Estás seguro de eliminar esta vista?')) {
      deleteMutate(id);
    }
  };

  const columns: GridColDef[] = [
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
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      headerClassName: columnStyles,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`/admin/users/views/edit/${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Editar
          </Link>
          <button
            type='button'
            onClick={() => manageDeleteItem(params.row.id)}
            className={`${deleteBtn} h-[32px] flex items-center justify-center`}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <div className='mb-4 flex gap-2'>
          <div className='flex-1'></div>
          <Link href='/admin/users/views/new' className={`${primaryBtn}`}>
            Nueva Vista
          </Link>
        </div>

        {data && (
          <TaskTable
            pageSize={filters?.limit || 10}
            rowCount={data.meta?.total || 0}
            isLoading={isLoading}
            onRowClick={() => {}}
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
