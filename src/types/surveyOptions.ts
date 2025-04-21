export type TAnswerOption = {
  text: string;
  questionId?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  order?: number;
};

export type TAnswerOptionForm = Omit<TAnswerOption, 'id'>;
