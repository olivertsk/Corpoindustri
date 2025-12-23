'use client';

import { getRols } from '@/src/api/RolApi';
import { changeRol, getUsers, IUserFilter } from '@/src/api/UserApi';
import UserDetail from '@/src/components/admin/users/UserDetail';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { apiUrl, editBtn, inputStlyes } from '@/src/lib/global';
import { findCity, findState } from '@/src/lib/location-ve';
import { rolDictionary } from '@/src/types/rol';
import { User } from '@/src/types/user';
import { getUserGender } from '@/src/utils/userGenderType';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'users';

export default function UsersPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <UsersPageContent />
    </Suspense>
  );
}

function UsersPageContent() {
  const allColumns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          {params.row.avatar ? (
            <Image
              width={80}
              height={80}
              src={`${apiUrl}/file/${params.row.avatar}`}
              alt={params.row.name}
              className='w-[40px] h-[40px] object-cover rounded-full'
            />
          ) : (
            <div>
              <UserCircleIcon className='w-8' />
            </div>
          )}
        </div>
      ),
    },
    { flex: 1, minWidth: 100, field: 'name', headerName: 'Nombre' },
    { flex: 1, minWidth: 100, field: 'email', headerName: 'Email' },
    { flex: 1, minWidth: 100, field: 'phoneNumber', headerName: 'Teléfono' },
    { flex: 1, minWidth: 100, field: 'dni', headerName: 'C.I' },
    { flex: 1, minWidth: 100, field: 'gender', headerName: 'Genero' },
    { flex: 1, minWidth: 100, field: 'state', headerName: 'Estado' },
    { flex: 1, minWidth: 100, field: 'city', headerName: 'Ciudad' },
    { flex: 1, minWidth: 100, field: 'zone', headerName: 'Zona' },
    {
      flex: 1,
      minWidth: 100,
      field: 'rol',
      headerName: 'Rol',
      renderCell: (params) => (
        <select
          defaultValue={params.row.rol?.id}
          name='rol'
          onChange={(ev) => handleRolChange(ev, params.row.id)}
          className={`${inputStlyes}`}
        >
          {rolsData?.data.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rolDictionary[rol.name as keyof typeof rolDictionary]}
            </option>
          ))}
        </select>
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
            href={`?id=${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Ver Historial
          </Link>
        </div>
      ),
    },
  ];
  useBreadcrumb('Usuarios', 'Todos los usuarios');
  const [filters, setFilters] = useState<IUserFilter>({
    name: '',
    pag: 1,
    email: '',
    role: '',
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getUsers(filters),
    refetchOnWindowFocus: false,
  });
  const { data: rolsData } = useQuery({
    queryKey: ['rols'],
    queryFn: () => getRols(),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: changeRol,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('Rol actualizado correctamente');
      }
    },
  });
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    setUserId(id);
  }, [searchParams]);

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

  const queryClient = useQueryClient();

  if (isLoading) {
    return <Spinner />;
  }

  if (data && rolsData)
    return (
      <section className='overflow-hidden'>
        <TaskTable<IUserFilter>
          rows={data.data.map((item) => ({
            id: item.id,
            avatar: item.avatar,
            name: item.name,
            email: item.email,
            phoneNumber: item.phoneNumber || 'N/A',
            dni: (item.dniType || '') + (item.dni || 'N/A'),
            gender: getUserGender(item.gender),
            state: findState(item.state),
            city: findCity(item.state, item.city),
            zone: item.zone || 'N/A',
            rol: item.rol,
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
        <UserDetail userId={userId} setUserId={setUserId} />
      </section>
    );
}
