import React from "react";
import { useForm } from "react-hook-form";
import { handleAdminLogin, handleCheckOtpLogin, sendErrorMessage, sendSuccessMessage } from "../services/userServices";
import cookie from "react-cookies";
import { saveUserDetails } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const {
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    register: register2,
  } = useForm({ mode: "onBlur" });
  const [optRecieved, setOptRecieved] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    setEmail(data.email);
    handleAdminLogin(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setOptRecieved(true);
        reset();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const verifyOTP = (data) => {
    data.email = email;
    handleCheckOtpLogin(data).then((response) => {
      if (response.status === true) {
        cookie.save("token", response.data.token, { path: "/" });
        dispatch(saveUserDetails(response.data));
        sendSuccessMessage(response);
        navigate("/dashboard");
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <div className="row no-gutters shadow-lg" style={{ height: "100vh" }}>
      <div className="col-md-6 bg-white p-5">
        {/* add logo img */}
        {/* add logo img end */}
        {optRecieved === false ? (
          <form className="form" onSubmit={handleSubmit(handleLogin)}>
            <div className="card card-login card-plain">
              <div className="card-header ">
                <div className="logo-container mt-5">
                  <img src="./assets/img/logo.png" alt="" />
                </div>
                <h3 className="pt-3">Welcome Back!</h3>
                <p>Happy to see you again!</p>
              </div>
              <div className="card-body ">
                <div className="input-group no-border form-control-lg">
                  <span className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="now-ui-icons users_circle-08" />
                    </div>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Email is not valid",
                      },
                    })}
                    placeholder="Email..."
                  />
                </div>
                <span className="text-danger">{errors?.email?.message}</span>
                <div className="input-group no-border form-control-lg">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="now-ui-icons text_caps-small" />
                    </div>
                  </div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Password..."
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors?.password?.message}</span>
              </div>
              <div className="card-footer ">
                <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">
                  Login
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit2(verifyOTP)}>
            <div className="card card-login card-plain">
              <div className="card-header ">
                <div className="logo-container">
                  <img src="./assets/img/logo.png" alt="" />
                </div>
                <h3 className="pt-3">Verify Your Identity!</h3>
              </div>
              <div className="card-body ">
                <div className="input-group no-border form-control-lg">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="now-ui-icons text_caps-small" />
                    </div>
                  </div>
                  <input
                    type="text"
                    {...register2("otp", {
                      required: "Otp is required",
                    })}
                    placeholder="Enter Your OTP..."
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors2?.otp?.message}</span>
              </div>
              <div className="card-footer ">
                <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">
                  Verify
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="col-md-6 d-none d-md-block login_screen_img">
        <img src="https://images.unsplash.com/photo-1519332978332-21b7d621d05e?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" />
      </div>
    </div>
  );
};

export default Login;

//  <div>
//         <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
//           <div className="container-fluid">
//             <div className="navbar-wrapper">
//               <a className="navbar-brand" href="#pablo">Login Page</a>
//             </div>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-bar navbar-kebab" />
//               <span className="navbar-toggler-bar navbar-kebab" />
//               <span className="navbar-toggler-bar navbar-kebab" />
//             </button>
//             <div className="collapse navbar-collapse justify-content-end" id="navigation">
//               <ul className="navbar-nav">
//               </ul>
//             </div>
//           </div>
//         </nav>
//         {/* End Navbar */}
//         <div className="wrapper wrapper-full-page ">
//           <div className="full-page login-page section-image" filter-color="black" style={{backgroundImage:`URL("assets/img/bg14.jpg")`}}>
//             <div className="content">
//               <div className="container">
//                 <div className="col-md-4 ml-auto mr-auto">
//                   <form className="form" onSubmit={handleSubmit(handleLogin)} >
//                     <div className="card card-login card-plain">
//                       <div className="card-header ">
//                         <div className="logo-container">
//                           <img src="assets/img/now-logo.png" alt="" />
//                         </div>
//                       </div>
//                       <div className="card-body ">
//                         <div className="input-group no-border form-control-lg">
//                           <span className="input-group-prepend">
//                             <div className="input-group-text">
//                               <i className="now-ui-icons users_circle-08" />
//                             </div>
//                           </span>
//                           <input type="email" className="form-control" {...register("email", {
//                               required: "Email is required",
//                               pattern: {
//                                 value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//                                 message: "Email is not valid",
//                               },
//                             })} placeholder="Email..." />
//                         </div>
//                             <span className="text-danger">{errors?.email?.message}</span>
//                         <div className="input-group no-border form-control-lg">
//                           <div className="input-group-prepend">
//                             <div className="input-group-text">
//                               <i className="now-ui-icons text_caps-small" />
//                             </div>
//                           </div>
//                           <input type="password" {...register("password", {
//                               required: "Password is required",
//                               minLength: {
//                                 value: 6,
//                                 message: "Password must be at least 6 characters",
//                               },
//                             })} placeholder="Password..." className="form-control" />
//                         </div>
//                             <span className="text-danger">{errors?.password?.message}</span>
//                       </div>
//                       <div className="card-footer ">
//                         <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">Login</button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <footer className="footer">
//               <div className=" container-fluid ">
//                 <nav>
//                   <ul>
//                     <li>
//                       <a href="https://www.creative-tim.com">
//                         Creative Tim
//                       </a>
//                     </li>
//                     <li>
//                       <a href="http://presentation.creative-tim.com">
//                         About Us
//                       </a>
//                     </li>
//                     <li>
//                       <a href="http://blog.creative-tim.com">
//                         Blog
//                       </a>
//                     </li>
//                   </ul>
//                 </nav>
//                 <div className="copyright" id="copyright">
//                   ©
//                   , Designed by
//                   <a href="https://www.invisionapp.com" target="_blank">Invision</a>. Coded by
//                   <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
//                 </div>
//               </div>
//             </footer>
//           </div>
//         </div>
//       </div>
