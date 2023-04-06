import { GetDataWithToken, PostDataWithToken, PostImageDataWithToken } from "../../apis/apiHelper";
import { authEndpoints, usersEndPoints } from "./endPoints";
import swal from "sweetalert";

export const handleAdminLogin = async (data) => {
  try {
    const response = await PostDataWithToken(authEndpoints.adminlogin, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCheckOtpLogin = async (data) => {
  try {
    const response = await PostDataWithToken(authEndpoints.checkOtpLogin, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateUser = async (data) => {
  try {
    const response = PostImageDataWithToken(authEndpoints.createuser, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleCreateTenant = async (data) => {
  try {
    const response = await PostDataWithToken(authEndpoints.createTenant, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateProvider = async (data) => {
  try {
    const response = await PostDataWithToken(authEndpoints.createProvidr, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddMaster = async (data) => {
  try {
    const response = await PostDataWithToken(authEndpoints.createMaster, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editCustomerDetails = async (data) => {
  try {
    const response = await PostDataWithToken(usersEndPoints.editCustomerDetails, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editHealthProviderProfile = async (data) => {
  try {
    const response = await PostDataWithToken(usersEndPoints.editHealthProviderProfile, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMasterData = async () => {
  try {
    const response = GetDataWithToken(authEndpoints.getMaster);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.getAllUsers);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTenents = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.alltenents);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProviders = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.allproviders);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getAllTenentCustomers = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.allTenentCustomers);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProviderCustomer = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.allProviderCustomers);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTenentProviders = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.allTenentProviders + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const blockUnblockUser = async (data) => {
  try {
    const response = PostDataWithToken(usersEndPoints.changeUserStatus, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const makeProviderAdmin = async (data) => {
  try {
    const response = PostDataWithToken(usersEndPoints.makeProviderAdmin, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteUser = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.deleteuser + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMyProfile = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.myProfile, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleEditProfile = async (data) => {
  try {
    const response = PostImageDataWithToken(usersEndPoints.editProfile, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleChangePassword = async (data) => {
  try {
    const response = PostDataWithToken(authEndpoints.changePassword, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.getUserProfile + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserQRCode = async (id) => {
  try {
    const response = GetDataWithToken(authEndpoints.updateProviderQRCode + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleEditUserProfile = async (id, data) => {
  try {
    const response = PostImageDataWithToken(usersEndPoints.editUserProfile + "/" + id, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getLastLogginInUsers = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.lastLogginInUsers, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getLetestUsers = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.letestUsers, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleChangeCustomerProvider = (data) => {
  try {
    const response = PostDataWithToken(usersEndPoints.changeCustomerTanency, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async () => {
  try {
    const response = GetDataWithToken(usersEndPoints.getAllOrders, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.getOrderDetails + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const changeOrderStatus = async (data) => {
  try {
    const response = PostDataWithToken(usersEndPoints.changeOrderStatus, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addSerialNumbers = async (data) => {
  try {
    const response = PostDataWithToken(usersEndPoints.addSerialNumbers, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUserOrders = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.getUserOrders + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUserSubscription = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.getUserSubscription + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUserDevices = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.getUserDevices + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAdminDashboard = async (id) => {
  try {
    const response = GetDataWithToken(usersEndPoints.adminDashboard, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const sendErrorMessage = (response) => {
  swal("Error", response?.data?.message ? response?.data?.message : "Error", "error");
};

export const sendSuccessMessage = (response) => {
  swal("Success", response.message, "success");
};

export const sendErrorInfo = (message) => {
  swal("Error", message, "error");
};

export const sendSuccessInfo = (message) => {
  swal("Success", message, "success");
};
