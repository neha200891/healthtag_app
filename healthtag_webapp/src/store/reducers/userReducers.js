import { ADD_CATEGORY, BUY_NOW, CART_ITEMS, LOGGED_USER_DETAILS, OPEN_CART, SAVE_ORDER } from "../types";
const initialState = {
  userDetails: {},
  categories: [],
  cart: [],
  cartOpen: false,
  buyNow: null,
  orderId: null,
};
const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case CART_ITEMS:
      return {
        ...state,
        cart: action.payload,
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    case BUY_NOW:
      return {
        ...state,
        buyNow: action.payload,
      };
    case SAVE_ORDER:
      return {
        ...state,
        orderId: action.payload,
      };
    default:
      return state;
  }
};
export default userReducers;
