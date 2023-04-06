import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import cookie from "react-cookies";
import { sendErrorMessage, sendSuccessMessage, userWebLogin } from "../services/userServices";
import { saveUserDetails } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import ContectUsSection from "../common/ContectUsSection";

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    userWebLogin(data).then((response) => {
      if (response.status === true) {
        cookie.save("token", response.data.token, { path: "/" });
        dispatch(saveUserDetails(response.data));
        sendSuccessMessage(response);
        navigate("/");
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <Layout>
      <section className="section-29 d-flex align-items-center justify-content-center py-lg-5 my-lg-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-6 col-lg-10">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="form-title d-flex justify-content-center">
                    <div>
                      <h2>Provider Login</h2>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>

                  <div className="form-box">
                    <form>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-3">
                        <input type="password" className="form-control" id="password" placeholder="password" />
                      </div>
                      <div>
                        <button type="submit" title="Signin" className="btn btn-primary">
                          Signin
                        </button>
                      </div>
                      <div className="text-center forgot-password">
                        <a title="Forgot Password?" href="javascript:void(0)">
                          Forgot Password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-2">
                  <div className="center-border"></div>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="form-title d-flex justify-content-center">
                    <div>
                      <h2>Family Login</h2>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                  {/* <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div class="text-center">
                            Your Password is successfully changed. Login into your account with your new password.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>	
                        </div>
                    </div> */}
                  <div className="form-box">
                    <form onSubmit={handleSubmit(handleLogin)}>
                      <div className="mb-3">
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
                      <div className="mb-3">
                        <input
                          type="password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 5,
                              message: "Password must be at least 5 characters",
                            },
                          })}
                          className="form-control"
                          id="password"
                          placeholder="password"
                        />
                        <p className="text-danger">{errors?.password?.message}</p>
                      </div>
                      <div>
                        <button type="submit" title="Signin" className="btn btn-primary">
                          Signin
                        </button>
                      </div>
                      <div className="text-center forgot-password">
                        <a title="Forgot Password?" href="javascript:void(0)">
                          Forgot Password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContectUsSection />
    </Layout>
  );
};

export default Login;
