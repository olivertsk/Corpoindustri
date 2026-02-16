'use client';
import { deleteMap, getMaps } from '@/src/api/MapApi ';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { apiUrl, deleteBtn, editBtn } from '@/src/lib/global';
import { IBanner } from '@/src/types/banner';
import { TMapFilter } from '@/src/types/map';
import { GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'maps';

export default function LocationPage() {
  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'image',
      headerName: 'Imagen',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex justify-center w-full h-full'>
          <Image
            src={`${apiUrl}/file/${params.row.image}`}
            alt={params.row.description || params.row.name}
            width={250}
            height={300}
            className='w-full h-full object-contain'
          />
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
    {
      field: 'phoneNumber',
      headerName: 'Numero de Telefono',
      flex: 1,
      minWidth: 150,
    },
    { field: 'description', headerName: 'Descripción', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`departments/${params.row.id}`}
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
  useBreadcrumb('Ubicaciones', 'Todos las Ubicaciones');
  const [filters, setFilters] = useState<TMapFilter>({
    pag: 1,
    name: '',
    limit: 10,
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getMaps(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteMap,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Ubicación eliminado correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const handleDeleteBtn = (id: IBanner['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar esta ubicación?')) {
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
            placeholder='Buscar Banner'
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
            href='maps/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nueva Ubicación
          </Link>
        </div>
        <TaskTable<TMapFilter>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            email: item.email,
            phoneNumber: item.phoneNumber,
            description: item.description || item.name,
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
