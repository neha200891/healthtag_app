import { GetDataWithToken, PostDataWithToken, PostImageDataWithToken } from "../../apis/apiHelper";
import { contentEndPoints, supportEndpoints } from "./endPoints";

export const handleCreateBlog = async (data) => {
  try {
    const response = PostImageDataWithToken(contentEndPoints.addEditBlog, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getBlogs = async () => {
  try {
    const response = GetDataWithToken(contentEndPoints.getBlogs);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const changeBlogStatus = async (id) => {
  try {
    const response = GetDataWithToken(`${contentEndPoints.changeBlogStatus}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteBlog = async (id) => {
  try {
    const response = GetDataWithToken(`${contentEndPoints.deleteBlog}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllSupportTickets = async (status) => {
  try {
    let url = status ? supportEndpoints.getAllTickets + "?status=" + status : supportEndpoints.getAllTickets;
    const response = GetDataWithToken(`${url}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const sendMessage = async (data) => {
  try {
    const response = PostDataWithToken(`${supportEndpoints.sendMessage}`, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getTicketChat = async (id) => {
  try {
    const response = GetDataWithToken(`${supportEndpoints.getAllTicketChats}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleAddTicket = async (data) => {
  try {
    const response = PostDataWithToken(`${supportEndpoints.addTopic}`, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteTopic = async (id) => {
  try {
    const response = GetDataWithToken(`${supportEndpoints.deleteTopic}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSupportTopics = async () => {
  try {
    const response = GetDataWithToken(`${supportEndpoints.getTopics}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleChangeTicketStatus = async (id) => {
  try {
    const response = GetDataWithToken(`${supportEndpoints.changeTicketStatus}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
