import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { set, useForm } from "react-hook-form";
import {
  getAllTenentProviders,
  getAllTenents,
  handleCreateUser,
  sendErrorInfo,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
const CreateUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [providers, setProviders] = useState([]);
  const [image, setImage] = React.useState({
    file: null,
    imagePreviewUrl: null,
  });

  useEffect(() => {
    getAllTenents().then((response) => {
      if (response.status == true) {
        setTenants(response.data);
      }
    });
  }, []);

  const submitUser = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (image.file) {
      formData.append("image", image.file);
    }
    handleCreateUser(formData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/all-users");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const handleChangeTenant = (tenantId) => {
    getAllTenentProviders(tenantId).then((response) => {
      if (response.status === true) {
        setProviders(response.data);
      }
    });
  };

  const handleUploadFile = (e) => {
    //check image type
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return sendErrorInfo("Please upload a valid image file");
    }
    setImage({
      file: file,
      imagePreviewUrl: URL.createObjectURL(file),
    });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Create A User</h4>
            </div>
            <form onSubmit={handleSubmit(submitUser)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Select Tenant</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <select
                        {...register("tenantId", {
                          required: "Tenant is required",
                        })}
                        onChange={(e) => handleChangeTenant(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select Tenant</option>
                        {tenants &&
                          tenants.length > 0 &&
                          tenants.map((item, i) => (
                            <option value={item.id} key={i}>
                              {item?.tenantprofile?.business_name}
                            </option>
                          ))}
                      </select>

                      <span className="text-danger">{errors?.tenantId?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Select Health Provider</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <select
                        {...register("providerId", {
                          required: "Health provider is required",
                        })}
                        className="form-control"
                      >
                        <option value="">Select Health Provider</option>
                        {providers &&
                          providers.length > 0 &&
                          providers.map((item, i) => (
                            <option value={item.userId} key={i}>
                              {item?.business_name}
                            </option>
                          ))}
                      </select>

                      <span className="text-danger">{errors?.providerId?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">First Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("first_name", {
                          required: "First Name is required",
                        })}
                        type="text"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.first_name?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Last Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("last_name", {
                          required: "First Name is required",
                        })}
                        type="text"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.last_name?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Phone No</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("phone_no", {
                          required: "Phone No is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone No is not valid",
                          },
                        })}
                        type="text"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.phone_no?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Age</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("age", {
                          required: "Age is required",
                          pattern: {
                            value: /^[0-9]{2}$/,
                            message: "Age is not valid",
                          },
                        })}
                        type="text"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="col-sm-2 col-form-label">Gender</label>
                  <div className="col-sm-10 checkbox-radios">
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="exampleRadios1"
                          value="male"
                          defaultChecked
                        />
                        <span className="form-check-sign" />
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          id="exampleRadios2"
                        />
                        <span className="form-check-sign" />
                        Female
                      </label>
                    </div>
                    <span className="text-danger">{errors?.gender?.message}</span>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email is not valid",
                          },
                        })}
                        type="email"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.email?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        type="password"
                        className="form-control"
                      />
                      <span className="text-danger">{errors?.password?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10">
                    <label htmlFor="imagefront" style={{ color: "#fff" }} className="btn btn-fill btn-primary">
                      Upload Profile Image
                    </label>
                    <div className="form-group">
                      <input
                        id="imagefront"
                        onChange={(e) => handleUploadFile(e)}
                        name="aadhar_front"
                        className="form-control d-none"
                        type="file"
                      />
                      {image.imagePreviewUrl && (
                        <img src={image.imagePreviewUrl} alt="image" style={{ width: "100px", height: "100px" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer ">
                <button type="submit" class="btn btn-fill btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* end row */}
    </Layout>
  );
};

export default CreateUser;
