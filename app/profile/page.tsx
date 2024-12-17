'use client';

import { updateUser } from '@/src/api/AuthApi';
import ErrorMessage from '@/src/components/ErrorMessage';
import Heading from '@/src/components/Heading';
import SubHeading from '@/src/components/SubHeading';
import UploadImage from '@/src/components/UploadImage';
import {
  containerStyles,
  inputStlyes,
  mainContainerStyles,
  primaryBtn,
} from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { TUpdateUser } from '@/src/types/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const labelStyle = 'col-span-2 lg:col-span-1';

export default function ProfilePage() {
  const user = useAuthStore((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TUpdateUser>({
    defaultValues: {
      avatar: user?.avatar,
      dni: user?.dni,
      name: user?.name || 'hola',
      phoneNumber: user?.phoneNumber,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('avatar', user.avatar);
      setValue('dni', user.dni);
      setValue('name', user.name);
      setValue('phoneNumber', user.phoneNumber);
    }
  }, [user]);
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Usuario actualizado correctamente');
      }
    },
  });

  const handleForm = (formData: TUpdateUser) => mutate(formData);

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
            callback={() => {}}
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
        <label htmlFor='dni' className={labelStyle}>
          Cédula
          <input
            {...register('dni')}
            type='number'
            className={inputStlyes}
            id='dni'
          />
          {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
        </label>
        <div className='col-span-2 flex justify-center mt-8'>
          <button className={`${primaryBtn} !rounded-full`}>Guardar</button>
        </div>
      </form>
    </main>
  );
}
