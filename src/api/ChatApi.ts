import { makeGet, makePost } from '../config/fetch';
import { ChatData, ChatQuestion } from '../types/chat';

export const createChat = async (data: ChatData) => {
  try {
    return await makePost('/chatQuestions/create', data);
  } catch (error) {
    throw error;
  }
};

export const getChat = async (): Promise<ChatQuestion> => {
  try {
    return await makeGet('/chatQuestions/show');
  } catch (error) {
    throw error;
  }
};
