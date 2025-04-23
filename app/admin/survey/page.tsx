'use client';

import SurveyIndex from '@/src/components/admin/surveys/SurveyIndex';
import SurveyList from '@/src/components/admin/surveys/SurveyList';
import { useState } from 'react';

export default function SurveyPage() {
  const [segment, setSegment] = useState<'create' | 'list'>('create');

  return (
    <section>
      <div className='flex justify-center  items-center'>
        <button
          onClick={() => setSegment('create')}
          className={
            'bg-gray-200 w-full py-4 hover:bg-gray-300 ' +
            (segment === 'create' ? '!bg-gray-300' : '')
          }
        >
          Crear Encuesta
        </button>
        <button
          onClick={() => setSegment('list')}
          className={
            'bg-gray-200 w-full py-4 hover:bg-gray-300 ' +
            (segment === 'list' ? '!bg-gray-300' : '')
          }
        >
          Respuestas de la encuesta
        </button>
      </div>
      {segment === 'create' && <SurveyIndex />}
      {segment === 'list' && <SurveyList />}
    </section>
  );
}
