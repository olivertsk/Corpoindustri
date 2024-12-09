'use client';
import { deleteDepartment, getDepartments } from '@/src/api/DepartmentsApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn, tableBodyStyles } from '@/src/lib/global';
import { Department, DepartmentFilters } from '@/src/types/department';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const thClass = 'text-center bg-primary py-2 text-white';

export default function DepartmentPage() {
  useBreadcrumb('Departamentos', 'Todos los departamentos');
  const [filters, setFilters] = useState<DepartmentFilters>({
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
    queryKey: ['departments'],
    queryFn: () => getDepartments(filters),
    refetchOnWindowFocus: false,
  });

  console.log('data :>> ', data);

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['departments'] });
        toast.success('Departamento eliminado correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    });
  };

  const handleDeleteBtn = (id: Department['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
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
            placeholder='Buscar Departamentos'
            className='h-full py-2 rounded-md flex-1 px-4'
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold'
          >
            Filtrar
          </button>
          <Link
            href='departments/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Departamento
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
                <td className={tableBodyStyles}>{department.name}</td>
                <td className={tableBodyStyles}>
                  {department.status ? 'Activo' : 'Inactivo'}
                </td>
                <td className={tableBodyStyles}>
                  {department.isSalient ? 'Si' : 'No'}
                </td>
                <td className={tableBodyStyles}>
                  <Link
                    href={`departments/${department.id}`}
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
