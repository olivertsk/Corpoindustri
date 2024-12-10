import { inputStlyes, primaryBtn, secondaryBtn } from '@/src/lib/global';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import UploadImage from '../../UploadImage';
import ErrorMessage from '../../ErrorMessage';
import { TCategoryForm } from '@/src/types/category';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/src/api/DepartmentsApi';
import Spinner from '../../spinner/Spinner';
import { useRouter } from 'next/navigation';

type CategoryFormProps = {
  setValue: UseFormSetValue<TCategoryForm>;
  register: UseFormRegister<TCategoryForm>;
  errors: FieldErrors<TCategoryForm>;
  getValues?: UseFormGetValues<TCategoryForm>;
};

export default function CategoryForm({
  setValue,
  register,
  errors,
  getValues,
}: CategoryFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['allDepartments'],
    queryFn: () => getDepartments(),
    refetchOnWindowFocus: false,
  });

  const navigate = useRouter();
  const uploadImgCb = (fileName: string) => {
    setValue('icon', fileName);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        <div>
          <UploadImage
            initialValue={`${getValues ? getValues('icon') : ''}`}
            callback={uploadImgCb}
          />
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <div>
              <label htmlFor=''>
                Nombre
                <input
                  className={inputStlyes}
                  type='text'
                  {...register('name', {
                    required: 'Este campo es requerido',
                  })}
                />
              </label>
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor=''>
                Descripción
                <input
                  className={inputStlyes}
                  type='text'
                  {...register('description')}
                />
              </label>
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor=''>
                Estatus
                <select
                  className={inputStlyes}
                  {...register('status', {
                    required: 'Este campo es requerido',
                  })}
                >
                  <option value='true'>Activo</option>
                  <option value='false'>Inactivo</option>
                </select>
              </label>
              {errors.status && (
                <ErrorMessage>{errors.status.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor=''>
                Destacado
                <select
                  className={inputStlyes}
                  {...register('isSalient', {
                    required: 'Este campo es requerido',
                  })}
                >
                  <option value=''>Seleccionar</option>
                  <option value='true'>Destacado</option>
                  <option value='false'>No Destacado</option>
                </select>
              </label>
              {errors.isSalient && (
                <ErrorMessage>{errors.isSalient.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor=''>
                Departamento
                <select
                  className={inputStlyes}
                  {...register('departmentId', {
                    required: 'Este campo es requerido',
                  })}
                >
                  {data.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              {errors.departmentId && (
                <ErrorMessage>{errors.departmentId.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8 gap-2'>
          <button className={`${primaryBtn} `}>Guardar</button>
          <button
            onClick={() => navigate.push('/admin/categories')}
            type='button'
            className={secondaryBtn}
          >
            Cancelar
          </button>
        </div>
      </>
    );
}
