import { EConversationStatus, getConversations } from '@/src/api/ChatApi';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../spinner/Spinner';
import { Pagination } from '@mui/material';
import Link from 'next/link';
import { normalizeDateWithTime } from '@/src/utils/normalizeDate';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

export default function AllStoredChats() {
  useBreadcrumb('Chat', 'Todas las solicitudes');

  const [filters, setFilters] = useState({
    pag: 1,
  });
  const { data, isLoading } = useQuery({
    queryKey: ['conversations', filters],
    queryFn: () => getConversations(filters),
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
  };

  console.log('data', data);

  if (isLoading) return <Spinner />;
  if (data)
    return (
      <div className='max-w-3xl mx-auto'>
        {data.data.map((conversation) => (
          <div
            key={conversation.id}
            className='border-b border-gray-200 py-4 flex justify-between items-center'
          >
            <div>
              <h3 className='text-lg font-semibold'>
                {conversation.status === EConversationStatus.ACTIVE
                  ? 'Nueva solicitud'
                  : 'Solicitud existente'}
              </h3>
              <p className='text-sm text-gray-500'>
                <b>Usuario:</b>{' '}
                {conversation.user
                  ? `${conversation.user.name} ${conversation.user.lastName}`
                  : 'Desconocido'}
              </p>
              <p className='text-sm text-gray-500'>
                <b>Revisado por:</b>{' '}
                {conversation.responsible
                  ? `${conversation.responsible.name} ${conversation.responsible.lastName}`
                  : 'Desconocido'}
              </p>
              <p className='text-sm text-gray-500 mt-2'>
                <b>Solicitud enviada el:</b>{' '}
                {normalizeDateWithTime(conversation.createdAt)}
              </p>
              <p className='text-sm text-gray-500'>
                <b>Solicitud abierta el:</b>{' '}
                {conversation.viewTime && conversation.viewTime !== '1'
                  ? normalizeDateWithTime(conversation.viewTime)
                  : 'N/A'}
              </p>
            </div>
            <Link
              href={`/admin/chat/${conversation.id}`}
              className='bg-primary text-white p-3 px-6 rounded-md hover:bg-primary/80 transition-colors'
            >
              Revisar
            </Link>
          </div>
        ))}
        <div className='flex justify-center mt-8'>
          <Pagination
            count={data.meta.totalPage}
            page={data.meta.actualPage}
            onChange={(ev, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    );
}
