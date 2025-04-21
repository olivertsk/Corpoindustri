'use client';

import QuestionIndex from '@/src/components/admin/surveys/questions/QuestionIndex';
import SurveyIndex from '@/src/components/admin/surveys/SurveyIndex';
import { useEffect, useState } from 'react';

const segmentButtonStyles =
  'w-full bg-gray-200 p-4 hover:bg-gray-300 uppercase';
const selectedSegmentButtonStyles = '!bg-gray-300 font-bold';

export default function SurveyPage() {
  const [segment, setSegment] = useState<'survey' | 'questions' | 'answers'>(
    'survey'
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const segmentParam = queryParams.get('segment') as
      | 'survey'
      | 'questions'
      | 'answers';
    if (segmentParam) {
      setSegment(segmentParam);
    }
    console.log('segmentParam :>> ', segmentParam);
  }, []);

  // useEffect(() => {
  //   if (segmentParam) {
  //     console.log('segmentParam :>> ', segmentParam);
  //     setSegment(segmentParam);
  //   }
  // }, [segmentParam]);

  return (
    <section>
      <div className='flex mb-4 rounded-md overflow-hidden'>
        <button
          className={`${segmentButtonStyles} ${
            segment === 'survey' && selectedSegmentButtonStyles
          }`}
          onClick={() => setSegment('survey')}
        >
          Encuestas
        </button>
        <button
          className={`${segmentButtonStyles} ${
            segment === 'questions' && selectedSegmentButtonStyles
          }`}
          onClick={() => setSegment('questions')}
        >
          Preguntas
        </button>
        <button
          className={`${segmentButtonStyles} ${
            segment === 'answers' && selectedSegmentButtonStyles
          }`}
          onClick={() => setSegment('answers')}
        >
          Respuestas
        </button>
      </div>
      {segment === 'survey' && <SurveyIndex />}
      {segment === 'questions' && <QuestionIndex />}
    </section>
  );
}
