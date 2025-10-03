import { Message } from '../types';

const MESSAGES_DB_KEY = 'oglasisrbija_messages_db';

/**
 * Retrieves the list of all messages from localStorage.
 * @returns An array of Message objects.
 */
const getAllMessages = (): Message[] => {
  try {
    const messagesJson = localStorage.getItem(MESSAGES_DB_KEY);
    return messagesJson ? (JSON.parse(messagesJson) as Message[]) : [];
  } catch (error) {
    console.error("Failed to parse messages from storage", error);
    return [];
  }
};

/**
 * Saves a list of messages to localStorage.
 * @param messages The array of Message objects to save.
 */
const saveAllMessages = (messages: Message[]): void => {
  localStorage.setItem(MESSAGES_DB_KEY, JSON.stringify(messages));
};

/**
 * Adds a new message to the database.
 * @param listingId The ID of the listing related to the message.
 * @param content The text content of the message.
 * @param senderId The ID of the user sending the message.
 * @param receiverId The ID of the user receiving the message.
 * @returns A promise that resolves with the newly created Message object.
 */
export const addMessage = (listingId: string, content: string, senderId: string, receiverId: string): Promise<Message> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const allMessages = getAllMessages();
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        listingId,
        content,
        senderId,
        receiverId,
        sentAt: new Date().toISOString(),
      };
      const updatedMessages = [newMessage, ...allMessages];
      saveAllMessages(updatedMessages);
      console.log('New message saved:', newMessage);
      resolve(newMessage);
    }, 800);
  });
};
