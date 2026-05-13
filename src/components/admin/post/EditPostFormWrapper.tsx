import { updatePost } from '@/src/api/PostApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { TPost, TPostForm } from '@/src/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const PostForm = dynamic(() => import('./PostForm'), {
  ssr: false,
  loading: () => (
    <div className='min-h-[320px] rounded-md border border-slate-300 bg-white' />
  ),
});

type EditPostFormWrapperProps = {
  post: TPost;
};

export default function EditPostFormWrapper({
  post,
}: EditPostFormWrapperProps) {
  const navigate = useRouter();
  useBreadcrumb('Publicaciones', `Editar: ${post.title}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<TPostForm>({
    defaultValues: {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      coverImage: post.coverImage || '',
      type: post.type,
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      status: post.status,
      productIds: post.products?.map((item) => item.id) || [],
    },
  });

  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['post', id] });
        navigate.replace('/admin/post');
        reset();
        setTimeout(() => {
          toast.success('Publicacion editada correctamente');
        }, 1000);
      } else {
        if (Array.isArray(response.message)) {
          response.message.forEach(
            (item: { field: string; message: string }) => {
              if (item.field === 'slug') {
                toast.error('El slug ya existe, por favor elige otro');
              }
            },
          );
        } else {
          toast.error(response.message);
        }
      }
    },
  });

  const handleForm = async (formData: TPostForm) => {
    const payload: TPostForm = {
      ...formData,
      productIds: formData.type === 'recipe' ? formData.productIds || [] : [],
    };

    mutate({ id, data: payload });
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <PostForm
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        initialProducts={post.products}
        isPending={isPending}
      />
    </form>
  );
}
