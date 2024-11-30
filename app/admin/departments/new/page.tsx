'use client';

import { createDepartment } from '@/src/api/DepartmentsApi';
import DepartmentForm from '@/src/components/admin/departments/DepartmentForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { TDepartmentForm } from '@/src/types/department';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewDepartment() {
  const navigate = useRouter();
  useBreadcrumb('Departamentos', 'Nuevo Departamento');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TDepartmentForm>({
    defaultValues: {
      icon: '',
      name: '',
      description: '',
      status: true,
      isSalient: false,
    },
  });
  const queryClient = useQueryClient();

  const handleForm = async (formData: TDepartmentForm) => {
    const response = await createDepartment(formData);
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['allDepartments'] });

      toast.success('Departamento creado correctamente');
      navigate.replace('/admin/departments');
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <DepartmentForm register={register} setValue={setValue} errors={errors} />
    </form>
  );
}
