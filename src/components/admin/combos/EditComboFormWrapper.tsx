'use client';

import { updateCombo } from '@/src/api/ComboApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { Combo, IComboCreationAttributes, TComboForm } from '@/src/types/combo';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ComboForm from './ComboForm';

type EditComboFormWrapperProps = {
  combo: Combo;
};

export default function EditComboFormWrapper({
  combo,
}: EditComboFormWrapperProps) {
  const navigate = useRouter();
  useBreadcrumb('Combos', `Editar Combo: ${combo.name}`);
  console.log('combo :>> ', combo);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
    setValue,
  } = useForm<TComboForm>({
    defaultValues: {
      name: combo.name,
      slug: combo.slug,
      description: combo.description,
      price: combo.price,
      priceBs: combo.priceBs,
      coverImage: combo.coverImage,
      status: combo.status,
      products:
        combo.products?.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
          productDetail: p.productDetail,
        })) || [],
    },
  });
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleForm = async (formData: TComboForm) => {
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
    const response = await updateCombo({
      data: payload,
      id: id as string,
    });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['combos'] });
      queryClient.invalidateQueries({ queryKey: ['combo', id] });
      navigate.replace('/admin/combos');
      reset();
      setTimeout(() => {
        toast.success('Combo editado correctamente');
      }, 1000);
    } else {
      (response.message || []).forEach(
        (item: { field: string; message: string }) => {
          toast.error(`${item.field} ${item.message}`);
        },
      );
    }
  };

  const handleProductsArray = useFieldArray({
    control,
    name: 'products',
    keyName: '_pid',
  });

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <ComboForm
        setValue={setValue}
        handleProductsArray={handleProductsArray}
        watch={watch}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
