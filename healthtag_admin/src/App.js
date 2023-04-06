import React, { useEffect } from "react";
import Index from "./components/pages/Index";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/pages/users/CreateUser";
import AllUsersList from "./components/pages/users/AllUsersList";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import LatestUserList from "./components/pages/users/LatestUserList";
import LastLoggedInUsers from "./components/pages/users/LastLoggedInUsers";
import AddCategory from "./components/pages/products/AddCategory";
import CategoriesList from "./components/pages/products/CategoriesList";
import AddProduct from "./components/pages/products/AddProduct";
import ProductList from "./components/pages/products/ProductList";
import Master from "./components/pages/products/Master";
import CreateTenant from "./components/pages/users/CreateTenant";
import CreateProvider from "./components/pages/users/CreateProvider";
import AllTanentList from "./components/pages/users/AllTanentList";
import AllProviderList from "./components/pages/users/AllProviderList";
import AllTenantUser from "./components/pages/users/AllTenantUser";
import AddCategoryQuestion from "./components/pages/products/AddCategoryQuestion";
import CategoryQuestion from "./components/pages/products/CategoryQuestion";
import AddBlog from "./components/pages/content/AddBlog";
import Blogs from "./components/pages/content/Blogs";
import OrdersList from "./components/pages/orders/OrdersList";
import OrderDetails from "./components/pages/orders/OrderDetails";
import QuestionDetails from "./components/pages/products/QuestionDetails";
import SupportManagement from "./components/pages/support/SupportManagement";
import AllProviderUser from "./components/pages/users/AllProviderUser";
import AddTopics from "./components/pages/support/AddTopics";
import AddSubscription from "./components/pages/subscriptions/AddSubscription";
import Subsctiptions from "./components/pages/subscriptions/Subsctiptions";
import UserSubscription from "./components/pages/users/UserSubscription";
import UserOrdersList from "./components/pages/users/UserOrdersList";
import UserDevicesList from "./components/pages/users/UserDevicesList";
import UsersReportListing from "./components/pages/users/UsersReportListing";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/createTenant" element={<CreateTenant />} />
        <Route path="/createProvider" element={<CreateProvider />} />
        <Route path="/all-users" element={<AllUsersList />} />
        <Route path="/all-tenants" element={<AllTanentList />} />
        <Route path="/all-providers" element={<AllProviderList />} />
        <Route path="/my-customers" element={<AllTenantUser />} />
        <Route path="/my-users" element={<AllProviderUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/latestUsers" element={<LatestUserList />} />
        <Route path="/lastLogins" element={<LastLoggedInUsers />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/categoriesList" element={<CategoriesList />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/productsList" element={<ProductList />} />
        <Route path="/master" element={<Master />} />
        <Route path="/add-question" element={<AddCategoryQuestion />} />
        <Route path="/questions" element={<CategoryQuestion />} />
        <Route path="/question-details" element={<QuestionDetails />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/support" element={<SupportManagement />} />
        <Route path="/support-topic" element={<AddTopics />} />
        <Route path="/add-subscription" element={<AddSubscription />} />
        <Route path="/subscriptions" element={<Subsctiptions />} />
        <Route path="/user-subscription" element={<UserSubscription />} />
        <Route path="/user-orders" element={<UserOrdersList />} />
        <Route path="/user-devices" element={<UserDevicesList />} />
        <Route path="/reports" element={<UsersReportListing />} />
      </Routes>
    </>
  );
};

export default App;
