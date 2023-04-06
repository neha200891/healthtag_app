import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { handleCreateUser, sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import {
  getCategories,
  getProductDetails,
  getProductTypes,
  handleCreateCategory,
  handleCreateProduct,
  handleDeleteProductImage,
} from "../../services/productServices";
const AddProduct = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [imgErr, setImgErr] = useState("");
  const [image, setImage] = React.useState([]);
  const [productId, setProductId] = useState(null);

  const [productTypes, setProductTypes] = useState([]);
  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.status === true) {
          setCategoryList(response.data);
        }
      })
      .catch((err) => console.log(err));

    getProductTypes().then((response) => {
      if (response.status === true) {
        setProductTypes(response.data);
      }
    });
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.productId && categoryList.length > 0) {
      getProduct(location.state?.productId);
    }
  }, [categoryList]);

  const getProduct = (id) => {
    getProductDetails(id).then((response) => {
      if (response.status === true) {
        let product = response.data;
        reset({
          name: product.name,
          long_desc: product.long_desc,
          short_desc: product.short_desc,
          price: product.price,
          status: product.status,
          how_to_use: product.how_to_use,
          categoryId: product.categoryId,
          productTypeId: product.productTypeId,
          delivery_rate: product.delivery_rate,
        });
        setProductId(product.id);
        let arr = [];
        let i = 0;
        let productImagesLength = product.productimages && product.productimages.length;

        while (i < productImagesLength) {
          let each = product.productimages[i];
          arr.push({ id: each.id, imagePreviewUrl: each.image });
          i++;
        }

        setImage(arr);
      }
    });
  };
  const submitUser = (data) => {
    if (image.length === 0) {
      return setImgErr("Please upload product image");
    }
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log("images-----------------", image);
    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        let ele = image[i];
        if (ele.file) {
          formData.append("image", ele.file);
        }
      }
    }
    if (productId != null) {
      formData.append("productId", productId);
    }
    handleCreateProduct(formData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/productsList");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const handleUploadFile = (e) => {
    //check image type
    setImgErr("");
    const file = e.target.files;
    let images = [...image];
    for (let i = 0; i < file.length; i++) {
      let ele = file[i];
      if (ele.type !== "image/jpeg" && ele.type !== "image/png") {
        return sendErrorInfo("Please upload a valid image file");
      }
      images.push({
        file: ele,
        imagePreviewUrl: URL.createObjectURL(ele),
      });
    }

    setImage(images);
  };

  const deleteProductImage = (id, index) => {
    if (id) {
      handleDeleteProductImage(id).then((response) => {
        if (response.status === true) {
          console.log("image deleted");
          getProduct(productId);
        }
      });
    }
    // let arr = [...image];
    // arr.splice(index, 1);
    // setImage(arr);
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add A Product</h4>
            </div>
            <form onSubmit={handleSubmit(submitUser)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Select Category</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <select
                        className="form-control"
                        {...register("categoryId", {
                          required: "Category is required",
                        })}
                      >
                        <option value={""} selected>
                          Select Category
                        </option>
                        {categoryList &&
                          categoryList.length > 0 &&
                          categoryList
                            .filter((item) => item.status == "active")
                            .map((item, i) => <option value={item.id}>{item.category}</option>)}
                      </select>
                      <span className="text-danger">{errors?.categoryId?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Select Product Type</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <select
                        className="form-control"
                        {...register("productTypeId", {
                          required: false,
                        })}
                      >
                        <option value={""} selected>
                          Select Product Type
                        </option>
                        {productTypes &&
                          productTypes.length > 0 &&
                          productTypes.map((item, i) => <option value={item.id}>{item.product_type}</option>)}
                      </select>
                      <span className="text-danger">{errors?.productTypeId?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Product Name</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("name", {
                          required: "Category Name is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                      />
                      <span className="text-danger">{errors?.name?.message}</span>
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
                  <label className="col-sm-2 col-form-label">Price</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("price", {
                          required: "Price is required",
                          pattern: {
                            value: /^[1-9]\d*(\.\d+)?$/,
                            message: "Only Number allow",
                          },
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Product Price"
                      />
                      <span className="text-danger">{errors?.price?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Delivery Rate</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("delivery_rate", {
                          required: "Field is required",
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Delivery Rate"
                      />
                      <span className="text-danger">{errors?.delivery_rate?.message}</span>
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
                        placeholder="Describe your product"
                        className="form-control"
                        rows={5}
                      ></textarea>
                      <span className="text-danger">{errors?.long_desc?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="col-sm-2 col-form-label">How To Use</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <textarea
                        {...register("how_to_use", {
                          required: "Field is required",
                        })}
                        placeholder="How to use this product"
                        className="form-control"
                        rows={5}
                      ></textarea>
                      <span className="text-danger">{errors?.how_to_use?.message}</span>
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
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10">
                    <label htmlFor="imagefront" style={{ color: "#fff" }} className="btn btn-fill btn-primary">
                      Upload Product Image
                    </label>
                    <div className="form-group">
                      <input
                        id="imagefront"
                        onChange={(e) => handleUploadFile(e)}
                        name="aadhar_front"
                        className="form-control d-none"
                        type="file"
                        multiple
                      />
                      {image != null &&
                        image.length > 0 &&
                        image.map((item, i) => (
                          <>
                            <img
                              src={item.imagePreviewUrl}
                              className="productimage border"
                              alt="image"
                              style={{ width: "100px", height: "100px", marginRight: "10px" }}
                            />

                            <i
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteProductImage(item?.id, i)}
                              className="productimage_icon fas fa-trash text-danger"
                            />
                          </>
                        ))}
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

export default AddProduct;
