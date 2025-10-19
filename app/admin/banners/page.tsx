'use client';
import { deleteBanner, getBanners } from '@/src/api/BannerApi';
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
import {
  EPositionBanner,
  IBanner,
  IBannerFilter,
  positionBanenrDictionary,
} from '@/src/types/banner';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'banners';

export default function BannerPage() {
  useBreadcrumb('Banners', 'Todos los Banners');
  const [filters, setFilters] = useState<IBannerFilter>({
    pag: 1,
    name: '',
    position: '',
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getBanners(filters),
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Banner eliminado correctamente');
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
      if (window.confirm('¿Estás seguro de eliminar este banner?')) {
        mutate(id);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2 flex-wrap'>
          <select
            onChange={handleChange}
            value={filters.position}
            name='position'
            className='bg-white rounded-md px-4'
          >
            <option value=''>Todos</option>
            <option value={EPositionBanner.HomePrincipal}>Principal</option>
            <option value={EPositionBanner.HomeSecondary}>Secundario</option>
            <option value={EPositionBanner.HomeTertiary}>Terciario</option>
            <option value={EPositionBanner.Filter}>Flitro</option>
            <option value={EPositionBanner.Product}>Productos</option>
            <option value={EPositionBanner.PopupOnce}>
              Emergente (Una vez)
            </option>
            <option value={EPositionBanner.AlwaysPopup}>
              Emergente (Siempre)
            </option>
          </select>
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
            href='banners/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Banner
          </Link>
        </div>
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className={tableHeadStyles}>Nombre</th>
              <th className={tableHeadStyles}>Imagen</th>
              <th className={tableHeadStyles}>Tipo</th>
              <th className={tableHeadStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((banner: IBanner) => (
              <tr key={banner.id}>
                <td className={tableBodyStyles}>{banner.name}</td>
                <td className={`${tableBodyStyles} flex justify-center`}>
                  <Image
                    src={`${apiUrl}/file/${banner.images}`}
                    alt={banner.description || 'description'}
                    width={250}
                    height={300}
                  />
                </td>
                <td className={`${tableBodyStyles} `}>
                  {positionBanenrDictionary[banner.position]}
                </td>
                <td className={`${tableBodyStyles} `}>
                  <div className='flex gap-4 justify-center'>
                    <Link href={`banners/${banner.id}`} className={editBtn}>
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
        <div className='flex justify-center mt-8'>
          <Pagination
            count={data.meta.totalPage}
            page={data.meta.actualPage}
            onChange={(_, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </>
    );
}
