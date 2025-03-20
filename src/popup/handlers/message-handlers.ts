import {
  MessageRequest,
  MessageType,
  MessageResponse,
} from '../../shared/types/messages';

const sendMessage = async <T>(message: MessageRequest): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response);
      }
    });
  });
};

const checkActiveTab = (): Promise<MessageResponse> => {
  return sendMessage({ type: MessageType.CHECK_ACTIVE_TAB });
};

const generateSummary = async (text: string): Promise<string> => {
  return await sendMessage({
    type: MessageType.GENERATE_SUMMARY,
    prompt: text,
  });
};

export const messageHandlers = {
  sendMessage,
  checkActiveTab,
  generateSummary,
};
