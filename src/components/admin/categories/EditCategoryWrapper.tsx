'use client';

import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { ICategory, TCategoryForm } from '@/src/types/category';
import CategoryForm from './CategoryForm';
import { updateCategory } from '@/src/api/CategoriesApi';

const queryKey = 'category';

type EditCategoryWrapperProps = {
  category: ICategory;
};

export default function EditCategoryWrapper({
  category,
}: EditCategoryWrapperProps) {
  const navigate = useRouter();
  useBreadcrumb('Categorias', 'Editar Categoria');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setError,
  } = useForm<TCategoryForm>({
    defaultValues: {
      icon: category.icon,
      name: category.name,
      description: category.description,
      status: category.status,
      isSalient: category.isSalient,
      departmentId: category.departmentId,
    },
  });
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleForm = async (formData: TCategoryForm) => {
    const response = await updateCategory({
      data: formData,
      id: id as string,
    });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: [queryKey, id] });
      toast.success('Categoria actualizada correctamente');
      navigate.replace('/admin/categories');
      reset();
    } else {
      response.message.forEach(
        (item: { field: keyof TCategoryForm; message: string }) => {
          if (item.field === 'icon') {
            toast.error('Debe subir una imagen para continuar');
          } else {
            setError(item.field, {
              message: item.message,
            });
          }
        }
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <CategoryForm
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
    </form>
  );
}
