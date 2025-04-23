'use client';

import { getSurveyResponse } from '@/src/api/SurveyApi';
import Spinner from '@/src/components/spinner/Spinner';
import { ESurveyQuestionType } from '@/src/types/question';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SurveyResponse() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => getSurveyResponse(id),
  });

  console.log('data :>> ', data);

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <div>
        <Link href={'/admin/survey'} className='flex items-center gap-2 mb-4'>
          <ArrowLeftIcon className='h-4 w-4 text-slate-500 hover:text-slate-700 transition-all duration-200' />
          Volver
        </Link>
        <h2 className='font-bold text-2xl'>{data.survey.title}</h2>
        <p className='font-semibold text-slate-500 mb-6'>Respuestas</p>
        <div className='space-y-2'>
          {data.responses.map((response, idx) => (
            <div
              key={response.id}
              className='border-2 px-4 border-slate-200 rounded-md py-2'
            >
              <p className='font-semibold text-slate-500'>
                {idx + 1}. {response.question?.text}
              </p>
              {response.question?.type === ESurveyQuestionType.TEXT && (
                <p>
                  <span className='font-bold'>
                    {data.user.name} {data.user.lastName}:
                  </span>{' '}
                  {response.text}
                </p>
              )}
              {response.question?.type === ESurveyQuestionType.SELECTION && (
                <p>
                  <span className='font-bold'>
                    {data.user.name} {data.user.lastName}:
                  </span>{' '}
                  {response.answerOption?.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}
