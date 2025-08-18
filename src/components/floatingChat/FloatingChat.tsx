import {
  ChatBubbleBottomCenterTextIcon,
  MinusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Logo from '../Logo';
import WelcomeToChat from './WelcomeToChat';
import InitChat from './InitChat';

export default function FloatingChat() {
  const [openChat, setOpenChat] = useState(false);
  const [initChat, setInitChat] = useState(false);

  return (
    <div className='relative '>
      <div
        className='absolute bottom-[calc(100%+1rem)] bg-white transition-all right-0 rounded-md shadow-lg flex flex-col overflow-hidden'
        style={{
          width: openChat ? '350px' : '0',
          height: openChat ? '550px' : '0',
        }}
      >
        <div className='text-center border-b py-4 relative'>
          <div className='max-w-[150px] mx-auto'>
            <Logo />
          </div>
          <button
            className='bg-gray-100 hover:bg-gray-200 absolute top-4 right-4 rounded-full p-1 transition-colors'
            onClick={() => setOpenChat(!openChat)}
          >
            <MinusIcon className='w-4' />
          </button>
        </div>
        <div className='flex-1 overflow-hidden flex h-full'>
          <div
            className='overflow-auto h-full flex flex-col transition-all'
            style={{
              width: !initChat ? '350px' : '0',
            }}
          >
            <WelcomeToChat setInitChat={setInitChat} />
          </div>
          <div
            className='overflow-hidden transition-all'
            style={{
              width: initChat ? '350px' : '0',
            }}
          >
            <InitChat initChat={initChat} />
          </div>
        </div>
      </div>
      <div className='text-center flex  flex-col justify-center items-center'>
        <div
          className='relative w-10 h-10 p-2'
          onClick={() => setOpenChat(!openChat)}
        >
          <button className='bg-primary p-2 rounded-full shadow-md flex absolute w-full h-full left-0 top-0 flex-col items-center justify-center'>
            <ChatBubbleBottomCenterTextIcon className='text-white' />
          </button>
          <button
            className={`bg-primary p-2 rounded-full shadow-md flex flex-col items-center justify-center absolute w-full h-full left-0 top-0 ${
              openChat ? 'opacity-100' : 'opacity-0'
            } transition-opacity`}
          >
            <XMarkIcon className='text-white' />
          </button>
        </div>
        <span
          style={{
            textShadow: '#1958ac 0px 0px 8px',
            color: 'white',
          }}
        >
          {openChat ? 'Cerrar Chat' : 'Abrir Chat'}
        </span>
      </div>
    </div>
  );
}
