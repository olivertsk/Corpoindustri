'use client';

import { Department, TDepartmentForm } from '@/src/types/department';
import DepartmentForm from './DepartmentForm';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { updateDepartment } from '@/src/api/DepartmentsApi';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

type EditDepartmentWrapperProps = {
  department: Department;
};

export default function EditDepartmentWrapper({
  department,
}: EditDepartmentWrapperProps) {
  const navigate = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<TDepartmentForm>({
    defaultValues: {
      icon: department.icon,
      name: department.name,
      description: department.description,
      status: department.status,
      isSalient: department.isSalient,
      code: department.code,
    },
  });
  const queryClient = useQueryClient();
  const { id } = useParams();
  const handleForm = async (formData: TDepartmentForm) => {
    const response = await updateDepartment({
      data: formData,
      id: id as string,
    });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['allDepartments'] });
      queryClient.invalidateQueries({ queryKey: ['department', id] });
      toast.success('Departamento editado correctamente');
      navigate.replace('/admin/departments');
      reset();
    } else {
      toast.error('Ha ocurrido un error');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <DepartmentForm
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
    </form>
  );
}
