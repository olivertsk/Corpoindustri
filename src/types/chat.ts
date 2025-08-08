export type ChatData = {
  chatQuestions: ChatQuestion[];
};

export type ChatQuestion = {
  id?: string;
  name: string;
  chatAnswerId?: ChatAnswer['id'];
  chatQuestionId?: ChatQuestion['id'];
  type: 'options' | 'text' | 'search';
  options?: ChatAnswer[];
};

export type ChatAnswer = {
  id?: string;
  name: string;
  chatQuestionId?: ChatQuestion['id'];
  autoResponse?: string;
  chatQuestion?: ChatQuestion;
  answerType?: 'text' | 'question' | 'none';
  addAnAutoResponse?: boolean;
};
