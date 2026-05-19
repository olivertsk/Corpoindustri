'use client';

import {
  deleteProduct,
  getProducts,
  ProductFilters,
} from '@/src/api/ProductApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import { Product } from '@/src/types/product';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import { getGridBooleanOperators, GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'products';

export default function ProductsPage() {
  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    { field: 'code', headerName: 'Código', flex: 1, minWidth: 150 },
    { field: 'price', headerName: 'Precio', flex: 1, minWidth: 150 },
    {
      field: 'promotionalPrice',
      headerName: 'P. Promocional',
      flex: 1,
      minWidth: 150,
    },
    { field: 'stock', headerName: 'Stock', flex: 1, minWidth: 150 },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 150,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot',
      ),
    },
    { field: 'department', headerName: 'Departamento', flex: 1, minWidth: 150 },
    { field: 'category', headerName: 'Categoria', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`products/${params.row.id}`}
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
  useBreadcrumb('Productos', 'Todos los productos');
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    pag: 1,
    limit: 50,
  });

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Producto eliminado correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: Product['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar este Producto?')) {
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
            href='products/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Producto
          </Link>
        </div>
        <TaskTable<ProductFilters>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            code: item.code,
            price: normalizeAmounts(item.price),
            promotionalPrice: item.promotionalPrice
              ? normalizeAmounts(item.promotionalPrice || 0)
              : 'N/A',
            stock: item.stock,
            status: item.status ? 'Activo' : 'Inactivo',
            department: item.department?.name || 'N/A',
            category: item.category?.name || 'N/A',
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
