// src/components/users/RoleForm.tsx
import { useState } from 'react';
import { Stack } from '@mui/material';
import { IRolPayloadForm } from '@/src/types/rol';
import { IView } from '@/src/types/permissionsTypes';
import { primaryBtn } from '@/src/lib/global';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface RoleFormProps {
  onSubmit: (role: IRolPayloadForm) => void;
  isLoading: boolean;
  views: IView[];
  initialData?: IRolPayloadForm;
}

export default function RoleForm({
  onSubmit,
  isLoading,
  views,
  initialData,
}: RoleFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [permissions, setPermissions] = useState<
    Record<
      string,
      {
        viewId: string;
        include: boolean;
        post: boolean;
        put: boolean;
        delete: boolean;
      }
    >
  >({});

  // Inicializar permisos
  useState(() => {
    const initialPermissions: Record<
      string,
      {
        viewId: string;
        include: boolean;
        post: boolean;
        put: boolean;
        delete: boolean;
      }
    > = {};

    views?.forEach((view) => {
      // Si hay datos iniciales, usar esos permisos
      const existingPermission = initialData?.permissions?.find(
        (p) => p.viewId === view.id
      );

      initialPermissions[view.id] = {
        viewId: view.id,
        include: existingPermission ? true : false,
        post: existingPermission?.post || false,
        put: existingPermission?.put || false,
        delete: existingPermission?.delete || false,
      };
    });

    setPermissions(initialPermissions);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir a array de permisos y filtrar solo los que están incluidos
    const permissionsArray = Object.values(permissions)
      .filter((perm) => perm.include)
      .map((perm) => {
        // Buscar si hay datos iniciales para este permiso
        const existing = initialData?.permissions?.find(
          (p) => p.viewId === perm.viewId
        );
        return {
          rolId: existing?.rolId ?? '',
          viewId: perm.viewId,
          post: perm.post,
          put: perm.put,
          delete: perm.delete,
        };
      });
    if (initialData?.id) {
      onSubmit({
        id: initialData?.id,
        name,
        permissions: permissionsArray,
      });
    } else {
      onSubmit({
        name,
        permissions: permissionsArray,
      });
    }
  };

  const togglePermission = (
    viewId: string,
    permissionType: 'include' | 'post' | 'put' | 'delete'
  ) => {
    setPermissions((prev) => {
      const newState = {
        ...prev,
        [viewId]: {
          ...prev[viewId],
          [permissionType]: !prev[viewId]?.[permissionType],
        },
      };

      // Si se desmarca "include", desmarcar todos los permisos
      if (permissionType === 'include' && !newState[viewId].include) {
        newState[viewId].post = false;
        newState[viewId].put = false;
        newState[viewId].delete = false;
      }

      return newState;
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='end'
        gap={2}
      >
        <Link
          href={'/admin/users?tab=roles'}
          className='border border-slate-300 text-slate-500 p-2 rounded-md'
        >
          <ArrowLeftIcon className='h-5 w-5 inline-block mr-1' />
          Atrás
        </Link>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700'>
            Nombre *
          </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          />
        </div>
      </Stack>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-4'>
          Permisos
        </label>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Vista
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Incluir
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Crear (POST)
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Editar (PUT)
                </th>
                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Eliminar (DELETE)
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {views.map((view) => (
                <tr key={view.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {view.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {view.route}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <input
                      type='checkbox'
                      checked={permissions[view.id]?.include || false}
                      onChange={() => togglePermission(view.id, 'include')}
                      className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <input
                      type='checkbox'
                      checked={permissions[view.id]?.post || false}
                      onChange={() => togglePermission(view.id, 'post')}
                      disabled={!permissions[view.id]?.include}
                      className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                        !permissions[view.id]?.include
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <input
                      type='checkbox'
                      checked={permissions[view.id]?.put || false}
                      onChange={() => togglePermission(view.id, 'put')}
                      disabled={!permissions[view.id]?.include}
                      className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                        !permissions[view.id]?.include
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <input
                      type='checkbox'
                      checked={permissions[view.id]?.delete || false}
                      onChange={() => togglePermission(view.id, 'delete')}
                      disabled={!permissions[view.id]?.include}
                      className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                        !permissions[view.id]?.include
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='col-span-2 flex justify-center'>
        <button type='submit' disabled={isLoading} className={primaryBtn}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
