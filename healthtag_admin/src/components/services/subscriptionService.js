import { GetDataWithToken, PostDataWithToken, PostImageDataWithToken } from "../../apis/apiHelper";
import { subscriptionEndPoints } from "./endPoints";

export const createSubscription = async (data) => {
  try {
    const response = await PostImageDataWithToken(subscriptionEndPoints.addSubscription, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubscriptions = async () => {
  try {
    const response = await GetDataWithToken(subscriptionEndPoints.getAllSubscriptions, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscripion = async (id) => {
  try {
    const response = await GetDataWithToken(subscriptionEndPoints.deleteSubscripion + "/" + id, "");
    return response;
  } catch (error) {
    console.log(error);
  }
};
