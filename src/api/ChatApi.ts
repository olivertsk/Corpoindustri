import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import {
  ChatData,
  ChatQuestion,
  ResponseChatClient,
  ResponseChatFilters,
} from '../types/chat';
import { User } from '../types/user';

export const createChat = async (data: ChatData) => {
  try {
    return await makePost('/chatQuestions/create', data);
  } catch (error) {
    throw error;
  }
};

export const updateChat = async ({
  chatId,
  data,
}: {
  chatId: string;
  data: ChatData;
}) => {
  try {
    return await makePost(`/chatQuestions/update/${chatId}`, data, 'PUT');
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

export const getClientChat = async (filters: ResponseChatFilters) => {
  try {
    return await makeGet('/chatQuestions/client', filters);
  } catch (error) {
    throw error;
  }
};

export const createConversation = async (data: ResponseChatClient[]) => {
  try {
    return await makePost('/conversations/create', {
      messages: data,
      status: 1,
    });
  } catch (error) {
    throw error;
  }
};

// All conversations

export type AllQueries = {
  pag: number;
};

export enum EConversationStatus {
  ACTIVE = 1,
  COMPLETED = 2,
  ARCHIVED = 3,
  PENDING_REVIEW = 4,
}

export type AllQuestionsResponse = {
  data: {
    id: string;
    status: EConversationStatus;
    userId: User['id'];
    user: Pick<User, 'name' | 'lastName'>;
    viewTime: string;
    createdAt: string;
    responsible: Pick<User, 'name' | 'lastName'>;
  }[];
  meta: Meta;
};

export const getConversations = async (
  queries: AllQueries
): Promise<AllQuestionsResponse> => {
  try {
    return await makeGet('/conversations/all', queries);
  } catch (error) {
    throw error;
  }
};

// show

export type UnparsedConversationResponse = {
  messages: {
    id: string;
    metadata: string;
    message: string;
  }[];
};

export type ConversationResponse = {
  messages: ParsedMessages[];
};

export type ParsedMessages = {
  id: string;
  metadata: {
    chatQuestion: {
      name: string;
    };
  };
  message: string;
};

export const getConversation = async (
  id: string
): Promise<ConversationResponse> => {
  try {
    const data: UnparsedConversationResponse = await makeGet(
      `/conversations/show/${id}`
    );

    const parsedData = data.messages.map((message) => {
      message.metadata = JSON.parse(message.metadata);
      return message;
    });
    console.log('parsedData', parsedData);
    return { messages: parsedData as unknown as ParsedMessages[] };
  } catch (error) {
    throw error;
  }
};
