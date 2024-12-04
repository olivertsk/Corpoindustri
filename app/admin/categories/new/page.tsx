'use client';

import { createCategory } from '@/src/api/CategoriesApi';
import CategoryForm from '@/src/components/admin/categories/CategoryForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { TCategoryForm } from '@/src/types/category';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewCategory() {
  const navigate = useRouter();
  useBreadcrumb('Categorias', 'Nueva Categoria');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCategoryForm>({
    defaultValues: {
      description: '',
      icon: '',
      name: '',
      isSalient: true,
      departmentId: '',
      status: true,
    },
  });

  const queryClient = useQueryClient();

  const handleForm = async (formData: TCategoryForm) => {
    const response = await createCategory(formData);
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('Categoria creada correctamente');
      navigate.replace('/admin/categories');
      reset();
    } else {
      response.message.forEach((item: { field: string }) => {
        if (item.field === 'icon') {
          toast.error('Debe subir una imagen para continuar');
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <CategoryForm register={register} setValue={setValue} errors={errors} />
    </form>
  );
}
