'use client';

import { useAuthStore } from '@/src/store/authStore';
import { useEffect, useState } from 'react';
import { getClientSurvey } from '@/src/api/SurveyApi';
import { ESurveyType, TSurvey } from '@/src/types/survey';
import SurveyWrapper from './SurveyWrapper';

export default function ShowClientSurvey() {
  const from = useAuthStore((state) => state.from);
  const setFrom = useAuthStore((state) => state.setFrom);
  const [surveyId, setSurveyId] = useState<TSurvey['id']>(undefined);

  useEffect(() => {
    if (from) {
      const getSurvey = async () => {
        if (from === 'register') {
          const surveyId = await getClientSurvey(ESurveyType.REGISTER);
          setSurveyId(surveyId);
        }
        setFrom(undefined);
      };
      getSurvey();
    }
  }, [from]);

  return <SurveyWrapper surveyId={surveyId} setSurveyId={setSurveyId} />;
}
