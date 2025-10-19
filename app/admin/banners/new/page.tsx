'use client';

import { createBanner } from '@/src/api/BannerApi';
import BannerForm from '@/src/components/admin/banners/BannerForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles, primaryBtn, secondaryBtn } from '@/src/lib/global';
import { EPositionBanner, IBannerCreate } from '@/src/types/banner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewBannerPage() {
  useBreadcrumb('Banners', 'Nuevo Banner');
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IBannerCreate>({
    defaultValues: {
      name: '',
      position: EPositionBanner.HomePrincipal,
      description: '',
      status: true,
      images: '',
    },
  });

  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createBanner,
    onSuccess: (data) => {
      if (data.success) {
        navigate.push('/admin/banners');
        queryClient.invalidateQueries({ queryKey: ['banners'] });
        setTimeout(() => {
          toast.success('Banner creado correctamente');
        }, 1000);
      } else {
        if (Array.isArray(data.message)) {
          data.message.forEach((item: { field: string }) => {
            if (item.field === 'images') {
              toast.error('Debe subir una imagen');
            }
          });
        } else {
          toast.error(data.message);
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (data: IBannerCreate) => mutate(data);

  return (
    <form className={containerStyles} onSubmit={handleSubmit(handleForm)}>
      <BannerForm
        setValue={setValue}
        watch={watch}
        register={register}
        errors={errors}
      />
      <div className='mt-8 flex justify-center gap-4'>
        <button className={primaryBtn}>Guardar</button>
        <button
          onClick={() => navigate.push('/admin/banners')}
          type='button'
          className={secondaryBtn}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
