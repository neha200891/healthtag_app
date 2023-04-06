export const ProductEndPoints = {
  getCategories: "product/getCategories",
  getCategoriesDetails: "product/getCategoriesDetails",
  getProducts: "product/getProducts",
  productDetail: "product/productDetail",
  addTocart: "product/addToCart",
  changeProductQuantity: "product/changeProductQuantity",
  removeItemFromCart: "product/removeItemFromCart",
  getMyCart: "product/getMyCart",
  checkoutCartItems: "product/checkoutCartItems",
  buyNowProduct: "product/buyNowProduct",
  getMyOrders: "product/getMyOrders",
  clearMyCart: "product/clearMyCart",
  changeOrderStatus: "product/changeOrderStatus",
};

export const UserEndPoints = {
  webLogin: "auth/webLogin",
  webSignup: "auth/signup-web",
  addAddress: "user/addUserAddress",
  editUserAddress: "user/editUserAddress",
  deleteMyAddress: "user/deleteMyAddress",
  getMyAddress: "user/getMyAddresses",
  editProfile: "user/editProfile",
  addPaymentMethod: "user/addPaymentMethod",
  getMyPaymentMethods: "user/getMyPaymentMethods",
  removePaymentMethod: "user/removePaymentMethod",
  forgotPassword: "auth/forgotPassword",
  checkforgotOtp: "auth/checkforgotOtp",
  resetPassword: "auth/resetPassword",
};

export const ContentEndPoints = {
  getAllBlogs: "content/getAllBlogs",
  getBlogDetails: "content/getBlogDetails",
};
