import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../common/Layout";
import { getCategories } from "../../services/productServices";
import { handleCreateProvider, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
const CreateProvider = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [categoryList, setCategoryList] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.status === true) {
          let i = 0;
          let arr = [];
          while (i < response.data.length) {
            let item = response.data[i];
            arr.push({
              label: item.category,
              value: item.id,
            });
            i++;
          }
          setCategoryList(arr);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const submitProvider = (data) => {
    let provider_specialities = specialities.map((item) => item.value);
    data.provider_specialities = JSON.stringify(provider_specialities);
    handleCreateProvider(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/dashboard");
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
            <form onSubmit={handleSubmit(submitProvider)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Provider Specialities</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <MultiSelect
                        options={categoryList}
                        value={specialities}
                        onChange={setSpecialities}
                        labelledBy="Select"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">First Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("first_name", {
                          required: "First name is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
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
                          required: "Last name is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                      />
                      <span className="text-danger">{errors?.last_name?.message}</span>
                    </div>
                  </div>
                </div>
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
                        type="input"
                        className="form-control"
                        autoComplete="new-password"
                        placeholder="Enter Password"
                      />
                      <span className="text-danger">{errors?.password?.message}</span>
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

export default CreateProvider;
