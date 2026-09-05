'use client';

import { createCombo } from '@/src/api/ComboApi';
import ComboForm from '@/src/components/admin/combos/ComboForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { IComboCreationAttributes, TComboForm } from '@/src/types/combo';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function NewComboPage() {
  useBreadcrumb('Combos', 'Nuevo Combo');

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
  } = useForm<TComboForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: 0,
      priceBs: 0,
      coverImage: '',
      status: undefined,
      products: [],
    },
  });
  const navigate = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createCombo,
    onSuccess: (data) => {
      if (data.success) {
        navigate.push('/admin/combos');
        setTimeout(() => {
          toast.success('Combo creado exitosamente');
        }, 1000);
      } else {
        (data.message || []).forEach((item: { field: string }) => {
          if (item.field === 'slug') {
            toast.error('El slug del combo ya existe');
          } else {
            toast.error('Revisa los campos del formulario');
          }
        });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleForm = (formData: TComboForm) => {
    const payload: IComboCreationAttributes = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      price: Number(formData.price),
      priceBs: formData.priceBs != null ? Number(formData.priceBs) : null,
      coverImage: formData.coverImage,
      status: formData.status,
      products: formData.products.map((p) => ({
        productId: p.productId,
        quantity: Number(p.quantity),
      })),
    };
    mutate(payload);
  };

  const handleProductsArray = useFieldArray({
    control,
    name: 'products',
    keyName: '_pid',
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
      <ComboForm
        setValue={setValue}
        handleProductsArray={handleProductsArray}
        register={register}
        errors={errors}
        watch={watch}
        isSubmitting={isPending}
      />
    </form>
  );
}
