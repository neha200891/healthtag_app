import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getMyCart } from "../services/productService";
import { addToCartAction, openBag, saveUserDetails } from "../../store/actions/userActions";
import { TabContent, TabPane } from "reactstrap";
import cookie from "react-cookies";
import {
  enterForgotOTP,
  resetForgotPassword,
  sendErrorMessage,
  sendSuccessMessage,
  userForgotPassword,
  userWebLogin,
  userWebSignup,
} from "../services/userServices";
import { useForm } from "react-hook-form";
const Header = () => {
  const categories = useSelector((state) => state.root.categories);
  const userDetails = useSelector((state) => state.root.userDetails);

  const [activeTab, setActiveTab] = useState(1);
  const toggleTab = (tab) => setActiveTab(tab);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const {
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    register: register1,
    reset: reset1,
  } = useForm({ mode: "onBlur" });
  const {
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    register: register2,
    reset: reset2,
  } = useForm({ mode: "onBlur" });
  const {
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    register: register3,
    reset: reset3,
    watch: watch3,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotOTP, setForgotOTP] = useState("");
  const [modal, setModal] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const password = useRef();
  password.current = watch3("new_password");
  const removeBackdrop = () => {
    document.body.classList.remove("show");
    let doc = document.getElementsByClassName("modal-backdrop fade show");
    //  modal-backdrop.fade.show
    const modal = document.getElementById("user-login");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.style.paddingLeft = 0;
    var element = document.querySelector(".modal-backdrop.fade.show");

    if (element) {
      element.classList.remove("modal-backdrop", "fade", "show");
      setModal(false);
    }
    document.body.style.overflow = "scroll";
  };

  const handleLogin = (data) => {
    userWebLogin(data).then((response) => {
      if (response.status === true) {
        cookie.save("token", response.data.token, { path: "/" });
        dispatch(saveUserDetails(response.data));
        sendSuccessMessage(response);
        removeBackdrop();
        setModal(false);
        navigate("/");
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const registerUser = (data) => {
    userWebSignup(data).then((response) => {
      if (response.status === true) {
        cookie.save("token", response.data.token, { path: "/" });
        dispatch(saveUserDetails(response.data));
        sendSuccessMessage(response);
        removeBackdrop();
        setModal(false);
        navigate("/");
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const submitResetPasswordReq = (data) => {
    if (otpSent == false) {
      let postData = {
        email: data.email,
      };
      userForgotPassword(postData).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setOtpSent(true);
        } else {
          sendErrorMessage(response);
        }
      });
    } else {
      let postData = {
        email: data.email,
        otp: data.otp,
      };
      setForgotOTP(data.otp);
      enterForgotOTP(postData).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setOtpSent(true);
          setResetPassword(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }
  };

  const resetUserPassword = (data) => {
    let postData = {
      password: data.new_password,
      otp: forgotOTP,
    };
    resetForgotPassword(postData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        toggleTab(1);
        setOtpSent(false);
        setResetPassword(false);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <>
      <header className="d-lg-flex align-content-lg-center">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand" to="/">
              <img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} className="img-fluid" width height alt="" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about-us">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link" to="/faq">
                    FAQ
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blogs" tabIndex={-1} aria-disabled="true">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contactus" tabIndex={-1} aria-disabled="true">
                    Contact Us{" "}
                  </NavLink>
                </li>
                {!userDetails?.token && (
                  <li className="nav-item">
                    <a
                      href="javascript:void(0)"
                      onClick={() => toggleTab(1)}
                      data-bs-toggle="modal"
                      data-bs-target="#user-login"
                      className="nav-link"
                    >
                      Login
                    </a>
                  </li>
                )}
              </ul>
              {userDetails?.token && (
                <div className="d-flex user-icon">
                  <div>
                    <NavLink to="/account">
                      <i className="fa-solid fa-circle-user" />
                    </NavLink>
                  </div>
                  <div className="mx-4">
                    <a href="#">
                      <i className="fa fa-search" aria-hidden="true" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="javascript:void(0)"
                      onClick={() => openBag()}
                      data-bs-toggle="modal"
                      data-bs-target="#cartModal"
                    >
                      <i className="fa fa-shopping-bag" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <section className="section-1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className=" mt-1">
                <OwlCarousel className="owl-theme" loop margin={10} items={7} id="service-slider">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((item, i) => (
                      <div className="link">
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            navigate("/category-details", {
                              state: {
                                categoryId: item.id,
                              },
                            })
                          }
                          className
                          title="COPD"
                          key={i}
                        >
                          {item.category}
                        </a>
                      </div>
                    ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="user-login" tabIndex={-1} aria-labelledby="user-login" aria-hidden="true">
        <div className="modal-dialog float-end">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body text-center">
              <TabContent activeTab={activeTab}>
                <TabPane tabId={1}>
                  <div className="login-page">
                    <div>
                      <img src={process.env.PUBLIC_URL + "/assets/images/login-logo.jpg"} alt="" height width title />
                    </div>
                    <div className="title d-flex justify-content-center">
                      <div>
                        <h2>Login</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      </div>
                    </div>
                    <div className="form-section">
                      <div>
                        <form onSubmit={handleSubmit(handleLogin)}>
                          <div className="input-filed">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              aria-describedby="emailHelp"
                              placeholder="Email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                  message: "Email is not valid",
                                },
                              })}
                            />
                            <p className="text-danger">{errors?.email?.message}</p>
                          </div>
                          <div className="input-filed">
                            <input
                              type="password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message: "Password must be at least 6 characters",
                                },
                              })}
                              className="form-control"
                              id="password"
                              placeholder="password"
                            />
                            <p className="text-danger">{errors?.password?.message}</p>
                          </div>
                          <div className="input-filed">
                            <button type="submit" title="Signin" className="btn btn-primary">
                              Signin
                            </button>
                          </div>
                          <div className="input-filed forgot">
                            <p>
                              New Customer?
                              <a href="javascript:void(0);" title="Create Account" onClick={() => toggleTab(2)}>
                                Create Account
                              </a>
                            </p>
                            <p className="text">
                              <a href="javascript:void(0);" title="Forgot Password?" onClick={() => toggleTab(3)}>
                                Forgot Password?
                              </a>
                            </p>
                          </div>
                          <div className="input-filed">
                            <button type="submit" title="Provider / Family Login" className="btn btn-primary">
                              Provider / Family Login
                            </button>
                          </div>
                          {/* 	<div class="text-center forgot-password">
							  		<a title="Forgot Password?" href="javascript:void(0)">Forgot Password?</a>
							  	</div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId={2}>
                  <div className="login-page">
                    <div>
                      <img src={process.env.PUBLIC_URL + "/assets/images/login-logo.jpg"} alt="" height width title />
                    </div>
                    <div className="title d-flex justify-content-center">
                      <div>
                        <h2>Create Account</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      </div>
                    </div>
                    <div className="form-section">
                      <div>
                        <form onSubmit={handleSubmit1(registerUser)}>
                          <div className="input-filed">
                            <input
                              type="text"
                              className="form-control"
                              id="first-name"
                              {...register1("first_name", {
                                required: "First name is required",
                              })}
                              name="first_name"
                              placeholder="First Name"
                            />
                            <p className="text-danger">{errors1?.first_name?.message}</p>
                          </div>
                          <div className="input-filed">
                            <input
                              type="text"
                              className="form-control"
                              id="last-name"
                              {...register1("last_name", {
                                required: "Last name is required",
                              })}
                              name="last_name"
                              placeholder="Last Name"
                            />
                            <p className="text-danger">{errors1?.last_name?.message}</p>
                          </div>
                          <div className="input-filed">
                            <input
                              type="email"
                              className="form-control"
                              id="email934"
                              name="email"
                              aria-describedby="emailHelp"
                              placeholder="Email"
                              {...register1("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                  message: "Email is not valid",
                                },
                              })}
                            />
                            <p className="text-danger">{errors1?.email?.message}</p>
                          </div>
                          <div className="input-filed">
                            <input
                              name="password"
                              type="password"
                              {...register1("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message: "Password must be at least 6 characters",
                                },
                              })}
                              className="form-control"
                              id="passwor29030d"
                              placeholder="Password"
                            />
                            <p className="text-danger">{errors1?.password?.message}</p>
                          </div>
                          <div className="input-filed">
                            <button type="submit" title="Create" className="btn btn-primary">
                              Create
                            </button>
                          </div>
                          <div className="input-filed login">
                            <p>
                              <a href="javascript:void(0);" onClick={() => toggleTab(1)} title="Or Login Here">
                                Or Login Here
                              </a>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId={3}>
                  <div className="login-page">
                    <div>
                      <img src={process.env.PUBLIC_URL + "/assets/images/login-logo.jpg"} alt="" height width title />
                    </div>
                    <div className="title d-flex justify-content-center">
                      <div>
                        <h2>Reset your Password</h2>
                        <p>
                          {resetPassword == false
                            ? otpSent == false
                              ? " We will send you an email to reset your password"
                              : "Please enter OTP"
                            : "Enter Your new Password"}
                        </p>
                      </div>
                    </div>
                    <div className="form-section">
                      <div>
                        {resetPassword === false ? (
                          <form onSubmit={handleSubmit2(submitResetPasswordReq)}>
                            <div className="input-filed">
                              <input
                                type="email"
                                className="form-control"
                                id="emailresetpa"
                                aria-describedby="emailHelp"
                                name="email"
                                placeholder="Email"
                                {...register2("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Email is not valid",
                                  },
                                })}
                              />
                              <p className="text-danger">{errors2?.password?.message}</p>
                            </div>
                            {otpSent && (
                              <div className="input-filed">
                                <input
                                  type="input"
                                  className="form-control"
                                  maxLength={4}
                                  id="otpsend"
                                  aria-describedby="emailHelp"
                                  placeholder="OTP"
                                  name="otp"
                                  {...register2("otp", {
                                    required: "OTP Is required",
                                    pattern: {
                                      value: /^\d+$/,
                                      message: "OTP is not valid",
                                    },
                                  })}
                                />
                                <p className="text-danger">{errors2?.otp?.message}</p>
                              </div>
                            )}

                            <div className="input-filed">
                              <button type="submit" title="Create" className="btn btn-primary">
                                Send OTP
                              </button>
                            </div>
                            <div className="input-filed login">
                              <p>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  Cancel
                                </button>
                              </p>
                            </div>
                          </form>
                        ) : (
                          <form onSubmit={handleSubmit3(resetUserPassword)}>
                            <div className="input-filed">
                              <input
                                type="password"
                                {...register3("new_password", {
                                  required: "New Password is required",
                                  minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                  },
                                })}
                                name="new_password"
                                className="form-control"
                                id="password123"
                                placeholder="Password"
                              />
                              <p className="text-danger">{errors3?.new_password?.message}</p>
                            </div>
                            <div className="input-filed">
                              <input
                                type="password"
                                {...register3("confirm_password", {
                                  required: "Confirm Password is required",
                                  validate: (value) => value === password.current || "Password does not match",
                                })}
                                name="confirm_password"
                                className="form-control"
                                id="password9908"
                                placeholder="Password"
                              />
                              <p className="text-danger">{errors3?.confirm_password?.message}</p>
                            </div>

                            <div className="input-filed">
                              <button type="submit" title="Create" className="btn btn-primary">
                                Change Password
                              </button>
                            </div>
                            <div className="input-filed login">
                              <p>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                  Cancel
                                </button>
                              </p>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
