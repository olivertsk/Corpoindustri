import { containerStyles, primaryBtn, secondaryBtn } from '@/src/lib/global';
import { IBanner, IBannerCreate } from '@/src/types/banner';
import { useParams, useRouter } from 'next/navigation';
import BannerForm from './BannerForm';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBanner } from '@/src/api/BannerApi';
import { toast } from 'react-toastify';

type EditBannerWrapperProps = {
  banner: IBanner;
};

export default function EditBannerWrapper({ banner }: EditBannerWrapperProps) {
  const navigate = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IBannerCreate>({
    defaultValues: {
      name: banner.name,
      position: banner.position,
      description: banner.description,
      status: banner.status,
      images: banner.images,
      mobileImage: banner.mobileImage,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['banners'] });
        queryClient.invalidateQueries({ queryKey: ['banner', id] });
        navigate.push('/admin/banners');
        setTimeout(() => {
          toast.success('Banner actualizado correctamente');
        }, 1000);
      } else if (data.message) {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (data: IBannerCreate) => mutate({ data, id });

  return (
    <form onSubmit={handleSubmit(handleForm)} className={containerStyles}>
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
