import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getMyAddress,
  handleAddAddress,
  handleDeleteAddress,
  handleEditAddress,
  sendErrorInfo,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const MyAddress = ({ setAddressCount = () => {} }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [openAddress, setOpenAddress] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [myAddress, setMyAddress] = useState([]);
  const getAddress = () => {
    getMyAddress().then((response) => {
      if (response.status === true) {
        setMyAddress(response.data);
        setAddressCount((response.data && response.data.length) || 0);
      }
    });
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleEditItems = (item) => {
    setAddressId(item.id);
    reset({
      address: item.address,
      address_type: item.address_type,
      state: item.state,
      city: item.city,
      zipcode: item.zipcode,
    });
    setOpenAddress(true);
  };

  const addAddress = (data) => {
    if (addressId != null) {
      return editAddress(data);
    }
    handleAddAddress(data).then((response) => {
      if (response.status === true) {
        getAddress();
        sendSuccessMessage(response);
        reset();
        setOpenAddress(false);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const editAddress = (data) => {
    data.addressId = addressId;
    handleEditAddress(data).then((response) => {
      if (response.status === true) {
        setAddressId(null);
        getAddress();
        sendSuccessMessage(response);
        reset();
        setOpenAddress(false);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const removeAddress = (id) => {
    handleDeleteAddress(id).then((response) => {
      if (response.status === true) {
        setAddressId(null);
        getAddress();
        sendSuccessMessage(response);

        setOpenAddress(false);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <>
      <div className="order-history">
        <h3>Addresses</h3>
      </div>

      <div className="address-section">
        <div className="row pb-5">
          {myAddress &&
            myAddress.length > 0 &&
            myAddress.map((item, i) => (
              <div className={i > 0 ? "col-lg-4" : "col-lg-4"}>
                <div className="address">
                  <div className="d-flex justify-content-end">
                    <div className="mx-2">
                      <a href="javascript:void(0);" onClick={() => handleEditItems(item)}>
                        <i className="fas fa-edit"></i>
                      </a>
                    </div>
                    <div className="mx-2">
                      <a href="javascript:void(0);" onClick={() => removeAddress(item.id)}>
                        {" "}
                        <i className="fas fa-trash"></i>
                      </a>
                    </div>
                  </div>
                  <h6>Default Address : {item.address_type}</h6>
                  <p>
                    {item.city}, {item.state},{""}
                    {item.zipcode}
                  </p>
                  <p>
                    {item.state} <b>Phone No.</b>{" "}
                    <a href="tel:99999 99999" title="99999 99999">
                      99999 99999
                    </a>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="row open-new-address">
          <div className="col-lg-10">
            <div className="main-card">
              <div className="row">
                <div className="col-lg-12">
                  <div className="open-new-address">
                    <a
                      id="add-new-address"
                      onClick={() => setOpenAddress(!openAddress)}
                      href="javascript:void(0);"
                      title="Add New Address"
                    >
                      Add New Address
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="fill-address-form"
            id="fill-address-form"
            style={openAddress == true ? { display: "block" } : { display: "none" }}
          >
            <div className="col-lg-10">
              <form onSubmit={handleSubmit(addAddress)}>
                <div className="row">
                  <div className="col-lg-6 top-border">
                    <div className="row">
                      {/* <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id="inputPassword5"
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Address Nick Name"
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="First Name"
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            {...register("address", {
                              required: "address is required",
                            })}
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Address "
                          />
                          <p className="text-danger">{errors?.address?.message}</p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="City"
                            {...register("city", {
                              required: "City is required",
                            })}
                          />
                          <p className="text-danger">{errors?.city?.message}</p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-field">
                          <select
                            className="form-control"
                            {...register("address_type", {
                              required: "Type is required",
                            })}
                            aria-label="Default select example"
                            name="address_type"
                          >
                            <option value="">Address Type</option>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                          </select>
                          <p className="text-danger">{errors?.address_type?.message}</p>
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Phone"
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="input-field">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              {...register("default_address", {
                                required: false,
                              })}
                              type="checkbox"
                              value={true}
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              Set as Default Address?
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-field">
                          <button className="btn btn-primary" type="submit" title="Submit">
                            Submit
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="cancel-btn text-center">
                          <a href="javascript:void(0);" onClick={() => setOpenAddress(false)} title="Cancel">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="row">
                      {/* <div className="col-lg-12">
                        <div className="input-field">
                          <input type="text" id className="form-control" placeholder="Last Name" />
                        </div>
                      </div> */}

                      <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            className="form-control"
                            {...register("state", {
                              required: "State is required",
                            })}
                            placeholder="State"
                          />
                          <p className="text-danger">{errors?.state?.message}</p>
                        </div>
                      </div>
                      {/* <div className="col-lg-12"></div> */}
                      <div className="col-lg-12">
                        <div className="input-field">
                          <input
                            type="text"
                            id
                            className="form-control"
                            {...register("zipcode", {
                              required: "Zipcode is required",
                            })}
                            placeholder="ZIP / Postal code"
                          />
                          <p className="text-danger">{errors?.zipcode?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAddress;
