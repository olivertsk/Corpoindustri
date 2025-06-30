import { getSuggestionById } from '@/src/api/SuggestionApi';
import { normalizeDateWithTime } from '@/src/utils/normalizeDate';
import { Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SuggestionDetail() {
  const searchParams = useSearchParams();
  const suggestionId = searchParams.get('id');
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getSuggestionById(suggestionId!),
    queryKey: ['suggestion', suggestionId],
    enabled: suggestionId !== null,
  });

  return (
    <Dialog
      open={!!data}
      onClose={() => router.push('/admin/suggestions')}
      maxWidth='sm'
      fullWidth={true}
    >
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Detalle de Sugerencia</h2>
        {data ? (
          <>
            <p className='mb-2'>
              <strong>Fecha:</strong> {normalizeDateWithTime(data.createdAt)}
            </p>
            <p className='mb-2'>
              <strong>Razon:</strong> {data.title}
            </p>
            <p className='mb-4'>
              <strong>Descripción:</strong> {data.description}
            </p>
          </>
        ) : (
          <p>Cargando...</p>
        )}
        <button
          onClick={() => router.push('/admin/suggestions')}
          className='bg-primary text-white py-2 px-4 rounded hover:bg-primary/80 transition-colors'
        >
          Cerrar
        </button>
      </div>
    </Dialog>
  );
}
