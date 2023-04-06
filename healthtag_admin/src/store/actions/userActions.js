import { CHATS, LOGGED_USER_DETAILS, NOTIFICATION, SELECTED_CHAT } from "../types";

export const saveUserDetails = (payload) => {
  return {
    type: LOGGED_USER_DETAILS,
    payload,
  };
};

export const saveSelectedChat = (payload) => {
  return {
    type: SELECTED_CHAT,
    payload,
  };
};

export const saveChats = (payload) => {
  return {
    type: CHATS,
    payload,
  };
};

export const saveNotification = (payload) => {
  return {
    type: NOTIFICATION,
    payload,
  };
};
