import { MessageType, MessageRequest } from '../shared/types/messages';

chrome.runtime.onMessage.addListener(
  (message: MessageRequest, _, sendResponse) => {
    if (message.type === MessageType.CHECK_ACTIVE_TAB) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.url?.endsWith('.pdf')) {
          sendResponse({ isPdf: true, url: tab.url });
        } else {
          sendResponse({ isPdf: false });
        }
      });

      return true;
    }
  }
);
