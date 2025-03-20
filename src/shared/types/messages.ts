export enum MessageType {
  GENERATE_SUMMARY = 'GENERATE_SUMMARY',
  CHECK_ACTIVE_TAB = 'CHECK_ACTIVE_TAB',
}

export interface MessageRequest {
  type: MessageType;
  prompt?: string;
}
