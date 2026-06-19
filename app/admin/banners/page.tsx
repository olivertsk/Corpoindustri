'use client';
import { deleteBanner, getBanners } from '@/src/api/BannerApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { apiUrl, deleteBtn, editBtn } from '@/src/lib/global';
import {
  EPositionBanner,
  IBanner,
  IBannerFilter,
  positionBanenrDictionary,
} from '@/src/types/banner';
import { getGridSingleSelectOperators, GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'banners';

export default function BannerPage() {
  const positionOptions = Object.values(EPositionBanner).map((pos) => ({
    value: pos,
    label: positionBanenrDictionary[pos],
  }));

  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'images',
      headerName: 'Imagen',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex justify-center w-full h-full'>
          <Image
            src={`${apiUrl}/file/${params.row.images}`}
            alt={params.row.description || 'description'}
            width={250}
            height={300}
            className='w-full h-full object-contain'
          />
        </div>
      ),
    },
    {
      field: 'position',
      headerName: 'Tipo',
      flex: 1,
      minWidth: 150,
      type: 'singleSelect',
      valueOptions: positionOptions,
      filterOperators: getGridSingleSelectOperators(),
      renderCell: (params) => (
        <span>
          {positionBanenrDictionary[params.row.position as EPositionBanner]}
        </span>
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
            href={`banners/${params.row.id}`}
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
  useBreadcrumb('Banners', 'Todos los Banners');
  const [filters, setFilters] = useState<IBannerFilter>({
    pag: 1,
    name: '',
    position: '',
    limit: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getBanners(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Banner eliminado correctamente');
      }
    },
  });

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
          <Link
            href='banners/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Banner
          </Link>
        </div>
        <TaskTable<IBannerFilter>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            images: item.images,
            position: item.position,
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
      </>
    );
}
