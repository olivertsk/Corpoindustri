import { createConversation, getClientChat } from '@/src/api/ChatApi';
import {
  ChatAnswer,
  ChatQuestion,
  ResponseChatClient,
  ResponseChatFilters,
} from '@/src/types/chat';
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from '../spinner/Spinner';
import Logo from '../Logo';
import { useEffect, useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

type InitChatProps = {
  initChat: boolean;
};

export default function InitChat({ initChat }: InitChatProps) {
  const [finishedChatByMessage, setFinishedChatByMessage] = useState(false);
  const [filter, setFilters] = useState<ResponseChatFilters>({
    chatQuestionId: null,
    chatAnswerId: null,
  });

  const { data, isLoading } = useQuery<ChatQuestion>({
    queryKey: ['conversation_client', filter],
    queryFn: () => getClientChat(filter),
    enabled: initChat,
  });

  const [sendChat, setSendChat] = useState<boolean>(false);
  const [allChat, setAllChat] = useState<ResponseChatClient[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setAllChat((prev) => [
        ...prev,
        { from: 'bot', message: '', chatQuestion: data },
      ]);
    }
  }, [data]);

  useEffect(() => {
    // Scroll bottom
    setTimeout(() => {
      messagesContainer.current?.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  }, [allChat]);

  const handleUserResponseFromOption = (option: ChatAnswer, index: number) => {
    console.log('option', option);
    setAllChat((prev) => {
      const userResponse = [
        {
          from: 'user',
          message: option.name,
          selectedOption: option,
        },
      ] as ResponseChatClient[];

      if (option.autoResponse) {
        console.log('option.autoResponse', option.autoResponse);
        userResponse.push({
          from: 'bot',
          message: option.autoResponse,
          selectedOption: option,
          chatQuestion: {
            name: option.autoResponse,
            type: 'text',
          },
        });
      }
      return [
        ...prev.map((chat, i) =>
          i === index
            ? { ...chat, isAnswered: true, message: option.name }
            : chat
        ),
        ...userResponse,
      ];
    });
    setFilters({
      chatQuestionId: option.chatQuestionId,
      chatAnswerId: option.id,
    });
  };

  const resetChats = () => {
    setFilters({
      chatQuestionId: null,
      chatAnswerId: null,
    });
    setSendChat(false);
    setFinishedChatByMessage(false);
    setAllChat([]);
  };

  const saveMessage = () => {
    const message = messageInputRef.current?.value;
    if (!message) return;

    const newChats = allChat.map((chat, i) => {
      console.log(i, allChat.length - 1);
      if (i === allChat.length - 1) {
        return { ...chat, isAnswered: true, message };
      }
      return chat;
    });

    setAllChat([...newChats, { from: 'user', message: message }]);
    setFinishedChatByMessage(true);
    setSendChat(true);
    messageInputRef.current.value = '';
  };

  const { mutate } = useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      // resetChats();
    },
  });

  const handleSendChat = () => {
    const copyAllChat = [...allChat];
    mutate(
      copyAllChat.map((chat, index) => {
        chat.index = index;
        return chat;
      })
    );
  };

  useEffect(() => {
    if (sendChat) {
      handleSendChat();
    }
  }, [sendChat]);

  useEffect(() => {
    if (data === null) handleSendChat();
  }, [data]);

  if (allChat.length === 0 && isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <Spinner />
        <span className='text-xs text-center text-slate-400'>
          Iniciando chat...
        </span>
      </div>
    );
  }

  if (allChat.length > 0)
    return (
      <div className='flex flex-col h-full'>
        <div
          className='px-4 py-8 flex flex-col gap-4 flex-1 overflow-auto'
          ref={messagesContainer}
        >
          {allChat.map((data, index) =>
            data.from === 'bot' ? (
              <div key={data.chatQuestion?.id} className='flex gap-4'>
                <div className='min-w-[30px] max-w-[30px] h-[30px] rounded-full border flex justify-center items-center'>
                  <Logo />
                </div>
                <div>
                  <div>
                    <div className='bg-gray-100 p-2 rounded-md px-4 w-fit'>
                      <h4>{data.chatQuestion?.name}</h4>
                    </div>
                    {data.chatQuestion?.options !== undefined &&
                      data.chatQuestion?.options?.length > 0 &&
                      !data.isAnswered && (
                        <div className='space-y-2 mt-2'>
                          {data.chatQuestion?.options?.map((option) => (
                            <button
                              key={option.id}
                              className='block w-full text-left p-2 hover:bg-primary/10 border-2 border-primary rounded-md text-primary'
                              onClick={() =>
                                handleUserResponseFromOption(option, index)
                              }
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className='self-end'>
                <div className='bg-primary/80 text-white p-2 rounded-md px-4 w-fit'>
                  <h4>
                    {data.selectedOption
                      ? data.selectedOption?.name
                      : data.message}
                  </h4>
                </div>
              </div>
            )
          )}
          {isLoading && <Spinner />}
        </div>
        {data?.type === 'text' && !finishedChatByMessage && (
          <div className='flex border-t'>
            <input
              placeholder='Escribe tu mensaje...'
              className='w-full py-3 px-4 border-none outline-none'
              type='text'
              ref={messageInputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  saveMessage();
                }
              }}
            />
            <button onClick={saveMessage} className='hover:bg-gray-100 p-2'>
              <PaperAirplaneIcon className='w-6' />
            </button>
          </div>
        )}
        {(data === null || finishedChatByMessage) && (
          <div className='p-4 flex justify-center border-t flex-col items-center gap-2'>
            <span className='text-xs text-center text-slate-400'>
              Hemos enviado su solicitud con éxito, presiona el botón si deseas
              iniciar una nueva solicitud.
            </span>
            <button
              onClick={resetChats}
              className='bg-primary text-white p-2 rounded-md w-fit shadow-md px-8'
            >
              Nueva solicitud
            </button>
          </div>
        )}
      </div>
    );
}
