import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import TaskTable from '../../../TaskTable';
import Spinner from '../../../spinner/Spinner';
import {
  containerStyles,
  deleteBtn,
  editBtn,
  primaryBtn,
} from '@/src/lib/global';
import { deleteRol, getAllRolsForTable } from '@/src/api/RolApi';
import Link from 'next/link';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

const columnStyles =
  'bg-secondary-200 text-white [&_svg]:text-white [&_div]:font-bold';

const queryKey = 'rols';

export default function RolsPage() {
  useBreadcrumb('Roles', 'Todos los roles');
  const [filters, setFilters] = useState({ pag: 1, limit: 10 });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => getAllRolsForTable(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Eliminado exitosamente');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const manageDeleteItem = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
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
      field: 'permissions',
      headerName: 'Permisos',
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
            href={`/admin/users/rols/edit/${params.row.id}`}
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
  ];

  if (isLoading) return <Spinner />;

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <div className='mb-4 flex gap-2'>
          <div className='flex-1'></div>
          <Link href={'/admin/users/rols/new'} className={`${primaryBtn}`}>
            Nuevo Rol
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
