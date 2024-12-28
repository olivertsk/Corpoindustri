'use client';
import { resetPassword } from '@/src/api/AuthApi';
import ErrorMessage from '@/src/components/ErrorMessage';
import Spinner from '@/src/components/spinner/Spinner';
import { UserRecoveryPassword } from '@/src/types/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const initialValues: UserRecoveryPassword = {
    password: '',
    passwordConfirmation: '',
    code: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: initialValues });
  const route = useRouter();

  const handleForgotPassword = async (formData: UserRecoveryPassword) => {
    if (formData.password !== formData.passwordConfirmation) {
      setError('passwordConfirmation', {
        message: 'Las contraseñas no coinciden',
      });
      return;
    }
    formData.code = window.location.search.split('=')[1];
    setLoading(true);
    try {
      const res = await resetPassword(formData);
      console.log(res);
      if (res.success) {
        toast.success('Contraseña actualizada correctamente');
        route.push('/auth/sign-in');
        reset();
      } else {
        if (Array.isArray(res.message)) {
          res.message.forEach(
            (message: {
              field: keyof UserRecoveryPassword;
              message: string;
            }) => {
              setError(message.field, { message: message.message });
            }
          );
        } else {
          toast.error('Ha ocurrido un error con la validación del código');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-b from-primary to-primaryHover p-8 rounded-xl shadow-2xl w-full max-w-2xl'>
      <h1 className='text-4xl text-center font-black text-white'>
        Establecer nueva Contraseña
      </h1>
      <p className='text-xl text-center font-light mt-5 text-white'>
        Escribe tu nueva contraseña y confirmala para poder continuar {''}
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className='space-y-8 mt-10 '
        noValidate
      >
        <div className='flex flex-col gap-5'>
          <label className='font-normal text-white' htmlFor='password'>
            Contraseña Nueva
            <input
              id='password'
              type='password'
              className='w-full p-3 border rounded-md border-gray-400 text-black'
              {...register('password', {
                required: 'Este campo es obligatorio',
                minLength: {
                  message: 'La contraseña debe tener al menos 6 caracteres',
                  value: 6,
                },
              })}
            />
          </label>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className='flex flex-col gap-5'>
          <label
            className='font-normal text-white'
            htmlFor='passwordConfirmation'
          >
            Repetir Contraseña Nueva
            <input
              id='passwordConfirmation'
              type='password'
              className='w-full p-3 border rounded-md border-gray-400 text-black'
              {...register('passwordConfirmation', {
                required: 'Este campo es obligatorio',
                minLength: {
                  message: 'La contraseña debe tener al menos 6 caracteres',
                  value: 6,
                },
              })}
            />
          </label>
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <input
            type='submit'
            value='Reestablecer Contraseña'
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
