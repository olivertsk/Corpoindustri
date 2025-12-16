'use client';
import { deleteCategory, getCategories } from '@/src/api/CategoriesApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { getGridBooleanOperators, GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'categories';

export default function CategoriesPage() {
  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 150,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot'
      ),
    },
    {
      field: 'isSalient',
      headerName: 'Destacada',
      flex: 1,
      minWidth: 150,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot'
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`categories/${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Editar
          </Link>
          <button
            onClick={() => handleDeleteBtn(params.row.id)}
            className={`${deleteBtn} h-[32px] flex items-center justify-center`}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];
  useBreadcrumb('Categorias', 'Todos las categorias');
  const [filters, setFilters] = useState<ICategoryFilter>({
    pag: 1,
    name: '',
    isSalient: '',
    limit: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getCategories(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Categoria eliminada correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: ICategory['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar esta categoria?')) {
        mutate(id);
      }
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  if (data)
    return (
      <section>
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2 flex-wrap'>
          <Link
            href='categories/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nueva Categoria
          </Link>
        </div>
        <TaskTable<ICategoryFilter>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status ? 'Activo' : 'Inactivo',
            isSalient: item.isSalient ? 'Si' : 'No',
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
      </section>
    );
}
