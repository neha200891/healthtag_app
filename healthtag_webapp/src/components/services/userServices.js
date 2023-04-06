import { GetDataWithToken, PostDataWithToken, PostImageDataWithToken } from "../../apis/apiHelper";
import { UserEndPoints } from "./endpoints";
import { Store } from "react-notifications-component";

export const userWebLogin = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.webLogin, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const userWebSignup = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.webSignup, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const userForgotPassword = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.forgotPassword, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const enterForgotOTP = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.checkforgotOtp, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const resetForgotPassword = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.resetPassword, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleEditUserProfile = async (data) => {
  try {
    const response = PostImageDataWithToken(UserEndPoints.editProfile, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleAddAddress = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.addAddress, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleEditAddress = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.editUserAddress, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteAddress = async (id) => {
  try {
    const response = GetDataWithToken(UserEndPoints.deleteMyAddress + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getMyAddress = async (data) => {
  try {
    const response = GetDataWithToken(UserEndPoints.getMyAddress, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const savePaymentMethod = async (data) => {
  try {
    const response = PostDataWithToken(UserEndPoints.addPaymentMethod, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getPaymentMethod = async (data) => {
  try {
    const response = GetDataWithToken(UserEndPoints.getMyPaymentMethods, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const removePaymentMethod = async (id) => {
  try {
    const response = GetDataWithToken(UserEndPoints.removePaymentMethod + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const sendErrorMessage = (response) => {
  console.log("response", response.data.message);
  Store.addNotification({
    // title: "Error!",
    message: response.data.message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
  //   swal("Error", response.data.message, "error");
};

export const sendSuccessMessage = (response) => {
  //   swal("Success", response.message, "success");
  Store.addNotification({
    // title: "Seccess!",
    message: response.message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const sendErrorInfo = (message) => {
  //   swal("Error", message, "error");
  Store.addNotification({
    // title: "Error!",
    message: message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const sendSuccessInfo = (message) => {
  //   swal("Success", message, "success");
  Store.addNotification({
    // title: "Seccess!",
    message: message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
