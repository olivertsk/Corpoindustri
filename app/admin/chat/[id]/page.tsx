'use client';

import { getConversation } from '@/src/api/ChatApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ViewChatResponse() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['chatResponse', id],
    queryFn: () => getConversation(id),
  });

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <div className='max-w-3xl mx-auto space-y-4'>
        {data.messages.map((message) => (
          <div
            key={message.id}
            className='shadow-md p-8 rounded-md bg-gray-100'
          >
            <h2>
              <span className='font-bold'> Bot:</span>{' '}
              {message.metadata.chatQuestion.name}
            </h2>
            <p>
              <span className='font-bold'> Cliente:</span> {message.message}
            </p>
          </div>
        ))}
      </div>
    );
}
