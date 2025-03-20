export enum MessageType {
  GENERATE_SUMMARY = 'GENERATE_SUMMARY',
  CHECK_ACTIVE_TAB = 'CHECK_ACTIVE_TAB',
}

export interface MessageRequest {
  type: MessageType;
  prompt?: string;
}

export interface MessageResponse {
  result?: string | Record<string, any>;
  error?: string;
  text?: string;
  isPdf?: boolean;
  url?: string;
}
