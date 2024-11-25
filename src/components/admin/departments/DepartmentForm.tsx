import { inputStlyes, primaryBtn } from '@/src/lib/global';
import { TDepartmentForm } from '@/src/types/department';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import UploadImage from '../../UploadImage';
import ErrorMessage from '../../ErrorMessage';

type DepartmentFormProps = {
  setValue: UseFormSetValue<TDepartmentForm>;
  register: UseFormRegister<TDepartmentForm>;
  errors: FieldErrors<TDepartmentForm>;
};

export default function DepartmentForm({
  setValue,
  register,
  errors,
}: DepartmentFormProps) {
  const uploadImgCb = (fileName: string) => {
    setValue('icon', fileName);
  };

  return (
    <>
      <div>
        <UploadImage callback={uploadImgCb} />
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
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <label htmlFor=''>
            Descripción
            <input
              className={inputStlyes}
              type='text'
              {...register('description')}
            />
          </label>
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
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <button className={`${primaryBtn} `}>Guardar</button>
      </div>
    </>
  );
}
