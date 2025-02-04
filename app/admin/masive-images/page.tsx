'use client';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ProgressBar from '@ramonak/react-progress-bar';
import { apiUrl } from '@/src/lib/global';

export default function MasiveImagesPage() {
  useBreadcrumb('Carga Masiva');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadedSuccess, setUploadedSuccess] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);

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
        const request = new XMLHttpRequest();
        request.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(progress);
          }
        };

        request.open('POST', `${apiUrl}/A2/upload`);
        request.send(formData);

        request.onload = () => {
          if (request.status === 200) {
            const res = JSON.parse(request.responseText);
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
              toast.success('Archivo subido correctamente.');
            }
            setUploadProgress(0);
          } else {
            console.error('Error al subir el archivo:', request.statusText);
          }
        };

        request.onerror = (error) => {
          console.log(error);
          console.error('Error de red al subir el archivo.');
        };
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const uploadNewFile = () => {
    setFile(null);
    setErrors([]);
    setUploadedSuccess('');
  };

  return (
    <>
      {file ? (
        <div className='min-h-[calc(100vh-200px)] flex items-center mx-auto max-w-lg mt-8'>
          <div className='w-full shadow-md p-6 bg-white rounded-md'>
            <div className='flex justify-between items-center'>
              <p className='font-bold'>{file.name}</p>
              {!uploadProgress && (
                <button onClick={uploadNewFile}>
                  <XMarkIcon className='w-6' />
                </button>
              )}
            </div>
            <div className='flex justify-center items-center mt-8 flex-wrap'>
              <div className='w-full'>
                {uploadProgress > 0 && (
                  <ProgressBar
                    labelAlignment='center'
                    completed={uploadProgress}
                  />
                )}
              </div>
              {!uploadProgress && (
                <button
                  onClick={sendFile}
                  className='bg-primary py-2 px-8 text-white mt-8 rounded-md font-bold uppercase w-full'
                >
                  Enviar archivo
                </button>
              )}
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
