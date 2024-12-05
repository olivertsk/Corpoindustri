'use client';
import MapForm from '@/src/components/admin/maps/MapForm';
import { containerStyles } from '@/src/lib/global';
import { TMapCreate } from '@/src/types/map';
import { useForm } from 'react-hook-form';

export default function NewMapPage() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
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

  return (
    <form className={containerStyles}>
      <MapForm
        watch={watch}
        setValue={setValue}
        register={register}
        errors={errors}
      />
    </form>
  );
}
