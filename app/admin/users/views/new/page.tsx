'use client';

import { createView } from '@/src/api/ViewApi';
import ViewForm from '@/src/components/admin/users/views/ViewForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { IViewPayloadForm } from '@/src/types/permissionsTypes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CreateViewPage() {
  useBreadcrumb('Vistas', 'Nueva vista');
  const navigate = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createView,
    onSuccess: () => {
      toast.success('Vista creada con éxito');
      navigate.push('/admin/users?tab=views');
    },
    onError: (error) => {
      toast.error('Error al crear la vista');
      console.error(error);
    },
  });

  const handleFormSubmit = (formData: IViewPayloadForm) => {
    mutate(formData);
  };

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <ViewForm onSubmit={handleFormSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}
