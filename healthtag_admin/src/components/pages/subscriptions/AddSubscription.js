import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { createSubscription } from "../../services/subscriptionService";
import { sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const AddSubscription = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [planId, setPlanId] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = React.useState({
    file: null,
    imagePreviewUrl: null,
  });
  useEffect(() => {
    if (location.state) {
      setPlanId(location.state.planData.id);
      reset({
        planName: location.state.planData.planName,
        price: location.state.planData.price,
        device_limit: location.state.planData.device_limit,
        provider_access: location.state.planData.provider_access,
        trend_analytics: location.state.planData.trend_analytics,

        description: location.state.planData.description,
        days: location.state.planData.days,
        status: location.state.planData.status,
      });
      setImage({ ...image, imagePreviewUrl: location.state.planData.image || null });
    }
  }, []);

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
  const addSubscription = (data) => {
    if (planId != null) {
      data.planId = planId;
    }
    if (planId == null && image.file == null) {
      return sendErrorInfo("Please upload plan image");
    }
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (image.file) {
      formData.append("image", image.file);
    }
    createSubscription(formData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        reset();
        navigate("/subscriptions");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        {/* Navbar */}
        <Header />
        <div class="panel-header"></div>
        {/* End Navbar */}
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card ">
                <div className="card-header ">
                  <h4 className="card-title">Create A Subscription</h4>
                </div>
                <form className="form-horizontal" onSubmit={handleSubmit(addSubscription)}>
                  <div className="card-body ">
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Plan Name</label>
                      <div className="col-sm-10">
                        <div className="form-group">
                          <input
                            {...register("planName", {
                              required: "Subscription is required",
                            })}
                            type="text"
                            className="form-control"
                            placeholder="Title"
                          />
                          <span className="text-danger">{errors?.planName?.message}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Price</label>
                      <div className="col-sm-10">
                        <div className="form-group">
                          <input
                            {...register("price", {
                              required: "Price No is required",
                              pattern: {
                                value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
                                message: "Price is not valid",
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="Price"
                          />
                          <span className="text-danger">{errors?.price?.message}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Device Limit</label>
                      <div className="col-sm-10">
                        <div className="form-group">
                          <input
                            {...register("device_limit", {
                              required: "Device limit is required",
                              pattern: {
                                value: /^[0-9]\d*$/,
                                message: "Value is not valid",
                              },
                            })}
                            type="text"
                            className="form-control"
                            placeholder="Device Limit"
                          />
                          <span className="text-danger">{errors?.device_limit?.message}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Validity</label>
                      <div className="col-sm-10">
                        <div className="form-group">
                          <select
                            class="form-control"
                            {...register("days", {
                              required: "Validity is required",
                            })}
                            data-size="7"
                            data-style="btn btn-primary btn-round"
                            title="Select Validity"
                          >
                            <option value="">Select Validity</option>
                            <option value="30">Monthly</option>
                            <option value="90">Quaterly</option>
                            <option value="180">Half Yearly</option>
                            <option value="365">Yearly</option>
                          </select>
                          <span className="text-danger">{errors?.days?.message}</span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <label className="col-sm-2 col-form-label">Status</label>
                      <div className="col-sm-10 checkbox-radios">
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("status", {
                                required: "Status is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="status"
                              id="exampleRadios1"
                              value="active"
                              defaultChecked
                            />
                            <span className="form-check-sign" />
                            Active
                          </label>
                        </div>
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("status", {
                                required: "Status is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="status"
                              value="inactive"
                              id="exampleRadios2"
                            />
                            <span className="form-check-sign" />
                            Inactive
                          </label>
                        </div>
                        <span className="text-danger">{errors?.status?.message}</span>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Provider Access</label>
                      <div className="col-sm-10 checkbox-radios">
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("provider_access", {
                                required: "Field is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="provider_access"
                              id="exampleRadios1"
                              value={true}
                              defaultChecked
                            />
                            <span className="form-check-sign" />
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("provider_access", {
                                required: "Field is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="provider_access"
                              value={false}
                              id="exampleRadios2"
                            />
                            <span className="form-check-sign" />
                            No
                          </label>
                        </div>
                        <span className="text-danger">{errors?.provider_access?.message}</span>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Trend Analytics</label>
                      <div className="col-sm-10 checkbox-radios">
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("trend_analytics", {
                                required: "Field is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="trend_analytics"
                              id="exampleRadios1"
                              value={true}
                              defaultChecked
                            />
                            <span className="form-check-sign" />
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-radio">
                          <label className="form-check-label">
                            <input
                              {...register("trend_analytics", {
                                required: "Status is required",
                              })}
                              className="form-check-input"
                              type="radio"
                              name="trend_analytics"
                              value={false}
                              id="exampleRadios2"
                            />
                            <span className="form-check-sign" />
                            No
                          </label>
                        </div>
                        <span className="text-danger">{errors?.trend_analytics?.message}</span>
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-2 col-form-label">Description</label>
                      <div className="col-sm-10">
                        <div className="form-group">
                          <textarea
                            {...register("description", {
                              required: "Description is required",
                            })}
                            className="form-control"
                            rows="5"
                            defaultValue={""}
                            placeholder="Description..."
                          />
                          <span className="text-danger">{errors?.email?.message}</span>
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddSubscription;
