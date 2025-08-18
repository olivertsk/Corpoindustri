import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

type WelcomeToChatProps = {
  setInitChat: Dispatch<SetStateAction<boolean>>;
};

export default function WelcomeToChat({ setInitChat }: WelcomeToChatProps) {
  return (
    <>
      <div className='flex-1 flex justify-center items-center flex-col'>
        <Image
          src='/not-chat.png'
          width={150}
          height={150}
          alt='No hay conversaciones'
        />
        <p className='text-sm text-slate-400'>No hay conversaciones aún</p>
      </div>
      <div className='flex justify-center items-center p-4 '>
        <button
          className='bg-primary text-white py-2 px-4 rounded-md w-[80%]'
          onClick={() => setInitChat(true)}
        >
          Iniciar Chat
        </button>
      </div>
    </>
  );
}
