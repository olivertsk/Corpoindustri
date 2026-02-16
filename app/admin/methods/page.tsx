'use client';
import {
  deleteMethod,
  getMethods,
  PaymentMethodQuery,
} from '@/src/api/MethodApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import {
  ETypePaymentMethods,
  methodEnumTranslation,
  PaymentMethod,
} from '@/src/types/method';
import { getGridSingleSelectOperators, GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'paymentMethods';

export default function PaymentMethods() {
  const typeOptions = Object.values(ETypePaymentMethods).map((type) => ({
    value: type,
    label: methodEnumTranslation[type],
  }));

  const allColumns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 150 },
    { field: 'status', headerName: 'Estatus', flex: 1, minWidth: 150 },
    {
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      minWidth: 150,
      type: 'singleSelect',
      valueOptions: typeOptions,
      filterOperators: getGridSingleSelectOperators(),
      renderCell: (params) => <span>{params.row.type}</span>,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      minWidth: 250,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className='flex items-center h-full justify-center'>
          <Link
            href={`methods/${params.row.id}`}
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
  useBreadcrumb('Métodos de Pago', 'Todos los Métodos de pago');
  const [filters, setFilters] = useState<PaymentMethodQuery>({
    pag: 1,
    name: '',
    limit: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getMethods(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteMethod,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Método de Pago eliminado correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: PaymentMethod['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
        mutate(id!);
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
            href='methods/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Método de Pago
          </Link>
        </div>
        <TaskTable<PaymentMethodQuery>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status ? 'Activo' : 'Inactivo',
            type: methodEnumTranslation[item.type],
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
