'use client';

import { deletePost, getPost, getPosts, updatePost } from '@/src/api/PostApi';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import { TPost, TPostFilters } from '@/src/types/post';
import { GridColDef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'posts';

export default function PostPage() {
  useBreadcrumb('Publicaciones', 'Todos los posts');

  const [filters, setFilters] = useState<TPostFilters>({
    pag: 1,
    limit: 10,
    title: '',
    type: '',
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => getPosts(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Publicacion eliminada correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: TPost['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estas seguro de eliminar esta publicacion?')) {
        mutate(id);
      }
    }
  };

  const handleStatusChange = async (post: TPost, nextStatus: boolean) => {
    try {
      const fullPost = post.content ? post : await getPost(post.id);
      const response = await updatePost({
        id: post.id,
        data: {
          title: fullPost.title,
          slug: fullPost.slug,
          content: fullPost.content,
          excerpt: fullPost.excerpt || '',
          coverImage: fullPost.coverImage || '',
          type: fullPost.type,
          metaTitle: fullPost.metaTitle || '',
          metaDescription: fullPost.metaDescription || '',
          status: nextStatus,
          productIds:
            fullPost.type === 'recipe'
              ? fullPost.products?.map((item) => item.id) || []
              : [],
        },
      });

      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Estado actualizado');
      } else {
        toast.error('No se pudo actualizar el estado');
      }
    } catch (error) {
      toast.error('No se pudo actualizar el estado');
      console.error(error);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'Titulo',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'type',
        headerName: 'Tipo',
        flex: 1,
        minWidth: 140,
        renderCell: (params) => {
          const isRecipe = params.row.type === 'recipe';
          return (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                isRecipe
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-sky-100 text-sky-700'
              }`}
            >
              {isRecipe ? 'Receta' : 'Articulo'}
            </span>
          );
        },
      },
      {
        field: 'status',
        headerName: 'Estado',
        flex: 1,
        minWidth: 160,
        renderCell: (params) => (
          <label className='flex items-center gap-2 h-full'>
            <input
              type='checkbox'
              className='h-4 w-4 accent-[#1958ac]'
              checked={Boolean(params.row.status)}
              onChange={(event) =>
                handleStatusChange(
                  params.row.raw as TPost,
                  event.target.checked,
                )
              }
            />
            <span className='text-xs'>
              {params.row.status ? 'Publicado' : 'Borrador'}
            </span>
          </label>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Fecha de creacion',
        flex: 1,
        minWidth: 180,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        flex: 1,
        minWidth: 170,
        renderCell: (params) => (
          <div className='flex items-center h-full'>
            <Link
              href={`/admin/post/${params.row.id}`}
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
    ],
    [],
  );

  return (
    <section className='overflow-hidden'>
      <h4 className='font-bold '>Filtros</h4>
      <div className='mb-4 flex gap-2 flex-wrap items-end'>
        <div className='flex-1 flex gap-2'>
          <div>
            <label className='text-sm text-slate-600 block'>Tipo</label>
            <select
              value={filters.type || ''}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  type: event.target.value as TPost['type'] | '',
                  pag: 1,
                }))
              }
              className='px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            >
              <option value=''>Todos</option>
              <option value='article'>Articulo</option>
              <option value='recipe'>Receta</option>
            </select>
          </div>
        </div>
        <Link
          href='/admin/post/new'
          className='bg-accent-100 font-bold py-2 px-4 rounded-md'
        >
          Nueva Publicación
        </Link>
      </div>

      <TaskTable<TPostFilters>
        rows={
          data
            ? data.data.map((item) => ({
                id: item.id,
                title: item.title,
                type: item.type,
                status: item.status,
                createdAt: item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('es-VE')
                  : 'N/A',
                raw: item,
              }))
            : []
        }
        columns={columns}
        rowCount={data ? data.meta.total : 0}
        isLoading={isFetching || isLoading}
        page={data ? data.meta.actualPage - 1 : 0}
        pageSize={filters.limit || 10}
        onRowClick={() => {}}
        setFilters={setFilters}
        filters={filters}
        queryClientKey={queryKey}
      />
    </section>
  );
}
