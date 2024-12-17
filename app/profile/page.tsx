'use client';

import { updateUser } from '@/src/api/AuthApi';
import ChangePassword from '@/src/components/auth/ChangePassword';
import ErrorMessage from '@/src/components/ErrorMessage';
import Heading from '@/src/components/Heading';
import SubHeading from '@/src/components/SubHeading';
import UploadImage from '@/src/components/UploadImage';
import {
  containerStyles,
  inputStlyes,
  mainContainerStyles,
  primaryBtn,
  secondaryBtn,
} from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { TUpdateUser } from '@/src/types/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const labelStyle = 'col-span-2 lg:col-span-1';

export default function ProfilePage() {
  const [open, setOpen] = useState(false);

  const token = useAuthStore((store) => store.token);
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TUpdateUser>({
    defaultValues: {
      avatar: user?.avatar,
      dni: user?.dni,
      dniType: 'V',
      lastName: user?.lastName || '',
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      location: user?.location || '',
    },
  });

  useEffect(() => {
    if (user) {
      for (const key in user) {
        if (key in getValues()) {
          setValue(key as keyof TUpdateUser, user[key as keyof TUpdateUser]);
        }
      }
    }
  }, [user]);

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        setUser(data.item, token!);
        toast.success('Usuario actualizado correctamente');
      } else {
        toast.error('Ha ocurrido un error');
      }
    },
  });

  const handleForm = (formData: TUpdateUser) =>
    mutate({ body: formData, userId: user!.id });

  return (
    <main className={mainContainerStyles}>
      <form
        onSubmit={handleSubmit(handleForm)}
        className={`grid grid-cols-2 gap-4 ${containerStyles} mt-8`}
      >
        <div className='col-span-2'>
          <Heading>Perfil</Heading>
          <SubHeading>
            Puedes editar los datos de tu perfil, y las direcciones guardadas
          </SubHeading>
          <br />
          <UploadImage
            callback={(ev: string) => {
              setValue('avatar', ev);
            }}
            type='circle'
            initialValue={user?.avatar}
          />
        </div>
        <label htmlFor='name' className={labelStyle}>
          Nombre
          <input
            {...register('name')}
            type='text'
            className={inputStlyes}
            id='name'
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </label>
        <label htmlFor='name' className={labelStyle}>
          Apellido
          <input
            {...register('lastName')}
            type='text'
            className={inputStlyes}
            id='name'
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </label>
        <label htmlFor='name' className={labelStyle}>
          Email
          <input
            type='text'
            className={`${inputStlyes} read-only:bg-gray-200`}
            defaultValue={user?.email}
            readOnly
            id='name'
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </label>

        <label htmlFor='phoneNumber' className={labelStyle}>
          Número de teléfono
          <input
            {...register('phoneNumber')}
            type='text'
            className={inputStlyes}
            id='phoneNumber'
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </label>
        <div>
          <label htmlFor='dni' className={labelStyle}>
            Cédula
            <span className='flex gap-2'>
              <select
                {...register('dniType')}
                className={`${inputStlyes} !w-fit`}
              >
                <option value='V'>V</option>
                <option value='E'>E</option>
                <option value='J'>J</option>
              </select>
              <input
                {...register('dni')}
                type='number'
                className={inputStlyes}
                id='dni'
              />
            </span>
            {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
          </label>
        </div>
        <label htmlFor='location' className={`${labelStyle} !col-span-2`}>
          Ubicación
          <textarea
            className={`${inputStlyes} resize-none !h-40`}
            {...register('location', {
              max: {
                value: 255,
                message: 'La dirección es muy larga',
              },
            })}
            id='location'
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
        </label>
        <div className='col-span-2 flex justify-center mt-8'>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className={`${secondaryBtn} bg-yellow-100 text-yellow-700 border-yellow-700 !rounded-full`}
          >
            Cambiar Contraseña
          </button>
        </div>
        <div className='col-span-2 flex justify-center mt-8'>
          <button className={`${primaryBtn} !rounded-full`}>Guardar</button>
        </div>
      </form>
      <ChangePassword open={open} setOpen={setOpen} />
    </main>
  );
}
