'use client';

import { getRols } from '@/src/api/RolApi';
import { changeRol, getUsers, IUserFilter } from '@/src/api/UserApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import {
  apiUrl,
  inputStlyes,
  tableBodyStyles,
  thClass,
} from '@/src/lib/global';
import { rolDictionary } from '@/src/types/rol';
import { User } from '@/src/types/user';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function UsersPage() {
  useBreadcrumb('Usuarios', 'Todos los usuarios');
  const [filters, setFilters] = useState<IUserFilter>({
    name: '',
    pag: 1,
    email: '',
    role: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(filters),
    refetchOnWindowFocus: false,
  });
  const { data: rolsData } = useQuery({
    queryKey: ['rols'],
    queryFn: () => getRols(),
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    });
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: changeRol,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('Rol actualizado correctamente');
      }
    },
  });

  const handleRolChange = (
    ev: ChangeEvent<HTMLSelectElement>,
    userId: User['id']
  ) => {
    const newRolId = ev.target.value;
    mutate({
      id: userId,
      rol: newRolId,
    });
  };

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    });
  };

  const queryClient = useQueryClient();

  if (isLoading) {
    return <Spinner />;
  }

  if (data && rolsData)
    return (
      <section>
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2'>
          <input
            value={filters.name!}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Buscar Usuarios: nombre, email, c.i'
            className='h-full py-2 rounded-md flex-1 px-4'
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold'
          >
            Filtrar
          </button>
        </div>
        <table className='w-full rounded-md overflow-hidden bg-white'>
          <thead>
            <tr>
              <th className={thClass}>Avatar</th>
              <th className={thClass}>Nombre</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Teléfono</th>
              <th className={thClass}>C.I</th>
              <th className={thClass}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                <td className={`${tableBodyStyles} text-center`}>
                  <Image
                    width={80}
                    height={80}
                    src={`${apiUrl}/file/${item.avatar}`}
                    alt={item.name}
                    className='m-auto'
                  />
                </td>
                <td className={tableBodyStyles}>{item.name}</td>
                <td className={tableBodyStyles}>{item.email}</td>
                <td className={tableBodyStyles}>{item.phoneNumber}</td>
                <td className={tableBodyStyles}>
                  {item.dniType}
                  {item.dni}
                </td>
                <td className={tableBodyStyles}>
                  <select
                    defaultValue={item.rol?.id}
                    name='rol'
                    onChange={(ev) => handleRolChange(ev, item.id)}
                    className={`${inputStlyes} max-w-40`}
                  >
                    {rolsData?.data.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rolDictionary[rol.name as keyof typeof rolDictionary]}
                      </option>
                    ))}
                  </select>
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
