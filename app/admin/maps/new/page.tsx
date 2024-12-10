'use client';
import { createMap } from '@/src/api/MapApi ';
import MapForm from '@/src/components/admin/maps/MapForm';
import { containerStyles } from '@/src/lib/global';
import { TMapCreate } from '@/src/types/map';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewMapPage() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TMapCreate>({
    defaultValues: {
      address: '',
      description: '',
      email: '',
      image: '',
      map: '',
      name: '',
      phoneNumber: '',
      status: true,
    },
  });

  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createMap,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['maps'] });
        toast.success('Mapa guardado con éxito');
        navigate.replace('/admin/maps');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (formData: TMapCreate) => {
    if (!formData.image) {
      return toast.error('La imagen es requerida');
    }
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
      <MapForm
        watch={watch}
        setValue={setValue}
        register={register}
        errors={errors}
      />
    </form>
  );
}
