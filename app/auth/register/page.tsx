'use client';

import { registerUser } from '@/src/api/AuthApi';
import { uploadFile } from '@/src/api/FileApi';
import ErrorMessage from '@/src/components/ErrorMessage';
import { googleCaptchaPublicKey } from '@/src/config/google_captcha';
import { apiUrl } from '@/src/lib/global';
import { cities, states } from '@/src/lib/location-ve';
import { useAuthStore } from '@/src/store/authStore';
import { UserFormRegistration } from '@/src/types/user';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const setFrom = useAuthStore((state) => state.setFrom);
  const [avatar, setAvatar] = useState('/User-avatar.svg.png');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<UserFormRegistration>({
    defaultValues: {
      avatar: '',
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      state: 'amazonas',
    },
  });

  const password = watch('password');
  const handleForm = async (formData: UserFormRegistration) => {
    try {
      window.grecaptcha.enterprise.ready(async () => {
        const token = await window.grecaptcha.enterprise.execute(
          googleCaptchaPublicKey,
          { action: 'LOGIN' }
        );
        formData.recaptchaToken = token;
        const response = await registerUser(formData);
        if (!response.success) {
          response.message.forEach(
            (item: { field: keyof UserFormRegistration; message: string }) => {
              setError(item.field, { message: item.message });
            }
          );
          return;
        }
        setFrom('register');
        setUser(response.user, response.token);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      const res = await uploadFile(file);
      inputFileRef.current!.value = '';
      setAvatar(`${apiUrl}/file/${res.fileName[0]}`);
      setValue('avatar', res.fileName[0]);
    }
  };

  const state = watch('state');

  return (
    <div className='bg-gradient-to-b from-primary to-primaryHover p-8 rounded-xl shadow-2xl w-full max-w-2xl'>
      <h1 className='text-4xl text-center font-black text-white'>Registro</h1>
      <form onSubmit={handleSubmit(handleForm)} className='mt-8 space-y-5'>
        <div className='w-full flex justify-center '>
          <div className='relative'>
            <div className='relative max-w-32 mx-auto bg-gray-100 rounded-full overflow-hidden p-4'>
              <Image
                className='rounded-full w-[96px] h-[96px]'
                src={avatar}
                alt='upload image'
                width={512}
                height={512}
              />
            </div>
            <button
              type='button'
              className='absolute bottom-0 right-0 bg-primary rounded-full p-2 text-white'
              title='Subir imagen'
              onClick={() => inputFileRef.current?.click()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3'
                />
              </svg>
            </button>
          </div>

          <input
            accept='.png,.svg,.jpg,.jpeg'
            ref={inputFileRef}
            onChange={handleFile}
            type='file'
            hidden
          />
        </div>
        {errors.avatar && (
          <ErrorMessage> {errors.avatar.message} </ErrorMessage>
        )}
        <label htmlFor='name' className='block text-white'>
          Nombre
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='text'
            id='name'
            {...register('name', {
              required: 'Este campo es requerido',
            })}
          />
        </label>
        {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
        <label htmlFor='dob' className='block text-white'>
          Fecha de Nacimiento
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='date'
            {...register('dob')}
            id='dob'
            max={new Date().toISOString().split('T')[0]}
          />
        </label>

        <label htmlFor='state' className='block text-white'>
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
        <label htmlFor='city' className='block text-white'>
          Ciudad
          <select
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            id='city'
            {...register('city')}
          >
            {cities[state as keyof typeof cities].map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor='zone' className='block text-white'>
          Zona
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='text'
            id='zone'
            placeholder='Zona de residencia'
            {...register('zone')}
          />
        </label>
        <label htmlFor='gender' className='block text-white'>
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
        <label htmlFor='email' className='block text-white'>
          Email
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='email'
            placeholder='example@example.com'
            id='email'
            {...register('email', {
              required: 'El Email de registro es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
        </label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <label htmlFor='password' className='block text-white'>
          Contraseña
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='password'
            id='password'
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe ser mínimo de 8 caracteres',
              },
            })}
          />
        </label>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <label htmlFor='passwordConfirmation' className='block text-white'>
          Repetir Contraseña
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='password'
            id='passwordConfirmation'
            {...register('passwordConfirmation', {
              required: 'Repetir Contraseña es obligatorio',
              validate: (value) =>
                value === password || 'Las contraseñas no son iguales',
            })}
          />
        </label>
        {errors.passwordConfirmation && (
          <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
        )}
        <p className='text-slate-200 text-sm mt-4 font-light text-center'>
          Esta información se solicita a fin de llevar un control de la base de
          datos para futuras ofertas, promociones, eventos, rifas y otra
          información
        </p>
        <button
          type='submit'
          className='g-recaptcha bg-accent-100 rounded-md transition-colors hover:bg-accent-200 w-full p-3  font-black  text-xl cursor-pointer'
        >
          Registrarse
        </button>
      </form>

      <nav className='mt-8 flex flex-col space-y-4'>
        <Link
          href='/auth/sign-in'
          className='text-center text-gray-400 font-normal'
        >
          ¿Ya tienes cuenta?{' '}
          <span className='text-accent-100 font-bold'>Iniciar Sesión</span>
        </Link>
        <Link
          href='/auth/forgot-password'
          className='text-center text-gray-400 font-normal'
        >
          ¿Olvidaste tu contraseña?{' '}
          <span className='text-accent-100 font-bold'>Reestablecer</span>
        </Link>
      </nav>
    </div>
  );
}
