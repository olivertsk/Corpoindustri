'use client';
import { authenticateUser, registerUser } from '@/src/api/AuthApi';
import { useAuthStore } from '@/src/store/authStore';
import { UserFormLogin } from '@/src/types/user';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/src/lib/firebase';
import { initializeApp } from 'firebase/app';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        window.grecaptcha.enterprise
      ) {
        window.grecaptcha.enterprise.ready(async () => {
          const token = await window.grecaptcha.enterprise.execute(
            '6Lek1kUrAAAAAJbq8i-BupfcyP1WaN3ZV9_t-8-3',
            { action: 'LOGIN' }
          );
          console.log('token :>> ', token);
          const response = await authenticateUser(data);
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          setUser(response.user, response.token);
        });
      } else {
        toast.error(
          'reCAPTCHA no está listo. Intenta de nuevo en unos segundos.'
        );
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        registerUser({
          email: user.email || '',
          name: user.displayName || '',
          password: '', // Google sign-in does not require a password
          passwordConfirmation: '', // Add passwordConfirmation to match password
          uid: user.uid, // Use the user's UID as the ID token
        }).then((response) => {
          if (response.success) {
            setUser(response.user, response.token);
            toast.success('Inicio de sesión exitoso con Google');
          } else {
            toast.error(response.message);
          }
        });
        console.log('user :>> ', user);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
        <button
          type='submit'
          className='bg-accent-100 rounded-md transition-colors hover:bg-accent-200 w-full p-3   font-black  text-xl cursor-pointer'
        >
          Iniciar Sesión
        </button>
      </form>
      <div>
        <div className='flex justify-center items-center mt-8 gap-4'>
          <div className='flex-1 h-[1px] bg-white w-full'></div>
          <h2 className='text-white font-bold'>O </h2>
          <div className='flex-1 h-[1px] bg-white w-full'></div>
        </div>
        <div>
          <button
            onClick={signInWithGoogle}
            className='m-auto bg-white flex items-center gap-2 rounded-md transition-colors hover:bg-gray-200 p-3 mt-4 font-black  cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 48 48'
            >
              <path
                fill='#FFC107'
                d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917'
              />
              <path
                fill='#FF3D00'
                d='m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44'
              />
              <path
                fill='#1976D2'
                d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917'
              />
            </svg>
            Iniciar Con Google
          </button>
        </div>
      </div>
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
