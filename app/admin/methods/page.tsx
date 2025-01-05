'use client';
import {
  deleteMethod,
  getMethods,
  PaymentMethodQuery,
} from '@/src/api/MethodApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn, tableBodyStyles } from '@/src/lib/global';
import {
  ETypePaymentMethods,
  methodEnumTranslation,
  PaymentMethod,
} from '@/src/types/method';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const thClass = 'text-center bg-primary py-2 text-white';

const queryKey = 'paymentMethods';

export default function PaymentMethods() {
  useBreadcrumb('Métodos de Pago', 'Todos los Métodos de pago');
  const [filters, setFilters] = useState<PaymentMethodQuery>({
    pag: 1,
    name: '',
    type: ETypePaymentMethods.All,
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getMethods(filters),
    refetchOnWindowFocus: false,
  });

  console.log('data :>> ', data);

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteMethod,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Método de Pago eliminado correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

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
        <div className='mb-4 flex gap-2'>
          <select
            onChange={handleChange}
            value={filters.type + ''}
            id=''
            name='type'
            className='bg-white rounded-md px-4'
          >
            <option value={ETypePaymentMethods.All}>Todos</option>
            <option value={ETypePaymentMethods.Bank}>Bancos</option>
            <option value={ETypePaymentMethods.Cash}>Efectivo</option>
            <option value={ETypePaymentMethods.Zelle}>Zelle</option>
            <option value={ETypePaymentMethods.PagoMovil}>Pago Móvil</option>
          </select>
          <input
            value={filters.name!}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Buscar Método de Pago'
            className='h-full py-2 rounded-md flex-1 px-4'
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold'
          >
            Filtrar
          </button>
          <Link
            href='methods/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Método de Pago
          </Link>
        </div>
        <table className='w-full rounded-md overflow-hidden bg-white'>
          <thead>
            <tr>
              <th className={thClass}>Nombre</th>
              <th className={thClass}>Estatus</th>
              <th className={thClass}>Tipo</th>
              <th className={thClass}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td className={tableBodyStyles}>{item.name}</td>
                <td className={tableBodyStyles}>
                  {item.status ? 'Activo' : 'Inactivo'}
                </td>
                <td className={tableBodyStyles}>
                  {methodEnumTranslation[item.type]}
                </td>
                <td className={tableBodyStyles}>
                  <Link href={`methods/${item.id}`} className={editBtn}>
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteBtn(item.id)}
                    className={deleteBtn}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-8'>
          <Pagination
            count={data.meta.totalPage}
            page={data.meta.actualPage}
            onChange={(ev, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </section>
    );
}
