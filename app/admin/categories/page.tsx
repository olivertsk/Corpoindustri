'use client';
import { deleteCategory, getCategories } from '@/src/api/CategoriesApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const thClass = 'text-center bg-primary py-2 text-white';
const queryKey = 'categories';

export default function CategoriesPage() {
  useBreadcrumb('Categorias', 'Todos las categorias');
  const [filters, setFilters] = useState<ICategoryFilter>({
    pag: 1,
    name: '',
    isSalient: '',
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getCategories(filters, true),
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Categoria eliminada correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const handleDeleteBtn = (id: ICategory['id']) => {
    // if (window.confirm('¿Estás seguro de eliminar esta categoria?')) {
      mutate(id);
    // }
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
            value={filters.isSalient + ''}
            id=''
            name='isSalient'
            className='bg-white rounded-md px-4'
          >
            <option value=''>Todos</option>
            <option value='true'>Destacada</option>
            <option value='false'>No Destacada</option>
          </select>
          <input
            value={filters.name!}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Buscar Categorias'
            className='h-full py-2 rounded-md flex-1 px-4'
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold'
          >
            Filtrar
          </button>
          <Link
            href='categories/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nueva Categoria
          </Link>
        </div>
        <table className='w-full rounded-md overflow-hidden bg-white'>
          <thead>
            <tr>
              <th className={thClass}>Nombre</th>
              <th className={thClass}>Estatus</th>
              <th className={thClass}>Destacada</th>
              <th className={thClass}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((department) => (
              <tr key={department.id}>
                <td className='text-center border-b-[1px] py-3'>
                  {department.name}
                </td>
                <td className='text-center border-b-[1px] py-3'>
                  {department.status ? 'Activo' : 'Inactivo'}
                </td>
                <td className='text-center border-b-[1px] py-3'>
                  {department.isSalient ? 'Si' : 'No'}
                </td>
                <td className='text-center border-b-[1px] py-3'>
                  <Link
                    href={`categories/${department.id}`}
                    className='bg-accent-100 px-4 py-1 rounded-md'
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteBtn(department.id)}
                    className='border border-red-600 text-red-600 px-4 py-1 rounded-md ml-2'
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
