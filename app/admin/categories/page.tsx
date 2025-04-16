'use client';
import { deleteCategory, getCategories } from '@/src/api/CategoriesApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import {
  deleteBtn,
  editBtn,
  tableBodyStyles,
  tableHeadStyles,
  tableStyles,
} from '@/src/lib/global';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

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
    queryFn: () => getCategories(filters),
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
            onKeyUp={(ev) => ev.key === 'Enter' && handleFilterBtn()}
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
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className={tableHeadStyles}>Nombre</th>
              <th className={tableHeadStyles}>Estatus</th>
              <th className={tableHeadStyles}>Destacada</th>
              <th className={tableHeadStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((department) => (
              <tr key={department.id}>
                <td className={tableBodyStyles}>{department.name}</td>
                <td className={tableBodyStyles}>
                  {department.status ? 'Activo' : 'Inactivo'}
                </td>
                <td className={tableBodyStyles}>
                  {department.isSalient ? 'Si' : 'No'}
                </td>
                <td className={tableBodyStyles}>
                  <Link
                    href={`categories/${department.id}`}
                    className={editBtn}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteBtn(department.id)}
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
