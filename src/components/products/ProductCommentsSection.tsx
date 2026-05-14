'use client';

import {
  createProductComment,
  deleteProductComment,
  getProductComments,
} from '@/src/api/ProductApi';
import {
  IProductCommentAttributes,
  IProductCommentDetail,
} from '@/src/types/product';
import {
  InfiniteData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'next/navigation';

type ProductCommentsSectionProps = {
  productId: string;
};

type ThreadComment = Omit<IProductCommentAttributes, 'replies'> & {
  replies: ThreadComment[];
};

const COMMENTS_PREVIEW_LIMIT = 10;

type CreateCommentPayload = Pick<
  IProductCommentAttributes,
  'productId' | 'parentId' | 'content'
>;

const normalizeThreadComment = (
  comment: IProductCommentAttributes,
): ThreadComment => ({
  ...comment,
  replies: (comment.replies || []).map(normalizeThreadComment),
});

const buildCommentTree = (
  comments: IProductCommentAttributes[],
): ThreadComment[] => {
  return comments
    .filter((comment) => !comment.parentId)
    .map(normalizeThreadComment);
};

const appendReplyToTree = (
  comments: IProductCommentAttributes[],
  parentId: string,
  reply: IProductCommentAttributes,
): IProductCommentAttributes[] => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), reply],
      };
    }

    if (comment.replies?.length) {
      return {
        ...comment,
        replies: appendReplyToTree(comment.replies, parentId, reply),
      };
    }

    return comment;
  });
};

export default function ProductCommentsSection({
  productId,
}: ProductCommentsSectionProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProductCommentsSectionContent productId={productId} />
    </QueryClientProvider>
  );
}

const ProductCommentsSectionContent = ({
  productId,
}: ProductCommentsSectionProps) => {
  const [content, setContent] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const currentUser = useAuthStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectToLogin = () => {
    toast.info('Debes iniciar sesión para comentar');
    router.push('/auth/sign-in');
  };

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['product-comments', productId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getProductComments({
        pag: pageParam,
        limit: COMMENTS_PREVIEW_LIMIT,
        productId,
        sort: 'desc',
        isClient: true,
      }),
    enabled: Boolean(productId),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.actualPage < lastPage.meta.totalPage) {
        return lastPage.meta.actualPage + 1;
      }

      return undefined;
    },
  });

  const comments = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data?.pages],
  );
  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);

  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: createProductComment,
    onMutate: async (variables: CreateCommentPayload) => {
      const queryKey = ['product-comments', productId] as const;
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<IProductCommentDetail>>(queryKey);

      const optimisticComment: IProductCommentAttributes = {
        id: `optimistic-${Date.now()}`,
        productId: variables.productId,
        parentId: variables.parentId ?? null,
        content: variables.content,
        isApproved: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        author: {
          id: currentUser?.id || '',
          name: currentUser?.name || 'Tu',
        },
        userId: currentUser?.id,
        replies: [],
      };

      queryClient.setQueryData<InfiniteData<IProductCommentDetail>>(
        queryKey,
        (currentData) => {
          if (!currentData || currentData.pages.length === 0) {
            return currentData;
          }

          const pages = currentData.pages.map((page, index) => {
            if (index !== 0) {
              return page;
            }

            const updatedComments = variables.parentId
              ? appendReplyToTree(
                  page.data,
                  variables.parentId,
                  optimisticComment,
                )
              : [optimisticComment, ...page.data];

            return {
              ...page,
              data: updatedComments,
            };
          });

          return {
            ...currentData,
            pages,
          };
        },
      );

      return { previousData };
    },
    onSuccess: async () => {
      toast.success('Comentario enviado correctamente');
      setContent('');
      setReplyToId(null);
      setReplyContent({});
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['product-comments', productId],
          context.previousData,
        );
      }
      toast.error('No se pudo enviar el comentario');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['product-comments', productId],
      });
    },
  });

  const { mutate: removeComment, isPending: isDeletingComment } = useMutation({
    mutationFn: deleteProductComment,
    onSuccess: async () => {
      toast.success('Comentario eliminado correctamente');
      await queryClient.invalidateQueries({
        queryKey: ['product-comments', productId],
      });
    },
    onError: () => {
      toast.error('No se pudo eliminar el comentario');
    },
  });

  const handleSubmitComment = (event: FormEvent) => {
    event.preventDefault();

    if (!currentUser) {
      redirectToLogin();
      return;
    }

    if (!content.trim()) {
      toast.error('El comentario no puede estar vacío');
      return;
    }

    createComment({
      productId,
      parentId: null,
      content: content.trim(),
    });
  };

  const handleSubmitReply = (commentId: string) => {
    if (!currentUser) {
      redirectToLogin();
      return;
    }

    const value = replyContent[commentId]?.trim();

    if (!value) {
      toast.error('La respuesta no puede estar vacía');
      return;
    }

    createComment({
      productId,
      parentId: commentId,
      content: value,
    });
  };

  const renderComment = (
    comment: ThreadComment,
    level: number = 0,
    hideReply: boolean = false,
  ) => {
    const isOwner = Boolean(
      currentUser?.id && comment.userId === currentUser.id,
    );
    const isAdmin = currentUser?.rol?.name !== 'client';
    const canDelete = Boolean(currentUser && (isOwner || isAdmin));

    const createdAtText = comment.createdAt
      ? new Date(comment.createdAt).toLocaleString('es-VE')
      : 'Sin fecha';

    return (
      <li
        key={comment.id}
        className='rounded-lg border border-slate-200 p-3 bg-white'
        style={{ marginLeft: level > 0 ? `${Math.min(level * 16, 64)}px` : 0 }}
      >
        <div className='flex items-start justify-between gap-3'>
          <div>
            <p className='text-xs text-slate-500'>
              {comment.author?.name || 'Anónimo'}
            </p>
            <p className='text-xs text-slate-500'>{createdAtText}</p>
          </div>
          {canDelete && (
            <button
              type='button'
              onClick={() => comment.id && removeComment(comment.id)}
              disabled={isDeletingComment || !comment.id}
              className='text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50'
            >
              Eliminar
            </button>
          )}
        </div>

        <p className='mt-2 text-sm text-slate-700 whitespace-pre-wrap'>
          {comment.content}
        </p>

        {comment.id && !hideReply && (
          <div className='mt-3'>
            <button
              type='button'
              onClick={() => {
                if (!currentUser) {
                  redirectToLogin();
                  return;
                }

                setReplyToId((prev) =>
                  prev === comment.id ? null : comment.id || null,
                );
              }}
              className='text-xs font-semibold text-primary hover:text-primaryHover'
            >
              {replyToId === comment.id ? 'Cancelar respuesta' : 'Responder'}
            </button>

            {replyToId === comment.id && (
              <div className='mt-2'>
                <textarea
                  className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm'
                  rows={3}
                  placeholder='Escribe una respuesta...'
                  value={replyContent[comment.id] || ''}
                  onChange={(event) =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [comment.id!]: event.target.value,
                    }))
                  }
                />
                <div className='mt-2 flex justify-end'>
                  <button
                    type='button'
                    onClick={() => handleSubmitReply(comment.id!)}
                    disabled={isCreatingComment}
                    className='rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primaryHover disabled:opacity-50'
                  >
                    Enviar respuesta
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {comment.replies.length > 0 && (
          <ul className='mt-3 space-y-3'>
            {comment.replies.map((reply) =>
              renderComment(reply, level + 1, true),
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <section className='mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4'>
      <h3 className='text-xl font-bold text-slate-900'>Comentarios</h3>

      <form onSubmit={handleSubmitComment} className='mt-4'>
        <textarea
          className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white'
          rows={3}
          placeholder='Escribe un comentario sobre este producto...'
          value={content}
          disabled={!currentUser}
          onChange={(event) => setContent(event.target.value)}
        />
        <div className='mt-2 flex justify-end'>
          {currentUser ? (
            <button
              type='submit'
              disabled={isCreatingComment}
              className='rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryHover disabled:opacity-50'
            >
              Publicar comentario
            </button>
          ) : (
            <button
              type='button'
              onClick={redirectToLogin}
              className='rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryHover'
            >
              Iniciar sesión para comentar
            </button>
          )}
        </div>
      </form>

      <div className='mt-5'>
        {isLoading || (isFetching && comments.length === 0) ? (
          <p className='text-sm text-slate-600'>Cargando comentarios...</p>
        ) : commentTree.length === 0 ? (
          <p className='text-sm text-slate-600'>Aún no hay comentarios.</p>
        ) : (
          <ul className='space-y-3'>
            {commentTree.map((item) => renderComment(item))}
          </ul>
        )}

        {hasNextPage && (
          <div className='mt-4 flex justify-center'>
            <button
              type='button'
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50'
            >
              {isFetchingNextPage ? 'Cargando...' : 'Cargar más comentarios'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
