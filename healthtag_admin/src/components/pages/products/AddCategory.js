import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { handleCreateUser, sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import { handleCreateCategory } from "../../services/productServices";
const AddCategory = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const [image, setImage] = React.useState({
    file: null,
    imagePreviewUrl: null,
  });
  const [imgErr, setImgErr] = useState("");

  const location = useLocation();
  useEffect(() => {
    if (location.state?.category) {
      const { category } = location.state;
      reset({
        category: category.category,
        long_desc: category.long_desc,
        short_desc: category.short_desc,
        status: category.status,
        red_zone: category.red_zone,
        yellow_zone: category.yellow_zone,
        green_zone: category.green_zone,
      });
      setImage({
        imagePreviewUrl: category.image,
      });
    }
  }, []);
  const submitUser = (data) => {
    if (image.file === null) {
      return setImgErr("Please upload category image");
    }
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (image.file) {
      formData.append("image", image.file);
    }
    if (location.state?.category?.id) {
      formData.append("categoryId", location.state?.category?.id);
    }
    handleCreateCategory(formData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/categoriesList");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const handleUploadFile = (e) => {
    //check image type
    setImgErr("");
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
              <h4 className="card-title">Add A Category</h4>
            </div>
            <form onSubmit={handleSubmit(submitUser)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Category Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("category", {
                          required: "Category Name is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                      />
                      <span className="text-danger">{errors?.category?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="col-sm-2 col-form-label">Short Description</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("short_desc", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Short Description"
                      />
                      <span className="text-danger">{errors?.short_desc?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Long Description</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <textarea
                        {...register("long_desc", {
                          required: "Field is required",
                        })}
                        placeholder="Describe your category"
                        className="form-control"
                        rows={5}
                      ></textarea>
                      <span className="text-danger">{errors?.long_desc?.message}</span>
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
                            required: "Satus is required",
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
                  <label className="col-sm-2 col-form-label">Red Zone Score</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("red_zone", {
                          required: "Field is required",
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Red Zone Score"
                      />
                      <span className="text-danger">{errors?.red_zone?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Yellow Zone Score</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("yellow_zone", {
                          required: "Field is required",
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Yellow Zone Score"
                      />
                      <span className="text-danger">{errors?.yellow_zone?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Green Zone Score</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("green_zone", {
                          required: "Field is required",
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Green Zone Score"
                      />
                      <span className="text-danger">{errors?.green_zone?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10">
                    <label htmlFor="imagefront" style={{ color: "#fff" }} className="btn btn-fill btn-primary">
                      Upload Category Image
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
                      <span className="text-danger">{imgErr}</span>
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

export default AddCategory;
