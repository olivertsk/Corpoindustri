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
import { useEffect, useState } from 'react';

export default function NewProductPage() {
  useBreadcrumb('Productos', 'Nuevo Producto');

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
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
      coverImage: '',
    },
  });
  const navigate = useRouter();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data.success) {
        navigate.push('/admin/products');
        setTimeout(() => {
          toast.success('Producto creado exitosamente');
        }, 1000);
      } else {
        data.message.forEach((item: { field: string }) => {
          if (item.field === 'categoryId') {
            toast.error('Debe seleccionar una categoría para continuar');
          } else if (item.field === 'code') {
            toast.error('El código de producto ya existe');
          }
        });
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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <ProductForm
        setValue={setValue}
        handleImageArray={handleImageArray}
        register={register}
        errors={errors}
        watch={watch}
      />
    </form>
  );
}
