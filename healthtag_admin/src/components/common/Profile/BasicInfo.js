import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveUserDetails } from "../../../store/actions/userActions";
import {
  handleEditProfile,
  handleEditUserProfile,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const BasicInfo = ({ userId, userDetails, setCallApi }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    reset({
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      email: userDetails?.email,
      phone_no: userDetails?.phone_no,
      age: userDetails?.age,
      gender: userDetails?.gender,
    });
  }, [userDetails]);

  const submitInfo = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (userId) {
      handleEditUserProfile(userId, formData).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    } else {
      handleEditProfile(formData).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }
  };
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(submitInfo)}>
      <div className="card-body ">
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
      </div>

      <div class="card-footer ">
        <button type="submit" class="btn btn-fill btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicInfo;
