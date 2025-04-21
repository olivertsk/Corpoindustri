import { makePost } from '../config/fetch';
import { TAnswerOption, TAnswerOptionForm } from '../types/surveyOptions';

export const createSurveyAnswerOption = async (data: TAnswerOptionForm) => {
  try {
    return await makePost('/surveyAnswerOptions/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteSurveyAnswerOption = async (id: TAnswerOption['id']) => {
  try {
    return await makePost(`/surveyAnswerOptions/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const updateSurveyAnswerOption = async ({
  id,
  data,
}: {
  id: string;
  data: TAnswerOptionForm;
}) => {
  try {
    return await makePost(`/surveyAnswerOptions/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
