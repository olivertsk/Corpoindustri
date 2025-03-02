'use client';

import {
  deleteProduct,
  getProducts,
  ProductFilters,
} from '@/src/api/ProductApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn, tableBodyStyles, thClass } from '@/src/lib/global';
import { Product } from '@/src/types/product';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function ProductsPage() {
  useBreadcrumb('Productos', 'Todos los productos');
  const [filters, setFilters] = useState<ProductFilters>({
    name: '',
    pag: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    });
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    });
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
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
          <input
            value={filters.name!}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Buscar Productos'
            className='h-full py-2 rounded-md flex-1 px-4'
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold'
          >
            Filtrar
          </button>
          <Link
            href='products/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Producto
          </Link>
        </div>
        <div className='overflow-auto'>
          <table className='w-full rounded-md overflow-auto bg-white'>
            <thead>
              <tr>
                <th className={thClass}>Nombre</th>
                <th className={thClass}>Código</th>
                <th className={thClass}>Precio</th>
                <th className={thClass}>Precio Promocional</th>
                <th className={thClass}>Inventario</th>
                <th className={thClass}>Departamento</th>
                <th className={thClass}>Categoría</th>
                <th className={thClass}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item) => (
                <tr key={item.id}>
                  <td className={tableBodyStyles}>{item.name}</td>
                  <td className={tableBodyStyles}>{item.code}</td>
                  <td className={tableBodyStyles}>{item.price}</td>
                  <td className={tableBodyStyles}>{item.promotionalPrice}</td>
                  <td className={tableBodyStyles}>{item.stock}</td>
                  <td className={tableBodyStyles}>{item.department?.name}</td>
                  <td className={tableBodyStyles}>{item.category?.name}</td>
                  <td
                    className={`${tableBodyStyles} flex justify-center items-center flex-wrap gap-4`}
                  >
                    <Link href={`products/${item.id}`} className={editBtn}>
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
        </div>
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
