import { makeGet, makePost } from '@/src/config/fetch';
import { Meta } from '../types';
import {
  TSurveyQuestion,
  TSurveyQuestionFilter,
  TSurveyQuestionForm,
} from '../types/question';

export const fxAllQuestionSurveyQuestion = async (
  parameters: TSurveyQuestionFilter
) => {
  try {
    const response = await makeGet(`/surveyQuestions/all`, parameters);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionSurveyQuestions = async (
  parameters: TSurveyQuestionFilter
): Promise<{
  meta: Meta;
  data: TSurveyQuestion[];
}> => {
  try {
    const response = await makeGet(`/surveyQuestions/all`, parameters);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurveyQuestion = async (
  id: string
): Promise<TSurveyQuestion> => {
  try {
    return await makeGet(`/surveyQuestions/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createSurveyQuestion = async (data: TSurveyQuestion) => {
  try {
    return await makePost('/surveyQuestions/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteSurveyQuestion = async (id: TSurveyQuestion['id']) => {
  try {
    return await makePost(`/surveyQuestions/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const updateSurveyQuestion = async ({
  id,
  data,
}: {
  id: string;
  data: TSurveyQuestionForm & { id: string };
}) => {
  try {
    return await makePost(`/surveyQuestions/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
