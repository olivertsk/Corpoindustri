'use client';

import { updateUser } from '@/src/api/AuthApi';
import ChangePassword from '@/src/components/auth/ChangePassword';
import ConfirmDeleteAccount from '@/src/components/auth/ConfirmDeleteAccount';
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
import { cities, states } from '@/src/lib/location-ve';
import { useAuthStore } from '@/src/store/authStore';
import { TUpdateUser } from '@/src/types/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const labelStyle = 'col-span-2 lg:col-span-1';

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const token = useAuthStore((store) => store.token);
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<TUpdateUser>({
    defaultValues: {
      avatar: user?.avatar,
      dni: user?.dni,
      dniType: 'V',
      lastName: user?.lastName || '',
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      location: user?.location || '',
      receiveNotification: user?.receiveNotification || false,
      state: user?.state || 'amazonas',
      city: user?.city || 'caracas',
      zone: user?.zone || '',
      gender: user?.gender,
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
      if (data.success) {
        setUser(data.item, token!);
        toast.success('Usuario actualizado correctamente');
      } else {
        toast.error('Ha ocurrido un error');
      }
    },
  });

  const state = watch('state');
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
        <label htmlFor='dob' className='block '>
          Fecha de Nacimiento
          <input
            {...register('dob')}
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='date'
            id='dob'
          />
        </label>

        <label htmlFor='state' className='block '>
          Estado
          <select
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            id='state'
            {...register('state')}
          >
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='city' className='block '>
          Ciudad
          <select
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            id='city'
            {...register('city')}
          >
            {cities[state as keyof typeof cities]?.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor='zone' className='block '>
          Zona
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='text'
            id='zone'
            placeholder='Zona de residencia'
            {...register('zone')}
          />
        </label>
        <label htmlFor='gender' className='block '>
          Genero
          <select
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            id='gender'
            {...register('gender')}
          >
            <option value='M'>Masculino</option>
            <option value='F'>Femenino</option>
            <option value='O'>Otro</option>
          </select>
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
        <label htmlFor='notif'>
          <input
            type='checkbox'
            id='notif'
            className='mr-2'
            {...register('receiveNotification')}
          />
          Recibir Notificaciones
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
      <div className='col-span-2 flex justify-center mt-8'>
        <button
          type='button'
          onClick={() => setDeleteAccountModal(true)}
          className={`${secondaryBtn} bg-red-100 text-red-700 border-red-700 !rounded-full`}
        >
          Eliminar Cuenta
        </button>
      </div>
      <ConfirmDeleteAccount
        open={deleteAccountModal}
        setOpen={setDeleteAccountModal}
      />
      <ChangePassword open={open} setOpen={setOpen} />
    </main>
  );
}
