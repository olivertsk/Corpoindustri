'use client';

import { createPost } from '@/src/api/PostApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { TPostForm } from '@/src/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const PostForm = dynamic(() => import('@/src/components/admin/post/PostForm'), {
  ssr: false,
  loading: () => (
    <div className='min-h-[320px] rounded-md border border-slate-300 bg-white' />
  ),
});

export default function NewPostPage() {
  useBreadcrumb('Publicaciones', 'Nueva publicacion');

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<TPostForm>({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      coverImage: '',
      type: 'article',
      metaTitle: '',
      metaDescription: '',
      status: true,
      productIds: [],
    },
  });

  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        navigate.push('/admin/post');
        setTimeout(() => {
          toast.success('Publicacion creada correctamente');
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
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (formData: TPostForm) => {
    const payload: TPostForm = {
      ...formData,
      productIds: formData.type === 'recipe' ? formData.productIds || [] : [],
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <PostForm
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
    </form>
  );
}
