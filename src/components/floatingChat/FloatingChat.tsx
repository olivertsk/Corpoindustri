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

  const handleOpenWhatsapp = () => {
    window.open(
      'https://api.whatsapp.com/send/?phone=584242418564&text=Hola%2C+Te+contacto+desde+corpoindustri.com&type=phone_number&app_absent=0',
      '_blank',
    );
  };

  return (
    <div className='relative flex gap-4'>
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
      <div
        onClick={handleOpenWhatsapp}
        className='text-center flex gap-2 flex-col justify-center items-center bg-white shadow-lg p-4 px-8 rounded-xl cursor-pointer hover:bg-gray-50'
      >
        <div className='relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40.3125'
            viewBox='0 0 256 258'
          >
            <defs>
              <linearGradient
                id='IconifyId19f866787383de4522'
                x1='50%'
                x2='50%'
                y1='100%'
                y2='0%'
              >
                <stop offset='0%' stop-color='#1FAF38' />
                <stop offset='100%' stop-color='#60D669' />
              </linearGradient>
              <linearGradient
                id='IconifyId19f866787383de4523'
                x1='50%'
                x2='50%'
                y1='100%'
                y2='0%'
              >
                <stop offset='0%' stop-color='#F9F9F9' />
                <stop offset='100%' stop-color='#FFF' />
              </linearGradient>
            </defs>
            <path
              fill='url(#IconifyId19f866787383de4522)'
              d='M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004'
            />
            <path
              fill='url(#IconifyId19f866787383de4523)'
              d='M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z'
            />
            <path
              fill='#FFF'
              d='M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64'
            />
          </svg>
        </div>
        <span className='text-primary'>WhatsApp</span>
      </div>
      <div className='text-center flex gap-2 flex-col justify-center items-center'>
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
