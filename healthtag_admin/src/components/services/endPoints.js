export const authEndpoints = {
  createuser: "auth/createuser",
  adminlogin: "auth/adminlogin",
  checkOtpLogin: "auth/checkOtpLogin",
  changePassword: "auth/changePassword",
  createMaster: "auth/create-master",
  createTenant: "auth/create-tenant",
  createProvidr: "auth/create-provider",
  getMaster: "auth/get-masters",
  updateProviderQRCode: "auth/updateProviderQRCode",
};

export const usersEndPoints = {
  getAllUsers: "users/getAllUsers",
  changeUserStatus: "users/changeUserStatus",
  myProfile: "user/userProfile",
  editProfile: "user/editProfile",
  getUserProfile: "users/getUserProfile",
  editUserProfile: "users/editUserProfileAdmin",
  lastLogginInUsers: "users/lastLoggedInUsers",
  letestUsers: "users/letestCreatedUser",
  deleteuser: "users/deleteUser",
  alltenents: "users/alltenents",
  allproviders: "users/allproviders",
  allTenentCustomers: "users/allTenentCustomers",
  allProviderCustomers: "users/allProviderCustomers",
  allTenentProviders: "users/tenantProviders",
  editCustomerDetails: "users/editCustomerDetails",
  editHealthProviderProfile: "users/editHealthProviderProfile",
  changeCustomerTanency: "users/changeCustomerTanency",
  getAllOrders: "users/getAllOrders",
  getOrderDetails: "users/getOrderDetails",
  changeOrderStatus: "users/changeOrderStatus",
  makeProviderAdmin: "users/makeProviderAdmin",
  addSerialNumbers: "users/addSerialNumbers",
  getUserOrders: "users/getUserOrders",
  getUserSubscription: "users/getUserSubscription",
  getUserDevices: "users/getUserDevices",
  adminDashboard: "users/admin-dashboard",
};

export const productsEndPoints = {
  addCategory: "products/add-category",
  getCategories: "products/get-categories",
  addProduct: "products/add-product",
  getProducts: "products/get-products",
  getProductDetails: "products/get-products-details",
  deleteCategory: "products/delete-category",
  deleteProduct: "products/delete-product",
  ChangeCategoryStatus: "products/change-category-status",
  ChangeProductStatus: "products/change-product-status",
  deleteProductImage: "products/delete-product-image",
  addCategoryQuestion: "products/addCategoryQuestion",
  getCategoryQuestion: "products/getCategoryQuestion",
  questionDetails: "products/questionDetails",
  editCategoryQuestion: "products/editCategoryQuestion",
  addEditQuestionOption: "products/addEditQuestionOption",
  changeQuestionStatus: "products/changeQuestionStatus",
  changeOptionStatus: "products/changeOptionStatus",
  addProductType: "products/addProductType",
  getProductTypes: "products/getProductTypes",
  deleteProductType: "products/deleteProductType",
  addServiceTax: "products/addServiceTax",
  getServiceTax: "products/getServiceTax",
};

export const contentEndPoints = {
  addEditBlog: "contents/add-blog",
  getBlogs: "contents/get-blogs",
  changeBlogStatus: "contents/change-blog-status",
  deleteBlog: "contents/change-blog-status",
};

export const supportEndpoints = {
  addTopic: "supports/addTopic",
  deleteTopic: "supports/deleteTopic",
  getTopics: "supports/getTopics",
  getAllTickets: "supports/getAllTickets",
  sendMessage: "supports/sendMessage",
  getAllTicketChats: "supports/getAllTicketChats",
  changeTicketStatus: "supports/changeTicketStatus",
};

export const subscriptionEndPoints = {
  addSubscription: "subscriptions/addPlan",
  getAllSubscriptions: "subscriptions/getAllPlans",
  deleteSubscripion: "subscriptions/deletePlan",
};
