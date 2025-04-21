import { TSurveyQuestion } from './question';

export enum ESurveyType {
  FIRSTPURCHASE = 'firstPurchase',
  REGISTER = 'register',
}

export const surveyTypeDictionary = {
  [ESurveyType.FIRSTPURCHASE]: 'Primera compra',
  [ESurveyType.REGISTER]: 'Registro',
};

export type TSurvey = {
  id?: string;
  title: string;
  description: string;
  type?: ESurveyType | null;
  questions?: TSurveyQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type TSurveyForm = Omit<
  TSurvey,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type TSurveyFilter = {
  pag: number;
  title: string;
};
