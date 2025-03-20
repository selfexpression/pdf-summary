import { MessageRequest, MessageType } from '../../shared/types/messages';

export interface CheckActiveTabResponse {
  isPdf: boolean;
  url?: string;
}

export interface SummaryResponse {
  result?: string;
  error?: string;
}

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

const checkActiveTab = (): Promise<CheckActiveTabResponse> => {
  return sendMessage<CheckActiveTabResponse>({
    type: MessageType.CHECK_ACTIVE_TAB,
  });
};

const generateSummary = async (text: string): Promise<SummaryResponse> => {
  return await sendMessage<SummaryResponse>({
    type: MessageType.GENERATE_SUMMARY,
    prompt: text,
  });
};

export const messageHandlers = {
  sendMessage,
  checkActiveTab,
  generateSummary,
};
