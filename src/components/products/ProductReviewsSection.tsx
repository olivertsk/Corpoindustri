'use client';

import { createProductReview, getProductReviews } from '@/src/api/ProductApi';
import { IProductReviewAttributes } from '@/src/types/product';
import { Dialog, Rating } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/src/store/authStore';

type ProductReviewsSectionProps = {
  productId: string;
  avgRating: number;
  totalReviews: number;
};

const REVIEWS_PER_PAGE = 10;

export default function ProductReviewsSection({
  productId,
  avgRating,
  totalReviews,
}: ProductReviewsSectionProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProductReviewsContent
        productId={productId}
        avgRating={avgRating}
        totalReviews={totalReviews}
      />
    </QueryClientProvider>
  );
}

function ProductReviewsContent({
  productId,
  avgRating,
  totalReviews,
}: ProductReviewsSectionProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);
  const currentUser = useAuthStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectToLogin = () => {
    toast.info('Debes iniciar sesión para publicar una reseña');
    router.push('/auth/sign-in');
  };

  const {
    data,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['product-reviews', productId],
    enabled: open && !!productId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getProductReviews({
        pag: pageParam,
        limit: REVIEWS_PER_PAGE,
        productId,
        sort: 'desc',
        isClient: true,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.actualPage < lastPage.meta.totalPage) {
        return lastPage.meta.actualPage + 1;
      }
      return undefined;
    },
  });

  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data?.pages],
  );

  useEffect(() => {
    if (!open || !observerTargetRef.current || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerTargetRef.current);

    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCreateReview = async () => {
    if (!productId) {
      return;
    }

    if (!currentUser) {
      redirectToLogin();
      return;
    }

    if (!rating || rating < 1) {
      toast.error('Debes seleccionar una calificacion');
      return;
    }

    setIsSubmitting(true);
    try {
      await createProductReview({
        productId,
        rating,
        comment: comment.trim() || undefined,
      });
      toast.success('Reseña enviada correctamente');
      setRating(0);
      setComment('');
      await queryClient.invalidateQueries({
        queryKey: ['product-reviews', productId],
      });
      await refetch();
    } catch {
      toast.error('No se pudo enviar la reseña');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='mt-1 flex items-center gap-2'>
        <Rating
          name='product-rating-summary'
          value={Number(avgRating || 0)}
          precision={0.1}
          readOnly
          size='small'
        />
        <button
          type='button'
          className='text-sm font-semibold text-primary hover:text-primaryHover underline underline-offset-2'
          onClick={() => setOpen(true)}
        >
          {totalReviews} reseñas
        </button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <div className='p-4'>
          <h3 className='text-xl font-bold text-slate-900'>
            Reseñas del producto
          </h3>

          <div className='mt-4 rounded-lg border border-slate-200 p-3'>
            <p className='text-sm font-semibold text-slate-800'>
              Agregar reseña
            </p>
            {currentUser ? (
              <>
                <div className='mt-2'>
                  <Rating
                    name='product-rating-create'
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                  />
                </div>
                <textarea
                  className='mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm'
                  placeholder='Comparte tu experiencia con este producto...'
                  rows={3}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <div className='mt-2 flex justify-end'>
                  <button
                    type='button'
                    onClick={handleCreateReview}
                    disabled={isSubmitting}
                    className='rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryHover disabled:opacity-60'
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar reseña'}
                  </button>
                </div>
              </>
            ) : (
              <div className='mt-2 flex justify-end'>
                <button
                  type='button'
                  onClick={redirectToLogin}
                  className='rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryHover'
                >
                  Iniciar sesión para reseñar
                </button>
              </div>
            )}
          </div>

          <div className='mt-4 max-h-[420px] overflow-auto pr-1'>
            {isFetching && reviews.length === 0 ? (
              <p className='text-sm text-slate-600'>Cargando reseñas...</p>
            ) : reviews.length === 0 ? (
              <p className='text-sm text-slate-600'>
                Este producto aún no tiene reseñas.
              </p>
            ) : (
              <ul className='space-y-3'>
                {reviews.map((review: IProductReviewAttributes, index) => (
                  <li
                    key={review.id || `${index}-${review.createdAt || ''}`}
                    className='rounded-lg border border-slate-200 p-3'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <Rating value={review.rating} readOnly size='small' />
                      <span className='text-xs text-slate-500'>
                        {review.createdAt
                          ? new Date(
                              review.createdAt as unknown as string,
                            ).toLocaleDateString('es-VE')
                          : ''}
                      </span>
                    </div>
                    <p className='mt-2 text-sm text-slate-700 whitespace-pre-wrap'>
                      {review.comment || 'Sin comentario'}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div ref={observerTargetRef} className='h-6' />
            {isFetchingNextPage && (
              <p className='text-xs text-slate-500'>Cargando más reseñas...</p>
            )}
          </div>

          <div className='mt-4 flex justify-end'>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
            >
              Cerrar
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
