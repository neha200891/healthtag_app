import { GetDataWithToken, PostDataWithToken, PostImageDataWithToken } from "../../apis/apiHelper";
import { productsEndPoints } from "./endPoints";

export const handleCreateCategory = async (data) => {
  try {
    const response = PostImageDataWithToken(productsEndPoints.addCategory, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const response = GetDataWithToken(productsEndPoints.getCategories);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleCreateProduct = async (data) => {
  try {
    const response = PostImageDataWithToken(productsEndPoints.addProduct, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (catid) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.getProducts}?categoryId=${catid}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const changeCategoryStatus = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.ChangeCategoryStatus}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getProductDetails = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.getProductDetails}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const changeProductStatus = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.ChangeProductStatus}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteCategory = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.deleteCategory}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteProduct = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.deleteProduct}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteProductImage = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.deleteProductImage}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleAddCategoryQuestion = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.addCategoryQuestion, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoryQuestion = async (catid) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.getCategoryQuestion}?categoryId=${catid}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionDetails = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.questionDetails}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleEditQuestion = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.editCategoryQuestion, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleChangeQuestionStatus = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.changeQuestionStatus, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const handleChangeOptionStatus = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.changeOptionStatus, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const handleAddEditQuestionOption = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.addEditQuestionOption, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const handleAddProductType = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.addProductType, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProductTypes = async (data) => {
  try {
    const response = GetDataWithToken(productsEndPoints.getProductTypes, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addServiceTax = async (data) => {
  try {
    const response = PostDataWithToken(productsEndPoints.addServiceTax, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getServiceTax = async (data) => {
  try {
    const response = GetDataWithToken(productsEndPoints.getServiceTax, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const handleDeleteProductType = async (id) => {
  try {
    const response = GetDataWithToken(`${productsEndPoints.deleteProductType}/${id}`, "");
    return response;
  } catch (err) {
    console.log(err);
  }
};
