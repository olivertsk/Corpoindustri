'use client';

import {
  approveProductReview,
  getProductReviews,
  ProductReviewFilters,
} from '@/src/api/ProductApi';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { editBtn } from '@/src/lib/global';
import { IProductReviewAttributes } from '@/src/types/product';
import { GridColDef } from '@mui/x-data-grid';
import { Rating } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'product-reviews-admin';

export default function ReviewPage() {
  useBreadcrumb('Reseñas', 'Todas las reseñas');

  const [filters, setFilters] = useState<ProductReviewFilters>({
    pag: 1,
    limit: 10,
    sort: 'createdAt:desc',
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => getProductReviews(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate: approveReview, isPending: isApproving } = useMutation({
    mutationFn: approveProductReview,
    onSuccess: (response) => {
      if (response?.success) {
        toast.success('Reseña aprobada correctamente');
      } else {
        toast.success('Solicitud de aprobación enviada');
      }
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: () => {
      toast.error('No se pudo aprobar la reseña');
    },
  });

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'productId',
        headerName: 'Producto ID',
        minWidth: 170,
        flex: 1,
      },
      {
        field: 'userId',
        headerName: 'Usuario ID',
        minWidth: 170,
        flex: 1,
      },
      {
        field: 'rating',
        headerName: 'Calificación',
        minWidth: 170,
        flex: 1,
        renderCell: (params) => (
          <div className='h-full flex items-center'>
            <Rating
              value={Number(params.row.rating || 0)}
              readOnly
              size='small'
            />
          </div>
        ),
      },
      {
        field: 'comment',
        headerName: 'Comentario',
        minWidth: 260,
        flex: 1.2,
        renderCell: (params) => (
          <div className='whitespace-pre-wrap break-words line-clamp-2'>
            {params.row.comment || 'Sin comentario'}
          </div>
        ),
      },
      {
        field: 'isApproved',
        headerName: 'Estado',
        minWidth: 140,
        flex: 1,
        renderCell: (params) => (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              params.row.isApproved
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {params.row.isApproved ? 'Aprobada' : 'Pendiente'}
          </span>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Fecha',
        minWidth: 150,
        flex: 1,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        minWidth: 420,
        flex: 1.6,
        renderCell: (params) => {
          const review = params.row.raw as IProductReviewAttributes;
          const isAlreadyApproved = Boolean(review.isApproved);
          const hasUser = Boolean(review.userId);
          const hasProduct = Boolean(review.productId);

          return (
            <div className='h-full flex items-center gap-2'>
              {hasUser ? (
                <Link
                  href={`/admin/users?id=${review.userId}`}
                  className={`${editBtn} h-[32px] flex items-center justify-center`}
                >
                  Ver usuario
                </Link>
              ) : (
                <button
                  type='button'
                  disabled
                  className={`${editBtn} h-[32px] flex items-center justify-center opacity-50 cursor-not-allowed`}
                >
                  Sin usuario
                </button>
              )}

              {hasProduct ? (
                <Link
                  href={`/admin/products/${review.productId}`}
                  className={`${editBtn} h-[32px] flex items-center justify-center`}
                >
                  Ver producto
                </Link>
              ) : (
                <button
                  type='button'
                  disabled
                  className={`${editBtn} h-[32px] flex items-center justify-center opacity-50 cursor-not-allowed`}
                >
                  Sin producto
                </button>
              )}

              <button
                type='button'
                disabled={isAlreadyApproved || isApproving || !review.id}
                onClick={() => review.id && approveReview(review.id)}
                className={`${editBtn} h-[32px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isAlreadyApproved ? 'Aprobada' : 'Aprobar'}
              </button>
            </div>
          );
        },
      },
    ],
    [approveReview, isApproving],
  );

  return (
    <section className='overflow-hidden'>
      <h4 className='font-bold'>Filtros</h4>
      <div className='mb-4 flex gap-2 flex-wrap items-end'>
        <div>
          <label className='text-sm text-slate-600 block'>Orden</label>
          <select
            value={filters.sort || 'createdAt:desc'}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                sort: event.target.value,
                pag: 1,
              }))
            }
            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm'
          >
            <option value='createdAt:desc'>Más recientes</option>
            <option value='createdAt:asc'>Más antiguas</option>
          </select>
        </div>
      </div>

      <TaskTable<ProductReviewFilters>
        rows={
          data
            ? data.data.map((item) => ({
                id: item.id,
                productId: item.productId || 'N/A',
                userId: item.userId || 'N/A',
                rating: item.rating,
                comment: item.comment || '',
                isApproved: Boolean(item.isApproved),
                createdAt: item.createdAt
                  ? new Date(
                      item.createdAt as unknown as string,
                    ).toLocaleDateString('es-VE')
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
