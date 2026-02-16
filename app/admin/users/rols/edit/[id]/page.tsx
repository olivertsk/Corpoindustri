'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { getRolById, updateRol } from '@/src/api/RolApi';
import { getAllViews } from '@/src/api/ViewApi';
import { IRolPayloadForm } from '@/src/types/rol';
import { containerStyles } from '@/src/lib/global';
import RoleForm from '@/src/components/admin/users/role/RoleForm';

export default function EditRolPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const queryClient = useQueryClient();
  useBreadcrumb('Roles', 'Editar');

  useEffect(() => {}, []);

  // Obtener el rol actual y las vistas
  const { data: rol } = useQuery({
    queryKey: ['rol', id],
    queryFn: () => getRolById(id!),
    enabled: !!id,
  });

  console.log('data', rol);

  const { data: views } = useQuery({
    queryKey: ['views'],
    queryFn: () => getAllViews({}),
    refetchOnWindowFocus: false,
  });

  console.log('views', views);

  const { mutate, isPending } = useMutation({
    mutationFn: updateRol,
    onSuccess: () => {
      toast.success('Rol actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: ['rols'] });
      queryClient.invalidateQueries({ queryKey: ['views'] });
      queryClient.invalidateQueries({ queryKey: ['rol', id] });
      navigate.back();
    },
    onError: (error) => {
      toast.error('Ocurrió un error al actualizar el rol');
      console.error(error);
    },
  });

  const handleFormSubmit = (formData: IRolPayloadForm) => {
    console.log('formData :>> ', formData);
    mutate({ formData, id: formData?.id || '' });
  };

  if (!rol || !views) {
    return <div>Cargando...</div>;
  }
  return (
    <div className='container mx-auto'>
      <div className={containerStyles}>
        <RoleForm
          onSubmit={handleFormSubmit}
          isLoading={isPending}
          views={views.data}
          initialData={{
            id: rol.id,
            name: rol.name,
            permissions: rol.permissions,
          }}
        />
      </div>
    </div>
  );
}
