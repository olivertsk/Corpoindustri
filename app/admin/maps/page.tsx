'use client';
import { deleteMap, getMaps } from '@/src/api/MapApi ';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import {
  apiUrl,
  deleteBtn,
  editBtn,
  tableBodyStyles,
  tableHeadStyles,
  tableStyles,
} from '@/src/lib/global';
import { IBanner } from '@/src/types/banner';
import { TMap, TMapFilter } from '@/src/types/map';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'maps';

export default function LocationPage() {
  useBreadcrumb('Ubicaciones', 'Todos las Ubicaciones');
  const [filters, setFilters] = useState<TMapFilter>({
    pag: 1,
    name: '',
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

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

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
        <div className='overflow-auto'>
          <table className={tableStyles}>
            <thead>
              <tr>
                <th className={tableHeadStyles}>Nombre</th>
                <th className={tableHeadStyles}>Imagen</th>
                <th className={tableHeadStyles}>Email</th>
                <th className={tableHeadStyles}>Numero de Telefono</th>
                <th className={tableHeadStyles}>Descripción</th>
                <th className={tableHeadStyles}>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((banner: TMap) => (
                <tr key={banner.id}>
                  <td className={tableBodyStyles}>{banner.name}</td>
                  <td className={`${tableBodyStyles} flex justify-center`}>
                    <Image
                      src={`${apiUrl}/file/${banner.image}`}
                      alt={banner.description || 'description'}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className={`${tableBodyStyles} `}>{banner.email}</td>
                  <td className={`${tableBodyStyles} `}>
                    {banner.phoneNumber}
                  </td>
                  <td className={`${tableBodyStyles} `}>
                    {banner.description}
                  </td>
                  <td className={`${tableBodyStyles} `}>
                    <div className='flex gap-4 justify-center'>
                      <Link href={`maps/${banner.id}`} className={editBtn}>
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteBtn(banner.id)}
                        className={deleteBtn}
                      >
                        Eliminar
                      </button>
                    </div>
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
            onChange={(_, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </section>
    );
}
