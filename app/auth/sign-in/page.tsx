'use client';
import { authenticateUser } from '@/src/api/AuthApi';
import { useAuthStore } from '@/src/store/authStore';
import { UserFormLogin } from '@/src/types/user';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function SignInPage() {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleForm = async (data: UserFormLogin) => {
    try {
      const response = await authenticateUser(data);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setUser(response.user, response.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gradient-to-b from-primary to-primaryHover p-8 rounded-xl shadow-2xl w-full max-w-2xl'>
      <h1 className='text-4xl text-center font-black text-white'>
        Iniciar Sesión
      </h1>
      <p className='text-xl text-center font-light mt-5 text-white'>
        Adquiere los mejores productos {''}
        <span className=' text-accent-100 font-bold'> Al mejor precio</span>
      </p>
      <form onSubmit={handleSubmit(handleForm)} className='mt-8 space-y-5'>
        <label htmlFor='email' className='block text-white'>
          Email
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='email'
            placeholder='example@example.com'
            id='email'
            {...register('email', {
              required: 'Este campo es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'El email no es válido',
              },
            })}
          />
        </label>
        {errors.email && (
          <span className='text-red-500 text-sm font-bold'>
            {errors.email.message}
          </span>
        )}
        <label htmlFor='password' className='block text-white'>
          Contraseña
          <input
            className='w-full p-3 border rounded-md border-gray-400 text-black'
            type='password'
            id='password'
            {...register('password', {
              required: 'Este campo es requerido',
            })}
          />
        </label>
        {errors.password && (
          <span className='text-red-500 text-sm font-bold'>
            {errors.password.message}
          </span>
        )}
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-accent-100 rounded-md transition-colors hover:bg-accent-200 w-full p-3   font-black  text-xl cursor-pointer'
        />
      </form>
      <nav className='mt-8 flex flex-col space-y-4'>
        <Link
          href='/auth/register'
          className='text-center text-gray-400 font-normal'
        >
          ¿No tienes cuenta?{' '}
          <span className='text-accent-100 font-bold'>Crear Una</span>
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
