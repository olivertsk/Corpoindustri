import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { apiUrl } from '../lib/global';
import { uploadFile } from '../api/FileApi';

type UploadImageProps = {
  callback: (fileName: string) => void;
  initialValue?: string;
};

export default function UploadImage({
  callback,
  initialValue,
}: UploadImageProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState(initialValue || '');

  const handleFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      const res = await uploadFile(file);
      inputFileRef.current!.value = '';
      setIcon(`${apiUrl}/file/${res.fileName[0]}`);
      callback(res.fileName[0]);
    }
  };

  return (
    <div className='w-full flex justify-center '>
      <div className='relative'>
        <div className='relative wrapper w-52 bg-gray-300 h-52 overflow-hidden rounded-full flex justify-center items-center'>
          <div
            onClick={() => inputFileRef.current?.click()}
            className={`absolute w-full h-full bg-gray-400 ${
              icon && 'hover:opacity-70'
            } transition-opacity cursor-pointer flex justify-center items-center ${
              icon ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className='flex flex-col items-center gap-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                viewBox='0 0 14 14'
              >
                <path
                  fill='none'
                  stroke='#ffffff'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M.5 10.5v1a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1M4 4L7 .5L10 4M7 .5v9'
                />
              </svg>
              <span className='text-white'>Subir Imagen</span>
            </div>
          </div>
          <div className=' w-44 h-44 rounded-full overflow-hidden'>
            {icon && (
              <Image
                className=' bg-gray-100 w-full h-full'
                src={icon}
                alt='upload image'
                style={{ objectFit: 'cover' }}
                width={512}
                height={512}
              />
            )}
          </div>
        </div>
        <button
          type='button'
          className='absolute bottom-[10px] right-[20px] bg-primary rounded-full p-2 text-white'
          title='Subir imagen'
          onClick={() => inputFileRef.current?.click()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3'
            />
          </svg>
        </button>
      </div>
      <input
        accept='.png,.svg,.jpg,.jpeg'
        ref={inputFileRef}
        onChange={handleFile}
        type='file'
        hidden
      />
    </div>
  );
}
