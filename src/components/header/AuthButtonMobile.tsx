import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '@/src/store/authStore';
import Link from 'next/link';
import { menuBtnStyles, subStyles } from './HeaderButtons';
import AuthProfileImg from './AuthProfileImg';
import { userButtons } from '@/src/types/user';
import { WrenchIcon } from '@heroicons/react/24/outline';

type AuthButtonMobileProps = {
  toggleMenu: () => void;
};

export default function AuthButtonMobile({
  toggleMenu,
}: AuthButtonMobileProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className='block lg:hidden w-full'>
      {user ? (
        <Accordion className='!bg-transparent !shadow-none border-b border-white/10'>
          <AccordionSummary
            expandIcon={<ChevronDownIcon className='w-6 text-white' />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <div className={`${menuBtnStyles} !p-0`}>
              <AuthProfileImg />
              <sub className={subStyles}>{user.name}</sub>
            </div>
          </AccordionSummary>
          <AccordionDetails className='space-y-2 pb-5'>
            {user?.rol?.name !== 'client' && (
              <Link
                className='text-white p-2 rounded-lg hover:bg-white/10 flex items-center gap-4 transition-colors'
                href='/admin'
                onClick={toggleMenu}
              >
                <WrenchIcon className='h-5 w-5' />
                <sub className='bottom-0'>Administrador</sub>
              </Link>
            )}
            {userButtons.map((button) => (
              <Link
                key={button.path}
                className='p-2 rounded-lg hover:bg-white/10 flex text-white items-center gap-4 transition-colors'
                href={button.path}
                onClick={toggleMenu}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: button.icon,
                  }}
                ></div>
                <sub className='bottom-0'>{button.label}</sub>
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <Link
          className={menuBtnStyles}
          href='/auth/sign-in'
          onClick={toggleMenu}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <g
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              color='currentColor'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M7.5 17c2.332-2.442 6.643-2.557 9 0m-2.005-7.5c0 1.38-1.12 2.5-2.503 2.5a2.5 2.5 0 0 1-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.5 2.5 0 0 1 2.503 2.5' />
            </g>
          </svg>
          <sub className={subStyles}>Iniciar Sesión</sub>
        </Link>
      )}
    </div>
  );
}
