'use client';

import { createChat, getChat } from '@/src/api/ChatApi';
import Questions from '@/src/components/admin/chat/Questions';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { ChatData } from '@/src/types/chat';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function ChatPage() {
  useBreadcrumb('Chat');

  const { data } = useQuery({
    queryFn: getChat,
    queryKey: ['chat_admin'],
  });

  console.log('data', data);

  const { register, control, watch, handleSubmit, setValue } =
    useForm<ChatData>({
      defaultValues: {
        chatQuestions: [
          {
            name: '',
            chatQuestionId: '',
            chatAnswerId: '',
            type: 'text',
            options: [
              {
                name: '',
                chatQuestionId: '',
                addAnAutoResponse: false,
                autoResponse: '',
              },
            ],
          },
        ],
      },
    });

  useEffect(() => {
    if (data) {
      setValue('chatQuestions', [{ ...data }]);
    }
  }, [data]);

  const { fields, remove } = useFieldArray({
    control,
    name: 'chatQuestions',
    keyName: '_id',
  });

  const { mutate } = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      console.log('Chat created successfully:', data);
    },
  });

  const save = (formData: ChatData) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(save)} className='p-8 space-y-6'>
      <div>
        <div className='max-w-3xl mx-auto space-y-4'>
          {fields.map((item, index) => (
            <Questions
              key={item._id}
              register={register}
              remove={remove}
              index={index}
              watch={watch}
              control={control}
              nameFieldArray={`chatQuestions.${index}`}
              watchQuestionTypeFieldName={`chatQuestions.${index}`}
              setValue={setValue}
              optionIndex={0}
            />
          ))}
          <div className='flex justify-between'>
            <button className='bg-primaryHover mt-4 p-2 rounded-md shadow-md flex items-center text-white hover:bg-primary-dark transition-colors'>
              <CheckIcon className='w-6 text-white' />
              <span className='text-white ml-2'>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
