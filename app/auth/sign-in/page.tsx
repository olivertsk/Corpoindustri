import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='bg-white p-8 rounded-lg shadow-xl'>
      <h1 className='text-4xl text-center font-black'>Iniciar Sesión</h1>
      <p className='text-xl text-center font-light  mt-5'>
        Adquiere los mejores productos {''}
        <span className='  font-bold'> Al mejor precio</span>
      </p>
      <form action='' className='mt-8 space-y-5'>
        <label htmlFor='email' className='block'>
          Email
          <input
            className='w-full p-3 border-2 rounded-md border-gray-400'
            type='email'
            name=''
            placeholder='example@example.com'
            id='email'
          />
        </label>
        <label htmlFor='password' className='block'>
          Contraseña
          <input
            className='w-full p-3 border-2 rounded-md border-gray-400'
            type='password'
            name=''
            id='password'
          />
        </label>
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-primary rounded-md transition-colors hover:bg-secondary w-full p-3  text-white font-black  text-xl cursor-pointer'
        />
      </form>
      <nav className='mt-8 flex flex-col space-y-4'>
        <Link
          href='/auth/register'
          className='text-center text-gray-400 font-normal'
        >
          ¿No tienes cuenta?{' '}
          <span className='text-secondary font-bold'>Crear Una</span>
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
