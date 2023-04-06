import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetails } from "../../../store/actions/userActions";
import { handleEditUserProfile, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const MyProfile = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const userDetails = useSelector((state) => state.root.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      email: userDetails.email,
      phone_no: userDetails.phone_no,
    });
  }, []);

  const SubmitEditProfile = (data) => {
    handleEditUserProfile(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        dispatch(saveUserDetails(response.data));
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <>
      {" "}
      <div className="order-history">
        <h3>Profile</h3>
      </div>
      <div className="row">
        <div className="col-lg-10">
          <div className="main-card">
            <div className="row">
              <div className="col-lg-10">
                <div className="payment-method d-block pt-0 profile">
                  <form onSubmit={handleSubmit(SubmitEditProfile)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                placeholder="First Name"
                                {...register("first_name", {
                                  required: "First name is required",
                                })}
                              />
                              <p className="text-danger">{errors?.first_name?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                placeholder="Last Name"
                                {...register("last_name", {
                                  required: "Last name is required",
                                })}
                              />
                              <p className="text-danger">{errors?.last_name?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="email"
                                id
                                className="form-control"
                                readOnly
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Email is not valid",
                                  },
                                })}
                                placeholder="Email"
                              />
                              <p className="text-danger">{errors?.email?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                placeholder="Mobile"
                                {...register("phone_no", {
                                  required: "Mobile is required",
                                })}
                              />
                              <p className="text-danger">{errors?.phone_no?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <button className="btn btn-primary" type="submit" title="Submit">
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
