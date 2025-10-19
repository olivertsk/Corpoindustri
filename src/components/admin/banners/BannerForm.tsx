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
  const inputMobileFileRef = useRef<HTMLInputElement>(null);

  const image = watch('images');
  const mobileImage = watch('mobileImage');
  const position = watch('position');
  const handleFile = async (
    ev: ChangeEvent<HTMLInputElement>,
    field: 'images' | 'mobileImage'
  ) => {
    if (ev.target.files) {
      if (
        (field === 'images' && image) ||
        (field === 'mobileImage' && mobileImage)
      ) {
        const deleteItem = field === 'images' ? image : mobileImage;
        const deleting = await deleteFile(deleteItem);
        if (!deleting) {
          inputFileRef.current!.value = '';
          return;
        }
      }
      const file = ev.target.files[0];
      const res = await uploadFile(file);
      setValue(field, res.fileName[0]);
      inputFileRef.current!.value = '';
    }
  };

  return (
    <>
      <section className='grid grid-cols-2 gap-4'>
        <div>
          <h4 className='text-center font-bold text-lg mb-4'>Imagen Web</h4>
          {image && (
            <div className='w-full aspect-video relative'>
              <Image
                src={`${apiUrl}/file/${image}`}
                fill
                alt='a'
                className='object-contain'
              />
            </div>
          )}
          <button
            onClick={() => inputFileRef.current?.click()}
            className={`${primaryBtn} mt-4`}
            type='button'
          >
            Seleccionar Imagen
          </button>
          <input
            onChange={(ev) => handleFile(ev, 'images')}
            type='file'
            hidden
            ref={inputFileRef}
          />
        </div>
        <div>
          <h4 className='text-center font-bold text-lg mb-4'>Imagen Movil</h4>
          {mobileImage && (
            <div className='w-full aspect-video relative'>
              <Image
                src={`${apiUrl}/file/${mobileImage}`}
                fill
                alt='a'
                className='object-contain'
              />
            </div>
          )}
          <button
            onClick={() => inputMobileFileRef.current?.click()}
            className={`${primaryBtn} mt-4`}
            type='button'
          >
            Seleccionar Imagen
          </button>
          <input
            onChange={(ev) => handleFile(ev, 'mobileImage')}
            type='file'
            hidden
            ref={inputMobileFileRef}
          />
        </div>
        {position === EPositionBanner.Filter && (
          <div className='col-span-2'>
            <p className='text-slate-400 text-sm'>
              Recomendamos usar una medida de 1080×2400 para web y movil
            </p>
          </div>
        )}
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
              <option value={EPositionBanner.Contact}>Contacto</option>
              <option value={EPositionBanner.HomePrincipal}>Principal</option>
              <option value={EPositionBanner.HomeSecondary}>Secundario</option>
              <option value={EPositionBanner.HomeTertiary}>Terciario</option>
              <option value={EPositionBanner.Filter}>Flitro</option>
              <option value={EPositionBanner.Product}>Productos</option>
              <option value={EPositionBanner.PopupOnce}>
                Emergente (Una vez)
              </option>
              <option value={EPositionBanner.AlwaysPopup}>
                Emergente (Siempre)
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
