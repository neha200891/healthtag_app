const {
  Category,
  Product,
  User,
  UserOtp,
  ProductImages,
  TenantProfile,
  ProviderProfile,
  UserAddress,
  ProviderSpecialities,
  CategoryQuestion,
  Cart,
  CartItem,
  Order,
  OrderItem,
  UserPayment,
  UserReview,
  QuestionnairesOption,
  QuestionnairesResult,
  Blog,
  SupportTicket,
  Message,
  Language,
  MyDevices,
  DeviceConnection,
  ProductSerial,
  UserReport,
  Plan,
  UserSubscription,
} = require(".");
const MyCustomers = require("./myCustomers");
const Notification = require("./notifications");
const ProductType = require("./ProductType");

exports.relation = () => {
  User.hasOne(UserOtp, { foreignKey: "userId" });
  UserOtp.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(UserAddress, { foreignKey: "userId" });
  UserAddress.belongsTo(User, { foreignKey: "userId" });

  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });

  ProductType.hasMany(Product, { foreignKey: "productTypeId" });
  Product.belongsTo(ProductType, { foreignKey: "productTypeId" });

  Product.hasMany(ProductImages, { foreignKey: "productId" });
  ProductImages.belongsTo(Product, { foreignKey: "productId" });

  User.hasMany(Notification, { foreignKey: "userId" });
  Notification.belongsTo(User, { foreignKey: "userId" });

  User.hasOne(TenantProfile, { foreignKey: "userId" });
  TenantProfile.belongsTo(User, { foreignKey: "userId" });

  User.hasOne(ProviderProfile, { foreignKey: "userId" });
  ProviderProfile.belongsTo(User, { foreignKey: "userId" });

  User.hasOne(UserPayment, { foreignKey: "userId" });
  UserPayment.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(ProviderProfile, { foreignKey: "tenantId", as: "tenant" });
  ProviderProfile.belongsTo(User, { foreignKey: "tenantId", as: "tenant" });

  User.hasMany(MyCustomers, { foreignKey: "customerId", as: "customer" });
  MyCustomers.belongsTo(User, { foreignKey: "customerId", as: "customer" });

  User.hasMany(MyCustomers, { foreignKey: "tenantId", as: "Tenant" });
  MyCustomers.belongsTo(User, { foreignKey: "tenantId", as: "Tenant" });

  User.hasMany(MyCustomers, { foreignKey: "providerId", as: "provider" });
  MyCustomers.belongsTo(User, { foreignKey: "providerId", as: "provider" });

  User.hasMany(ProviderSpecialities, { foreignKey: "userId" });
  ProviderSpecialities.belongsTo(User, { foreignKey: "userId" });

  Category.hasMany(ProviderSpecialities, { foreignKey: "categoryId" });
  ProviderSpecialities.belongsTo(Category, { foreignKey: "categoryId" });

  Category.hasMany(CategoryQuestion, { foreignKey: "categoryId" });
  CategoryQuestion.belongsTo(Category, { foreignKey: "categoryId" });

  User.hasMany(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User, { foreignKey: "userId" });

  Cart.hasMany(CartItem, { foreignKey: "cartId" });
  CartItem.belongsTo(Cart, { foreignKey: "cartId" });

  Product.hasMany(CartItem, { foreignKey: "productId" });
  CartItem.belongsTo(Product, { foreignKey: "productId" });

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  UserAddress.hasMany(Order, { foreignKey: "addressId" });
  Order.belongsTo(UserAddress, { foreignKey: "addressId" });

  UserPayment.hasMany(Order, { foreignKey: "cardId" });
  Order.belongsTo(UserPayment, { foreignKey: "cardId" });

  Order.hasMany(OrderItem, { foreignKey: "orderId" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId" });

  Product.hasMany(OrderItem, { foreignKey: "productId" });
  OrderItem.belongsTo(Product, { foreignKey: "productId" });

  User.hasMany(UserReview, { foreignKey: "userId" });
  UserReview.belongsTo(User, { foreignKey: "userId" });

  Product.hasMany(UserReview, { foreignKey: "productId" });
  UserReview.belongsTo(Product, { foreignKey: "productId" });

  CategoryQuestion.hasMany(QuestionnairesOption, { foreignKey: "questionId" });
  QuestionnairesOption.belongsTo(CategoryQuestion, { foreignKey: "questionId" });

  CategoryQuestion.hasMany(QuestionnairesResult, { foreignKey: "questionId" });
  QuestionnairesOption.belongsTo(QuestionnairesResult, { foreignKey: "questionId" });

  QuestionnairesOption.hasMany(QuestionnairesResult, { foreignKey: "optionId" });
  QuestionnairesResult.belongsTo(QuestionnairesOption, { foreignKey: "optionId" });

  User.hasMany(QuestionnairesResult, { foreignKey: "userId" });
  QuestionnairesResult.belongsTo(User, { foreignKey: "userId" });

  Category.hasMany(QuestionnairesResult, { foreignKey: "categoryId" });
  QuestionnairesResult.belongsTo(Category, { foreignKey: "categoryId" });

  Category.hasMany(Blog, { foreignKey: "categoryId" });
  Blog.belongsTo(Category, { foreignKey: "categoryId" });

  User.hasMany(SupportTicket, { foreignKey: "userId" });
  SupportTicket.belongsTo(User, { foreignKey: "userId" });

  SupportTicket.hasMany(Message, { foreignKey: "ticketId" });
  Message.belongsTo(SupportTicket, { foreignKey: "ticketId" });

  User.hasMany(Message, { foreignKey: "userId" });
  Message.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(MyDevices, { foreignKey: "userId" });
  MyDevices.belongsTo(User, { foreignKey: "userId" });

  Product.hasMany(MyDevices, { foreignKey: "productId" });
  MyDevices.belongsTo(Product, { foreignKey: "productId" });

  Language.hasMany(User, { foreignKey: "languageId", as: "Language" });
  User.belongsTo(Language, { foreignKey: "languageId", as: "Language" });

  User.hasMany(DeviceConnection, { foreignKey: "userId" });
  DeviceConnection.belongsTo(User, { foreignKey: "userId" });

  MyDevices.hasMany(DeviceConnection, { foreignKey: "deviceId" });
  DeviceConnection.belongsTo(MyDevices, { foreignKey: "deviceId" });

  OrderItem.hasMany(ProductSerial, { foreignKey: "orderItemId" });
  ProductSerial.belongsTo(OrderItem, { foreignKey: "orderItemId" });

  User.hasMany(ProductSerial, { foreignKey: "userId" });
  ProductSerial.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(UserReport, { foreignKey: "userId" });
  UserReport.belongsTo(User, { foreignKey: "userId" });

  MyDevices.hasMany(UserReport, { foreignKey: "myDeviceId" });
  UserReport.belongsTo(MyDevices, { foreignKey: "myDeviceId" });

  Product.hasMany(UserReport, { foreignKey: "productId" });
  UserReport.belongsTo(Product, { foreignKey: "productId" });

  Plan.hasMany(UserSubscription, { foreignKey: "planId" });
  UserSubscription.belongsTo(Plan, { foreignKey: "planId" });

  User.hasMany(UserSubscription, { foreignKey: "userId" });
  UserSubscription.belongsTo(User, { foreignKey: "userId" });
};
