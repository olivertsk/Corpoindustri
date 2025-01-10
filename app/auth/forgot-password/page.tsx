'use client';
import { forgotPassword } from '@/src/api/AuthApi';
import ErrorMessage from '@/src/components/ErrorMessage';
import Spinner from '@/src/components/spinner/Spinner';
import { ForgotPasswordForm } from '@/src/types/user';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const initialValues: ForgotPasswordForm = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForgotPassword = async (formData: ForgotPasswordForm) => {
    setLoading(true);
    try {
      const res = await forgotPassword(formData);
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-b from-primary to-primaryHover p-8 rounded-xl shadow-2xl w-full max-w-2xl'>
      <h1 className='text-4xl text-center font-black text-white'>
        Reestablecer Contraseña
      </h1>
      <p className='text-xl text-center font-light mt-5 text-white'>
        ¿Olvidaste tu contraseña? ingresa tu email {''}
        <span className=' text-accent-100 font-bold'>
          {' '}
          y reestablece tu contraseña
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className='space-y-8 mt-10 '
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label className='font-normal text-white' htmlFor='email'>
            Email
            <input
              id='email'
              type='email'
              placeholder='Email de Registro'
              className='w-full p-3 border rounded-md border-gray-400 text-black'
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
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <input
            type='submit'
            value='Enviar Instrucciones'
            className='bg-accent-100 rounded-md transition-colors hover:bg-accent-200 w-full p-3   font-black  text-xl cursor-pointer'
          />
        )}
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          href='/auth/sign-in'
          className='text-center text-gray-400 font-normal'
        >
          ¿Ya tienes cuenta?{' '}
          <span className='text-accent-100 font-bold'>Iniciar Sesión</span>
        </Link>

        <Link
          href='/auth/register'
          className='text-center text-gray-400 font-normal'
        >
          ¿No tienes cuenta?{' '}
          <span className='text-accent-100 font-bold'> Crea una</span>
        </Link>
      </nav>
    </div>
  );
}
