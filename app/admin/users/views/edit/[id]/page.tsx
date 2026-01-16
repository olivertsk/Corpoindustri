'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { getViewById, updateView } from '@/src/api/ViewApi';
import { IViewPayloadForm } from '@/src/types/permissionsTypes';
import { containerStyles } from '@/src/lib/global';
import ViewForm from '@/src/components/admin/users/views/ViewForm';

export default function EditViewPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  useBreadcrumb('Vistas', 'Editar vista');

  // Obtener la vista actual
  const { data: view } = useQuery({
    queryKey: ['view', id],
    queryFn: () => getViewById(id!),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateView,
    onSuccess: () => {
      toast.success('Vista actualizada con éxito');
      router.back();
    },
    onError: (error) => {
      toast.error('Error al actualizar la vista');
      console.error(error);
    },
  });

  const handleFormSubmit = (formData: IViewPayloadForm) => {
    mutate({ formData, id: formData!.id! });
  };

  if (!view) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <ViewForm
          onSubmit={handleFormSubmit}
          isLoading={isPending}
          initialData={view}
        />
      </div>
    </div>
  );
}
