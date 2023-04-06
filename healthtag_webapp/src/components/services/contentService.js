import { GetDataWithToken } from "../../apis/apiHelper";
import { ContentEndPoints } from "./endpoints";

export const getAllBlogs = () => {
  try {
    const response = GetDataWithToken(ContentEndPoints.getAllBlogs, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getBlogDetails = (id) => {
  try {
    const response = GetDataWithToken(ContentEndPoints.getBlogDetails + "/" + id, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
