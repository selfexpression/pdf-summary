import { MessageRequest, MessageType } from '../../shared/types/messages';

export interface CheckActiveTabResponse {
  isPdf: boolean;
  url?: string;
}

const sendMessage = async <T>(message: MessageRequest): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (response.error) reject(new Error(response.error));
      else resolve(response.result ?? response.text);
    });
  });
};

export const checkActiveTab = async (): Promise<CheckActiveTabResponse> => {
  return sendMessage({ type: MessageType.CHECK_ACTIVE_TAB });
};
