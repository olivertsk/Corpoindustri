'use client';

import { getSurvey } from '@/src/api/SurveyApi';
import EditSurveyWrapper from '@/src/components/admin/surveys/EditSurveyWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { TSurvey } from '@/src/types/survey';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSurvey() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<TSurvey | null>(null);
  useEffect(() => {
    getSurvey(id).then((item) => setData(item));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditSurveyWrapper survey={data} />;
}
