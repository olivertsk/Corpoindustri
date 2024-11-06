'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { UserFormRegistration } from '@/types';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UserFormRegistration>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const password = watch('password');
  const handleForm = (formData: UserFormRegistration) => {
    console.log(formData);
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl'>
      <h1 className='text-4xl text-center font-black'>Registro</h1>
      <form onSubmit={handleSubmit(handleForm)} className='mt-8 space-y-5'>
        <label htmlFor='name' className='block'>
          Nombre
          <input
            className='w-full p-3 border rounded-md border-gray-400'
            type='text'
            id='name'
            {...register('name', {
              required: 'Este campo es requerido',
            })}
          />
        </label>
        {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
        <label htmlFor='email' className='block'>
          Email
          <input
            className='w-full p-3 border rounded-md border-gray-400'
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
        <label htmlFor='password' className='block'>
          Contraseña
          <input
            className='w-full p-3 border rounded-md border-gray-400'
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
        <label htmlFor='passwordConfirmation' className='block'>
          Repetir Contraseña
          <input
            className='w-full p-3 border rounded-md border-gray-400'
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
        <input
          type='submit'
          value='Registrarse'
          className='bg-primary rounded-md transition-colors hover:bg-secondary w-full p-3  text-white font-black  text-xl cursor-pointer'
        />
      </form>
      <nav className='mt-8 flex flex-col space-y-4'>
        <Link
          href='/auth/sign-in'
          className='text-center text-gray-400 font-normal'
        >
          ¿Ya tienes cuenta?{' '}
          <span className='text-secondary font-bold'>Iniciar Sesión</span>
        </Link>
        <Link
          href='/auth/forgot-password'
          className='text-center text-gray-400 font-normal'
        >
          ¿Olvidaste tu contraseña?{' '}
          <span className='text-secondary font-bold'>Reestablecer</span>
        </Link>
      </nav>
    </div>
  );
}
