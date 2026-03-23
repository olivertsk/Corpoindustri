'use client';
import { PaymentMethodForm } from '@/src/types/method';
import { useForm } from 'react-hook-form';
import MethodForm from './MethodForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMethod } from '@/src/api/MethodApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type EditMethodWrapperProps = {
  method: PaymentMethodForm;
};

export default function EditMethodWrapper({ method }: EditMethodWrapperProps) {
  const [settedType, setSettedType] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<PaymentMethodForm>({
    defaultValues: method,
  });

  const type = watch('type');

  useEffect(() => {
    if (!settedType) {
      Object.keys(method).forEach((key) => {
        setValue(
          key as keyof PaymentMethodForm,
          method[key as keyof PaymentMethodForm],
        );
      });
      setSettedType(true);
    }
  }, [type, method, setValue, settedType]);

  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const { mutate } = useMutation({
    mutationFn: updateMethod,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
        queryClient.invalidateQueries({ queryKey: ['method', id] });
        navigate.push('/admin/methods');
        setTimeout(() => {
          toast.success('Método de pago actualizado correctamente');
        }, 1000);
      }
    },
  });

  const handleForm = async (data: PaymentMethodForm) => {
    mutate({ data, id });
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg grid grid-cols-2 gap-4'
    >
      <MethodForm
        setValue={setValue}
        register={register}
        errors={errors}
        watch={watch}
      />
    </form>
  );
}
