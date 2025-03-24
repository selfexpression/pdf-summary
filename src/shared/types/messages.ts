export enum MessageType {
  GENERATE_SUMMARY = 'GENERATE_SUMMARY',
  CHECK_ACTIVE_TAB = 'CHECK_ACTIVE_TAB',
}

export interface MessageRequest {
  type: MessageType;
  prompt?: string;
}

export type SummaryResponse = {
  result?: string;
  error?: string;
};

export type CheckActiveTabResponse = {
  isPdf?: boolean;
  url?: string;
};

export type MessageResponse = SummaryResponse & CheckActiveTabResponse;
