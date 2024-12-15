import { EPositionBanner, IBannerCreate } from '@/src/types/banner';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import { apiUrl, inputStlyes, primaryBtn } from '@/src/lib/global';
import { ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { deleteFile, uploadFile } from '@/src/api/FileApi';

type BannerFormProps = {
  register: UseFormRegister<IBannerCreate>;
  errors: FieldErrors<IBannerCreate>;
  watch: UseFormWatch<IBannerCreate>;
  setValue: UseFormSetValue<IBannerCreate>;
};

export default function BannerForm({
  register,
  errors,
  watch,
  setValue,
}: BannerFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const image = watch('images');
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
      setValue('images', res.fileName[0]);
      inputFileRef.current!.value = '';
    }
  };

  return (
    <>
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
          <label htmlFor=''>
            <span>Nombre</span>
            <input
              {...register('name', {
                required: 'Este campo es requerido',
              })}
              type='text'
              className={inputStlyes}
            />
          </label>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor=''>
            <span>
              Descripción <span className='text-xs'>(opcional)</span>
            </span>
            <input
              {...register('description')}
              type='text'
              className={inputStlyes}
            />
          </label>
        </div>
        <div>
          <label htmlFor=''>
            <select
              {...register('position', {
                required: 'Este campo es requerido',
              })}
              className={inputStlyes}
            >
              <option value={EPositionBanner.HomePrincipal}>
                Banner Principal
              </option>
              <option value={EPositionBanner.HomeSecondary}>
                Banner Secundario
              </option>
              <option value={EPositionBanner.HomeTertiary}>
                Banner Terciario
              </option>
            </select>
          </label>
          {errors.position && (
            <ErrorMessage>{errors.position.message}</ErrorMessage>
          )}
        </div>
      </section>
    </>
  );
}
