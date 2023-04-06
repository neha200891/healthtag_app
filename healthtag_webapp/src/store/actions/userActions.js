import { ADD_CATEGORY, BUY_NOW, CART_ITEMS, LOGGED_USER_DETAILS, OPEN_CART, SAVE_ORDER } from "../types";
import store from "../index";
import { getMyCart } from "../../components/services/productService";

export const saveUserDetails = (payload) => {
  return {
    type: LOGGED_USER_DETAILS,
    payload,
  };
};

export const saveCategories = (payload) => {
  return {
    type: ADD_CATEGORY,
    payload,
  };
};

export const addToCartAction = (payload) => {
  return {
    type: CART_ITEMS,
    payload,
  };
};

export const handleOpenCart = (payload) => {
  return {
    type: OPEN_CART,
    payload,
  };
};

export const buyNowItem = (payload) => {
  return {
    type: BUY_NOW,
    payload,
  };
};

export const saveOrderId = (payload) => {
  return {
    type: SAVE_ORDER,
    payload,
  };
};

export const openBag = () => {
  store.dispatch(handleOpenCart(true));
  getMyCart().then((response) => {
    if (response.status === true) {
      store.dispatch(addToCartAction(response.data));
    }
  });
};
