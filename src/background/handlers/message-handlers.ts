import { LLMServiceInstance } from '../../services/llm';
import {
  MessageRequest,
  MessageResponse,
  MessageType,
} from '../../shared/types/messages';
import { handleError } from '../../shared/error-handler';

type MessageHandler = (
  message: MessageRequest,
  sendResponse: (response: MessageResponse) => void
) => Promise<void> | void;

const generateSummary = async (
  message: MessageRequest,
  sendResponse: (response: MessageResponse) => void
): Promise<void> => {
  try {
    const result = await LLMServiceInstance.generateSummary(
      message.prompt ?? ''
    );

    if (result) {
      sendResponse({ result });
    }
  } catch (error) {
    const { errorMessage } = handleError(error);
    sendResponse({ error: errorMessage });
  }
};

const checkActiveTab = (
  _: MessageRequest,
  sendResponse: (response: MessageResponse) => void
): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (tab.url?.endsWith('.pdf')) {
      sendResponse({ isPdf: true, url: tab.url });
    } else {
      sendResponse({ isPdf: false });
    }
  });
};

export const messageHandlers: Record<string, MessageHandler> = {
  [MessageType.GENERATE_SUMMARY]: generateSummary,
  [MessageType.CHECK_ACTIVE_TAB]: checkActiveTab,
};
