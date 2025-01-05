'use client';
import { createMethod } from '@/src/api/MethodApi';
import MethodForm from '@/src/components/admin/methods/MethodForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { ETypePaymentMethods, PaymentMethodForm } from '@/src/types/method';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewMethod() {
  useBreadcrumb('Métodos de Pago', 'Nuevo Método de Pago');
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<PaymentMethodForm>({
    defaultValues: {
      type: ETypePaymentMethods.Bank,
      name: '',
      dni: '',
      phoneNumber: '',
      numberAccount: '',
      accountType: '',
      status: true,
      email: '',
    },
  });

  const queryClient = useQueryClient();
  const navigate = useRouter();
  const { mutate } = useMutation({
    mutationFn: createMethod,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
        navigate.push('/admin/methods');
        setTimeout(() => {
          toast.success('Método de pago creado correctamente');
        }, 1000);
      }
      console.log(data);
    },
  });

  const handleForm = async (data: PaymentMethodForm) => {
    console.log(data);
    mutate(data);
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
