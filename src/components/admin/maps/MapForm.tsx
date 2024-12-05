import { deleteFile, uploadFile } from '@/src/api/FileApi';
import { apiUrl, inputStlyes, primaryBtn } from '@/src/lib/global';
import { TMapCreate } from '@/src/types/map';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';

type MapFormProps = {
  watch: UseFormWatch<TMapCreate>;
  setValue: UseFormSetValue<TMapCreate>;
  register: UseFormRegister<TMapCreate>;
  errors: FieldErrors<TMapCreate>;
};

export default function MapForm({
  watch,
  setValue,
  register,
  errors,
}: MapFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const image = watch('image');
  const handleFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      if (image) {
        if (!(await deleteFile(image))) {
          inputFileRef.current!.value = '';
          return;
        }
      }
      const file = ev.target.files[0];
      const res = await uploadFile(file);
      setValue('image', res.fileName[0]);
      inputFileRef.current!.value = '';
    }
  };
  return (
    <section className='grid grid-cols-2 gap-4'>
      <div className='col-span-2'>
        {image && (
          <div className='w-full aspect-video relative'>
            <Image src={`${apiUrl}/file/${image}`} fill alt='a' />
          </div>
        )}
        <button
          onClick={() => inputFileRef.current?.click()}
          className={`${primaryBtn} mt-4`}
          type='button'
        >
          Seleccionar Imagen
        </button>
        <input onChange={handleFile} type='file' hidden ref={inputFileRef} />
      </div>
      <div>
        <label>
          Nombre
          <input
            type='text'
            {...register('name', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
          />
        </label>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div>
        <label>
          Email
          <input
            type='text'
            {...register('email', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
          />
        </label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div>
        <label>
          Número de Teléfono
          <input
            type='text'
            {...register('phoneNumber', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
          />
        </label>
        {errors.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}
      </div>
      <div>
        <label>
          Dirección
          <input
            type='text'
            {...register('address', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
          />
        </label>
        {errors.address && (
          <ErrorMessage>{errors.address.message}</ErrorMessage>
        )}
      </div>
      <div>
        <label>
          IFrame del Mapa
          <input
            type='text'
            {...register('map', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
          />
        </label>
        {errors.map && <ErrorMessage>{errors.map.message}</ErrorMessage>}
      </div>
    </section>
  );
}
