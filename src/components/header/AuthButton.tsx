import Link from 'next/link';
import { useAuthStore } from '@/src/store/authStore';
import { menuBtnStyles, subStyles } from './HeaderButtons';
import AuthProfileImg from './AuthProfileImg';
import { userButtons } from '@/src/types/user';
import { WrenchIcon } from '@heroicons/react/24/outline';

type AuthButtonProps = {
  toggleMenu: () => void;
  handleLogout: () => void;
};

export default function AuthButton({
  toggleMenu,
  handleLogout,
}: AuthButtonProps) {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={`${menuBtnStyles} group relative hidden lg:inline-block`}>
      <Link
        className={`flex lg:flex-col items-center gap-2 `}
        href={user ? '/profile' : '/auth/sign-in'}
        onClick={toggleMenu}
      >
        <AuthProfileImg />
        <sub className={subStyles}>{user ? user?.name : 'Iniciar Sesión'}</sub>
      </Link>
      {user && (
        <div className='absolute top-[95%] -left-[80%] w-64 bg-white p-4 hidden user-options lg:group-hover:flex shadow-xl rounded-xl text-black flex-col gap-2 text-sm border border-slate-100'>
          {user?.rol?.name !== 'client' && (
            <Link
              className='hover:text-primary hover:bg-slate-50 p-2 rounded-lg flex gap-2 transition-colors'
              href='/admin'
              onClick={toggleMenu}
            >
              <WrenchIcon className='h-5 w-5' />
              Administrador
            </Link>
          )}
          {userButtons.map((button) => (
            <Link
              key={button.path}
              className='hover:text-primary hover:bg-slate-50 p-2 rounded-lg flex gap-2 transition-colors'
              href={button.path}
              onClick={toggleMenu}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: button.icon,
                }}
              ></div>
              {button.label}
            </Link>
          ))}

          <button
            className='hover:text-primary hover:bg-slate-50 p-2 rounded-lg text-left flex gap-2 transition-colors'
            type='button'
            onClick={handleLogout}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z'
              />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
