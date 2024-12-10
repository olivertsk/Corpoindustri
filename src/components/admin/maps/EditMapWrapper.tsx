'use client';
import { containerStyles } from '@/src/lib/global';
import MapForm from './MapForm';
import { TMap, TMapCreate } from '@/src/types/map';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMap } from '@/src/api/MapApi ';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

type EditMapWrapperProps = {
  map: TMap;
};

export default function EditMapWrapper({ map }: EditMapWrapperProps) {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TMapCreate>({
    defaultValues: map,
  });

  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { mutate } = useMutation({
    mutationFn: updateMap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maps'] });
      queryClient.invalidateQueries({ queryKey: ['map', id] });
      navigate.replace('/admin/maps');
      toast.success('Mapa actualizado con éxito');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (formData: TMapCreate) => mutate({ data: formData, id });

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
