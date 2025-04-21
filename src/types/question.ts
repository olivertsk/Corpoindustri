import { TAnswerOption } from './surveyOptions';

export enum ESurveyQuestionType {
  SELECTION = 'selection',
  TEXT = 'text',
}
export const surveyQuestionTypeDictionary = {
  [ESurveyQuestionType.SELECTION]: 'Selección',
  [ESurveyQuestionType.TEXT]: 'Texto',
};

export type TSurveyQuestionFilter = {
  pag: number;
  surveyId?: string;
  text: string;
};

export type TSurveyQuestion = {
  id?: string;
  surveyId?: string;
  text: string;
  order?: number;
  type?: ESurveyQuestionType | null;
  answers?: TAnswerOption[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type TSurveyQuestionForm = Omit<
  TSurveyQuestion,
  'id' | 'createdAt' | 'updatedAt'
>;
