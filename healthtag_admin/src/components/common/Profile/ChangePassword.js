import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { handleChangePassword, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const ChangePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch
  } = useForm({ mode: "onBlur" });
  
  const password = useRef({});
  password.current = watch("password", "");
  const changePassowrds = (data) => {
    let postData ={
      password: data.password,
      new_password: data.new_password,
    }
    handleChangePassword(postData)
    .then(response => {
      if(response.status === true){
        sendSuccessMessage(response)
        reset()
      }else{
        sendErrorMessage(response)
      }
    })

  };
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(changePassowrds)}>
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
        <label className="col-sm-2 col-form-label">New Passowrd</label>
        <div className="col-sm-10">
          <div className="form-group">
            <input
              {...register("new_password", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="form-control"
            />
            <span className="text-danger">{errors?.new_password?.message}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <label className="col-sm-2 col-form-label">Confirm Passowrd</label>
        <div className="col-sm-10">
          <div className="form-group">
            <input
              {...register("confirm_password", {
                required: "Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: (value) => {
                  return value === password.current || "Passwords do not match";
                }
              })}
              type="password"
              className="form-control"
            />
            <span className="text-danger">{errors?.confirm_password?.message}</span>
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

export default ChangePassword;
