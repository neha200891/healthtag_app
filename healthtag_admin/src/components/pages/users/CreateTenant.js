import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import {
  getAllTenents,
  getMasterData,
  handleCreateTenant,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const CreateTenant = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [master, setMaster] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    getMasterData().then((response) => {
      if (response.status === true) {
        setMaster(response.data);
        reset({
          health_providers: response.data.health_providers || 0,
          users: response.data.users || 0,
        });
      }
    });
  }, []);

  const submitTenant = (data) => {
    handleCreateTenant(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/all-tenants");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Create A Tenant</h4>
            </div>
            <form onSubmit={handleSubmit(submitTenant)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Business Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("business_name", {
                          required: "Business name is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Business Name"
                      />
                      <span className="text-danger">{errors?.business_name?.message}</span>
                    </div>
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
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Enter Email"
                      />
                      <span className="text-danger">{errors?.email?.message}</span>
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
                        placeholder="Enter Phone Number"
                      />
                      <span className="text-danger">{errors?.phone_no?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Address</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                      />
                      <span className="text-danger">{errors?.address?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Incorporation Year</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("incorporation_year", {
                          required: "Incorporation year is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Incorporation Year"
                      />
                      <span className="text-danger">{errors?.incorporation_year?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Certification Number</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("certification_number", {
                          required: "Certification Number is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Certification Number"
                      />
                      <span className="text-danger">{errors?.certification_number?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Contact Person</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("contact_person", {
                          required: "Contact Person is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Contact Person"
                      />
                      <span className="text-danger">{errors?.phone_no?.message}</span>
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
                        autoComplete="new-password"
                        placeholder="Enter Password"
                      />
                      <span className="text-danger">{errors?.password?.message}</span>
                    </div>
                  </div>
                </div>

                <>
                  <div className="row">
                    <label className="col-sm-2 col-form-label">Number Of Health Providers</label>
                    <div className="col-sm-10">
                      <div className="form-group">
                        <input
                          {...register("health_providers", {
                            required: "Field is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Number Of health providers"
                        />
                        <span className="text-danger">{errors?.health_providers?.message}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <label className="col-sm-2 col-form-label">Number Of Users</label>
                    <div className="col-sm-10">
                      <div className="form-group">
                        <input
                          {...register("users", {
                            required: "Field is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="number of users"
                        />
                        <span className="text-danger">{errors?.users?.message}</span>
                      </div>
                    </div>
                  </div>
                </>
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

export default CreateTenant;
