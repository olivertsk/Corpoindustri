'use client';

import AllStoredChats from '@/src/components/admin/chat/AllStoredChats';
import CreateChatStructure from '@/src/components/admin/chat/CreateChatStructure';
import { useState } from 'react';

type SegmentValues = 'all' | 'chat';

const segments: { name: string; value: SegmentValues }[] = [
  { name: 'Ver todos los chats', value: 'all' },
  { name: 'Editar/Crear chat', value: 'chat' },
];

export default function ChatPage() {
  const [segment, setSegment] = useState<SegmentValues>('all');

  return (
    <>
      <div className='max-w-3xl mx-auto space-x-4'>
        {segments.map((button) => (
          <button
            className={`${
              segment === button.value ? 'text-primary' : 'text-primary/50'
            } py-2  transition-colors`}
            key={button.value}
            onClick={() => setSegment(button.value)}
          >
            {button.name}
          </button>
        ))}
      </div>
      {segment === 'chat' && <CreateChatStructure />}
      {segment === 'all' && <AllStoredChats />}
    </>
  );
}
