'use client';
import { masiveImagesApi } from '@/src/api/MasiveImagesApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function MasiveImagesPage() {
  useBreadcrumb('Carga Masiva');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadedSuccess, setUploadedSuccess] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const sendFile = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        const res = await masiveImagesApi(formData);
        console.log(res);
        if (res.message) {
          toast.error(res.message);
        }
        if (res.data) {
          if (res.data.errors) {
            setErrors(
              res.data.errors.map((error: { msg: string }) => error.msg)
            );
          }
          if (res.data.result) {
            setUploadedSuccess(
              `${res.data.result.file} ${res.data.result.msg}`
            );
          }
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <>
      {file ? (
        <div className='min-h-[calc(100vh-200px)] flex items-center mx-auto max-w-lg mt-8'>
          <div className='w-full shadow-md p-6 bg-white rounded-md'>
            <div className='flex justify-between items-center'>
              <p className='font-bold'>{file.name}</p>
              <button onClick={() => setFile(null)}>
                <XMarkIcon className='w-6' />
              </button>
            </div>
            <div className='flex justify-center items-center mt-8'>
              <button
                onClick={sendFile}
                className='bg-primary py-2 px-8 text-white mt-8 rounded-md font-bold uppercase w-full'
              >
                Enviar archivo
              </button>
            </div>
            <div className='mt-4 space-y-3'>
              {uploadedSuccess && (
                <p className='text-green-500 font-bold'>{uploadedSuccess}</p>
              )}
              {errors.map((error, index) => (
                <p key={index} className='text-red-500 font-bold'>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
          <div className=' text-center p-24 border-4 border-dashed'>
            <h4 className='text-4xl font-bold'>Carga Masiva de Imágenes</h4>
            <button
              onClick={() => inputFileRef.current?.click()}
              className='bg-primary py-2 px-8 text-white mt-8 rounded-md font-bold'
            >
              SUBIR ZIP
            </button>
            <input
              onChange={handleFileChange}
              ref={inputFileRef}
              type='file'
              hidden
              accept='.zip'
            />
          </div>
        </div>
      )}
    </>
  );
}
