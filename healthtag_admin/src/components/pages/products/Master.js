import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../common/Layout";
import {
  addServiceTax,
  getProductTypes,
  getServiceTax,
  handleAddProductType,
  handleDeleteProductType,
} from "../../services/productServices";
import { getMasterData, handleAddMaster, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
const Master = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const {
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    register: register1,
    reset: reset1,
  } = useForm({ mode: "onBlur" });

  const {
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    register: register2,
    reset: reset2,
  } = useForm({ mode: "onBlur" });

  const [callApi, setCallApi] = useState(true);
  const [productTypes, setProductTypes] = useState([]);
  useEffect(() => {
    if (callApi === true) {
      getMasterData().then((response) => {
        if (response.status === true) {
          reset({
            health_providers: response.data.health_providers || 0,
            users: response.data.users || 0,
          });
        }
      });
      setCallApi(false);
      serviceTaxData();
    }
    productType();
  }, [callApi]);
  const serviceTaxData = () => {
    getServiceTax().then((response) => {
      if (response.status === true) {
        reset2({ tax: response.data.tax || 0 });
      }
    });
  };
  const productType = () => {
    getProductTypes().then((response) => {
      if (response.status === true) {
        setProductTypes(response.data);
      }
    });
  };
  const submitMaster = (data) => {
    handleAddMaster(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setCallApi(true);
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const submitProductType = (data) => {
    handleAddProductType(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        productType();
        reset1();
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const deleteProductType = (id) => {
    handleDeleteProductType(id).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        productType();
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const submitTax = (data) => {
    addServiceTax(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        serviceTaxData();
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add Tenant User Master</h4>
            </div>
            <form onSubmit={handleSubmit(submitMaster)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Number Of Health Providers</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("health_providers", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Number Of health providers"
                      />
                      <span className="text-danger">{errors?.health_providers?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Number Of Users</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("users", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="number of users"
                      />
                      <span className="text-danger">{errors?.users?.message}</span>
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

        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add Service Tax For Products</h4>
            </div>
            <form onSubmit={handleSubmit2(submitTax)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Tax (%)</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register2("tax", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Tax on products"
                      />
                      <span className="text-danger">{errors2?.tax?.message}</span>
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

      <div className="row">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add Product Type Master</h4>
            </div>
            <form onSubmit={handleSubmit1(submitProductType)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Product Type</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register1("product_type", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Product Type"
                      />
                      <span className="text-danger">{errors1?.product_type?.message}</span>
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
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Topic List</h4>
            </div>
            <table className="table table-striped table-bordered " cellSpacing={0} width="100%">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>ProductType</th>

                  <th className="disabled-sorting text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productTypes &&
                  productTypes.length > 0 &&
                  productTypes.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.product_type}</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          onClick={() => deleteProductType(item?.id)}
                          className="btn btn-round btn-danger btn-icon btn-sm  mx-2 float-right mr-3"
                        >
                          <i className="fas fa-trash" />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* end row */}
    </Layout>
  );
};

export default Master;
