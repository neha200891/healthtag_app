import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./components/pages/Index";
import AboutUs from "./components/pages/AboutUs";
import Blog from "./components/pages/Blog";
import BlogDetails from "./components/pages/BlogDetails";
import Category from "./components/pages/Category";
import CategoryDetails from "./components/pages/CategoryDetails";
import Checkout from "./components/pages/Checkout";
import ContactUs from "./components/pages/ContactUs";
import Faq from "./components/pages/Faq";
import ProductDetail from "./components/pages/ProductDetail";
import TnC from "./components/pages/TnC";
import Login from "./components/pages/Login";
import AccountManagement from "./components/pages/AccountManagement";
import SuccessPage from "./components/pages/SuccessPage";
import FailedPage from "./components/pages/FailedPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blog-detail" element={<BlogDetails />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category-details" element={<CategoryDetails />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/product-detail/:productId" element={<ProductDetail />} />
      <Route path="/tnc" element={<TnC />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<AccountManagement />} />
      <Route path="/success-page" element={<SuccessPage />} />
      <Route path="/error-page" element={<FailedPage />} />
    </Routes>
  );
};

export default App;
