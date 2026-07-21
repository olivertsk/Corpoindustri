'use client';

import { deleteCombo, getCombos, ComboFilters } from '@/src/api/ComboApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import { Combo } from '@/src/types/combo';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import { getGridBooleanOperators, GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'combos';

export default function CombosPage() {
  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 150 },
    { field: 'price', headerName: 'Precio', flex: 1, minWidth: 120 },
    { field: 'priceBs', headerName: 'Precio Bs', flex: 1, minWidth: 120 },
    {
      field: 'productsCount',
      headerName: 'Productos',
      flex: 1,
      minWidth: 110,
    },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 120,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot',
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`combos/${params.row.id}`}
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
  useBreadcrumb('Combos', 'Todos los combos');
  const [filters, setFilters] = useState<ComboFilters>({
    search: '',
    pag: 1,
    limit: 50,
  });

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getCombos(filters),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCombo,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Combo eliminado correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: Combo['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar este Combo?')) {
        mutate(id);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <section className='overflow-hidden'>
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2 flex-wrap'>
          <Link
            href='combos/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Combo
          </Link>
        </div>
        <TaskTable<ComboFilters>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            price: normalizeAmounts(item.price),
            priceBs: normalizeAmounts(item.priceBs || 0),
            productsCount: item.products?.length || 0,
            status: item.status ? 'Activo' : 'Inactivo',
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
