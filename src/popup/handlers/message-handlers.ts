import {
  MessageRequest,
  MessageType,
  MessageResponse,
} from '../../shared/types/messages';

const sendMessage = async <T>(message: MessageRequest): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else if (response.error) {
        reject(new Error(response.error));
      } else {
        resolve(response);
      }
    });
  });
};

const checkActiveTab = (): Promise<MessageResponse> => {
  return sendMessage<MessageResponse>({
    type: MessageType.CHECK_ACTIVE_TAB,
  });
};

const generateSummary = async (text: string): Promise<MessageResponse> => {
  return await sendMessage<MessageResponse>({
    type: MessageType.GENERATE_SUMMARY,
    prompt: text,
  });
};

export const messageHandlers = {
  sendMessage,
  checkActiveTab,
  generateSummary,
};
