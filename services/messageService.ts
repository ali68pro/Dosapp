import { Message } from '../types';

const CONVERSATIONS_KEY = 'mockConversations';

// A mock message service using localStorage
const getConversations = (): Record<string, Message[]> => {
  const conversations = localStorage.getItem(CONVERSATIONS_KEY);
  return conversations ? JSON.parse(conversations) : {};
};

const saveConversations = (conversations: Record<string, Message[]>) => {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
};

const getConversationKey = (userId1: string, userId2: string): string => {
  // Sort IDs to ensure the key is consistent regardless of sender/receiver order
  return [userId1, userId2].sort().join('_');
};

export const getMessages = (userId1: string, userId2: string): Message[] => {
  if (!userId1 || !userId2) return [];
  const conversations = getConversations();
  const key = getConversationKey(userId1, userId2);
  return conversations[key] || [];
};

export const addMessage = (message: Message): Message => {
  const conversations = getConversations();
  const key = getConversationKey(message.senderId, message.recipientId);
  if (!conversations[key]) {
    conversations[key] = [];
  }
  conversations[key].push(message);
  saveConversations(conversations);
  return message;
};