import { makeGet, makePost } from '@/src/config/fetch';
import {
  ESurveyType,
  TSurvey,
  TSurveyFilter,
  TSurveyForm,
} from '../types/survey';
import { Meta } from '../types';
import { User } from '../types/user';
import { TSurveyQuestion } from '../types/question';
import { TAnswerOption } from '../types/surveyOptions';

export const fxAllSurvey = async (parameters?: TSurveyFilter) => {
  try {
    const response = await makeGet(`/surveys/all`, parameters);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurveys = async (
  parameters: TSurveyFilter
): Promise<{
  meta: Meta;
  data: TSurvey[];
}> => {
  try {
    const response = await makeGet(`/surveys/all`, parameters);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurvey = async (id: string): Promise<TSurvey> => {
  try {
    return await makeGet(`/surveys/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createSurvey = async (data: TSurveyForm) => {
  try {
    return await makePost('/surveys/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteSurvey = async (id: TSurvey['id']) => {
  try {
    return await makePost(`/surveys/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const updateSurvey = async ({
  id,
  data,
}: {
  id: string;
  data: TSurveyForm;
}) => {
  try {
    return await makePost(`/surveys/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};

export const getSurveyByType = async (type: TSurvey['type']) => {
  try {
    return await makeGet(`/surveys/leftSurvey`, {
      type,
    });
  } catch (error) {
    throw error;
  }
};

// ENVIAR RESPUESTAS

export type TAnswers = {
  surveyId: string;
  questionId: string;
  answerOptionId?: string;
  text?: string;
};

export type AnswerQuestion = {
  answers: TAnswers[];
};

export type AnswerBody = {
  surveyId: string;
  email?: string;
  name?: string;
  phone?: string;
  responses: TAnswers[];
};

export const sendAnswers = async (data: AnswerBody) => {
  try {
    return await makePost('/surveyResponses/create', data);
  } catch (error) {
    throw error;
  }
};

export const getClientSurvey = async (type: ESurveyType) => {
  const res: { data: { id: string }[] } = await getSurveyByType(type);
  if (res.data[0]) {
    return res.data[0].id;
  }
};

export type TSurveyListParams = {
  pag: number;
  title: string;
};

export type TSurveyList = {
  id: string;
  survey: TSurvey;
  user: User;
  responses: TSurveyResponse[];
};

export type TSurveyResponse = {
  id: string;
  questionId?: string;
  question?: TSurveyQuestion;
  text: string;
  answerOptionId?: string;
  answerOption?: TAnswerOption;
};

export const getSurveyList = async (
  params: TSurveyListParams
): Promise<{ data: TSurveyList[]; meta: Meta }> => {
  try {
    return await makeGet('/surveyResponses/all', params);
  } catch (error) {
    throw error;
  }
};

export const getSurveyResponse = async (id: string): Promise<TSurveyList> => {
  try {
    return await makeGet(`/surveyResponses/show/${id}`);
  } catch (error) {
    throw error;
  }
};
