import { CHATS, LOGGED_USER_DETAILS, NOTIFICATION, SELECTED_CHAT } from "../types";
const initialState = {
  userDetails: {},
  selectedChat: {},
  chats: [],
  notification: [],
};
const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
    case CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};
export default userReducers;
