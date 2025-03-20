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
    sendResponse(result ? { result } : { error: 'Error generating summary' });
  } catch (error) {
    sendResponse(handleError(error));
  }
};

export const messageHandlers: Record<string, MessageHandler> = {
  [MessageType.GENERATE_SUMMARY]: generateSummary,
};
