'use client';

import { createProduct } from '@/src/api/ProductApi';
import ProductForm from '@/src/components/admin/products/ProductForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { TProductForm } from '@/src/types/product';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewProductPage() {
  useBreadcrumb('Productos', 'Nuevo Producto');

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm<TProductForm>({
    defaultValues: {
      brand: '',
      categoryId: '',
      code: '',
      departmentId: '',
      description: '',
      images: [],
      longDescription: '',
      name: '',
      price: 0,
      promotionalPrice: 0,
      status: undefined,
      stock: 0,
      taxRate: 0,
    },
  });
  const navigate = useRouter();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Producto creado exitosamente');
        navigate.push('/admin/products');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleForm = (formData: TProductForm) => mutate(formData);

  const handleImageArray = useFieldArray({
    control,
    name: 'images',
    keyName: '_id',
  });

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <ProductForm
        handleImageArray={handleImageArray}
        register={register}
        errors={errors}
        watch={watch}
      />
    </form>
  );
}
