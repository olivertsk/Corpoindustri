'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getAllViews } from '@/src/api/ViewApi';
import { createRol } from '@/src/api/RolApi';
import { IRolPayloadForm } from '@/src/types/rol';
import { containerStyles } from '@/src/lib/global';
import RoleForm from '@/src/components/admin/users/role/RoleForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

export default function CreateRolPage() {
  useBreadcrumb('Roles', 'Nuevo rol');
  const navigate = useRouter();

  // Obtener todas las vistas disponibles
  const { data: views } = useQuery({
    queryKey: ['views'],
    queryFn: () => getAllViews({}),
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createRol,
    onSuccess: () => {
      toast.success('Rol creado con éxito');
      navigate.push('/admin/users?tab=roles');
    },
    onError: (error: { messages: { field: string; message: string }[] }) => {
      toast.error('Ocurrió un error al crear el rol');
      // Aquí podrías manejar los errores de validación si es necesario
      console.error(error);
    },
  });

  const handleFormSubmit = (formData: IRolPayloadForm) => {
    mutate(formData);
  };

  console.log('views :>> ', views);
  if (!views) {
    return <div>Cargando vistas...</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <RoleForm
          onSubmit={handleFormSubmit}
          isLoading={isPending}
          views={views.data}
        />
      </div>
    </div>
  );
}
