import {
  EAvailableCurrency,
  ETypePaymentMethods,
  PaymentMethodForm,
} from '@/src/types/method';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import {
  apiUrl,
  inputStlyes,
  primaryBtn,
  secondaryBtn,
} from '@/src/lib/global';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef } from 'react';
import { deleteFile, uploadFile } from '@/src/api/FileApi';
import Image from 'next/image';

type MethodFormProps = {
  register: UseFormRegister<PaymentMethodForm>;
  errors: FieldErrors<PaymentMethodForm>;
  watch: UseFormWatch<PaymentMethodForm>;
  setValue: UseFormSetValue<PaymentMethodForm>;
};

export default function MethodForm({
  register,
  errors,
  watch,
  setValue,
}: MethodFormProps) {
  const type = watch('type');
  const navigate = useRouter();

  useEffect(() => {
    setValue('accountType', '');
    setValue('dni', '');
    setValue('email', '');
    setValue('name', '');
    setValue('numberAccount', '');
    setValue('phoneNumber', '');
    setValue('status', true);
  }, [type, setValue]);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const image = watch('imageInfo');
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
      setValue('imageInfo', res.fileName[0]);
      inputFileRef.current!.value = '';
    }
  };

  return (
    <>
      <div>
        <div className='col-span-2'>
          {image && (
            <div className='w-full aspect-square relative'>
              <Image
                src={`${apiUrl}/file/${image}`}
                objectFit='contain'
                fill
                alt='a'
              />
            </div>
          )}
          <button
            onClick={() => inputFileRef.current?.click()}
            className={`${primaryBtn} mt-4`}
            type='button'
          >
            Seleccionar Imagen (Opcional)
          </button>
          <input onChange={handleFile} type='file' hidden ref={inputFileRef} />
          {errors.imageInfo && (
            <ErrorMessage>{errors.imageInfo.message}</ErrorMessage>
          )}
        </div>
        <label htmlFor='type'>Tipo</label>
        <select
          id='type'
          {...register('type', {
            required: 'Este campo es requerido',
          })}
          className={inputStlyes}
        >
          <option value=''>Selecciona un tipo</option>
          <option value={ETypePaymentMethods.Bank}>Banco</option>
          <option value={ETypePaymentMethods.Cash}>Efectivo</option>
          <option value={ETypePaymentMethods.Zelle}>Zelle</option>
          <option value={ETypePaymentMethods.PagoMovil}>Pago Movil</option>
          <option value={ETypePaymentMethods.Binance}>Binance</option>
        </select>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>
      {type && (
        <div className='col-span-2 grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='name'>Nombre</label>
            <input
              id='name'
              {...register('name', {
                required: 'Este campo es requerido',
              })}
              className={inputStlyes}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          {type === ETypePaymentMethods.PagoMovil && (
            <>
              <div>
                <label htmlFor='phoneNumber'>Número de Teléfono</label>
                <input
                  id='phoneNumber'
                  {...register('phoneNumber', {
                    required: 'Este campo es requerido',
                  })}
                  className={inputStlyes}
                />
                {errors.phoneNumber && (
                  <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label htmlFor='dni'>Cédula de Identidad</label>
                <input
                  id='dni'
                  {...register('dni', {
                    required: 'Este campo es requerido',
                  })}
                  className={inputStlyes}
                />
                {errors.dni && (
                  <ErrorMessage>{errors.dni.message}</ErrorMessage>
                )}
              </div>
            </>
          )}
          {(type === ETypePaymentMethods.Zelle ||
            type === ETypePaymentMethods.Binance) && (
            <div>
              <label htmlFor='email'>Correo Electrónico</label>
              <input
                id='email'
                {...register('email', {
                  required:
                    type === ETypePaymentMethods.Zelle
                      ? 'Este campo es requerido'
                      : undefined,
                })}
                className={inputStlyes}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          )}
          {type === ETypePaymentMethods.Bank && (
            <div>
              <label htmlFor='dni'>Cédula de Identidad</label>
              <input
                id='dni'
                {...register('dni', {
                  required: 'Este campo es requerido',
                  onChange(event) {
                    event.target.value = event.target.value.toUpperCase();
                  },
                })}
                className={inputStlyes}
                placeholder='V-12345678'
              />
              {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
            </div>
          )}
          {(type === ETypePaymentMethods.Bank ||
            type === ETypePaymentMethods.Binance) && (
            <div>
              <label htmlFor='numberAccount'>Número de Cuenta</label>
              <input
                id='numberAccount'
                {...register('numberAccount', {
                  required: 'Este campo es requerido',
                })}
                className={inputStlyes}
              />
              {errors.numberAccount && (
                <ErrorMessage>{errors.numberAccount.message}</ErrorMessage>
              )}
            </div>
          )}

          {type === ETypePaymentMethods.Bank && (
            <div>
              <label htmlFor='accountType'>Tipo de cuenta</label>
              <input
                id='accountType'
                {...register('accountType')}
                className={inputStlyes}
              />
            </div>
          )}
          <div>
            <label htmlFor='status'>Estatus</label>
            <select
              id='status'
              {...register('status', {
                required: 'Este campo es requerido',
              })}
              className={inputStlyes}
            >
              <option value=''>Selecciona un estatus</option>
              <option value='true'>Activo</option>
              <option value='false'>Inactivo</option>
            </select>
            {errors.status && (
              <ErrorMessage>{errors.status.message}</ErrorMessage>
            )}
          </div>
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <label htmlFor='currency' className='font-medium'>
          Disponible en
        </label>
        <label htmlFor='bolivares'>
          <input
            type='checkbox'
            id='bolivares'
            value={EAvailableCurrency.BS}
            {...register('currency', {
              required: 'Selecciona al menos una moneda',
            })}
            className='mr-2'
          />
          Bolívares
        </label>
        <label htmlFor='dolares'>
          <input
            type='checkbox'
            id='dolares'
            value={EAvailableCurrency.USD}
            {...register('currency', {
              required: 'Selecciona al menos una moneda',
            })}
            className='mr-2'
          />
          Dólares
        </label>
        {errors.currency?.message && (
          <ErrorMessage>{errors.currency.message}</ErrorMessage>
        )}
      </div>
      <div className='flex justify-center mt-8 gap-2 col-span-2'>
        <button type='submit' className={primaryBtn}>
          Guardar
        </button>
        <button
          onClick={() => navigate.push('/admin/methods')}
          type='button'
          className={secondaryBtn}
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
