import { GetDataWithToken, PostDataWithToken } from "../../apis/apiHelper";
import { ProductEndPoints } from "./endpoints";

export const getCategories = async () => {
  try {
    const response = GetDataWithToken(ProductEndPoints.getCategories);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoriesDetails = async (id) => {
  try {
    const response = GetDataWithToken(ProductEndPoints.getCategoriesDetails + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (query) => {
  try {
    const response = GetDataWithToken(`${ProductEndPoints.getProducts}?${query}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = GetDataWithToken(`${ProductEndPoints.productDetail}/${productId}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleAddToCart = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.addTocart, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleChangeProdudctQTY = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.changeProductQuantity, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromCart = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.removeItemFromCart, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const clearMyCart = () => {
  try {
    const response = GetDataWithToken(ProductEndPoints.clearMyCart, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMyCart = () => {
  try {
    const response = GetDataWithToken(ProductEndPoints.getMyCart, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const checkoutCartItems = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.checkoutCartItems, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleBuyNowItem = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.buyNowProduct, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const changeOrderStatus = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.changeOrderStatus, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMyOrders = () => {
  try {
    const response = GetDataWithToken(ProductEndPoints.getMyOrders, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const PostReview = (data) => {
  try {
    const response = PostDataWithToken(ProductEndPoints.AddUserReview, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
