import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  handleEditProfile,
  handleEditUserProfile,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const Social = ({ userId, userDetails, setCallApi }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    reset({
      facebook: userDetails?.facebook,
      twitter: userDetails?.twitter,
      instagram: userDetails?.instagram,
      linkedin: userDetails?.linkedin,
      pinterest: userDetails?.pinterest,
    });
  }, [userDetails]);

  const submitSocial = (data) => {
    for (let key in data) {
      if (data[key] && !data[key].includes("https://") && data[key] !== "") {
        data[key] = `https://${data[key]}`;
      }
    }
    const formData = new FormData();
    for (let key in data) {
      if (data[key] != null) {
        formData.append(key, data[key]);
      }
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
    <form className="form-horizontal" onSubmit={handleSubmit(submitSocial)}>
      <div className="card-body ">
        <div className="row">
          <label className="col-sm-2 col-form-label">Facebook</label>
          <div className="col-sm-10">
            <div className="form-group">
              <input
                {...register("facebook", {
                  pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter Facebook Link"
                className="form-control"
              />
              <span className="text-danger">{errors?.facebook?.message}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">Twitter</label>
          <div className="col-sm-10">
            <div className="form-group">
              <input
                {...register("twitter", {
                  pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter Twitter Link"
                className="form-control"
              />
              <span className="text-danger">{errors?.twitter?.message}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">Instagram</label>
          <div className="col-sm-10">
            <div className="form-group">
              <input
                {...register("instagram", {
                  pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter Instagram Link"
                className="form-control"
              />
              <span className="text-danger">{errors?.instagram?.message}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">LinkedIn</label>
          <div className="col-sm-10">
            <div className="form-group">
              <input
                {...register("linkedin", {
                  pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter LinkedIn Link"
                className="form-control"
              />
              <span className="text-danger">{errors?.linkedin?.message}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">Pinterest</label>
          <div className="col-sm-10">
            <div className="form-group">
              <input
                {...register("pinterest", {
                  pattern: {
                    value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                    message: "Please enter a valid URL",
                  },
                })}
                type="text"
                placeholder="Enter Pinterest Link"
                className="form-control"
              />
              <span className="text-danger">{errors?.pinterest?.message}</span>
            </div>
          </div>
        </div>
        <div class="card-footer ">
          <button type="submit" class="btn btn-fill btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Social;
