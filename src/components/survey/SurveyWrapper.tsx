'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SurveyModal from './SurveyModal';
import { TSurvey } from '@/src/types/survey';
import { Dispatch, SetStateAction } from 'react';

const queryClient = new QueryClient();
export default function SurveyWrapper({
  surveyId,
  setSurveyId,
}: {
  surveyId?: TSurvey['id'];
  setSurveyId: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SurveyModal surveyId={surveyId} setSurveyId={setSurveyId} />
    </QueryClientProvider>
  );
}
