'use client';

import { getSurveyQuestion } from '@/src/api/SurveyQuestionApi';
import EditSurveyQuestionWrapper from '@/src/components/admin/surveys/questions/EditSurveyQuestionWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { TSurveyQuestion } from '@/src/types/question';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSurveyQuestion() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<TSurveyQuestion | null>(null);

  useEffect(() => {
    getSurveyQuestion(id).then((item) => setData(item));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditSurveyQuestionWrapper surveyQuestion={data} />;
}
