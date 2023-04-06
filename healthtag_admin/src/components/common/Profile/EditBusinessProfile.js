import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  editCustomerDetails,
  editHealthProviderProfile,
  getAllTenentProviders,
  getAllTenents,
  handleChangeCustomerProvider,
  sendErrorInfo,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const EditBusinessProfile = ({ userDetails, setCallApi = () => {}, UserDetails }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });

  const [tenants, setTenants] = useState([]);
  const [providers, setProviders] = useState([]);
  const [flag, setFlag] = useState(true);
  const [modal, setModal] = useState(false);
  const [changeCustomerArr, setChangeCustomerArr] = useState([]);
  const [newProvider, setNewProvider] = useState("");
  const toggleModal = () => setModal(!modal);
  useEffect(() => {
    if (userDetails?.customer) {
      handleChangeTenant(userDetails?.customer?.tenantId);
    }

    if (userDetails?.business_profile) {
      reset({
        certification_number: userDetails?.business_profile?.certification_number,
        business_name: userDetails?.business_profile?.business_name,
        incorporation_year: userDetails?.business_profile?.incorporation_year,
        contact_person: userDetails?.business_profile?.contact_person,
      });
      if (flag === true && userDetails.userType == "health_provider") {
        reset({
          tenantId: userDetails?.business_profile?.tenantId,
        });
        setFlag(false);
      }
    }
    getAllTenents().then((response) => {
      if (response.status == true) {
        setTenants(response.data);
      }
    });
  }, [userDetails]);

  const handleChangeTenant = (tenantId) => {
    getAllTenentProviders(tenantId).then((response) => {
      if (response.status === true) {
        setProviders(response.data);
      }
    });
  };

  useEffect(() => {
    if (flag === true && providers.length > 0 && userDetails.userType == "user") {
      reset({
        tenantId: userDetails?.customer?.tenantId,
        providerId: userDetails?.customer?.providerId,
      });
      setFlag(false);
    }
  }, [providers]);

  const submitBusinessProfile = (data) => {
    if (userDetails?.userType == "user") {
      data.customerId = userDetails?.id;
      editCustomerDetails(data).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }
    if (UserDetails?.userType == "tenant" && userDetails?.userType == "health_provider") {
      data.providerId = userDetails?.business_profile?.userId;
      editHealthProviderProfile(data).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }
    if (UserDetails?.userType == "admin" && userDetails?.userType == "health_provider") {
      if (userDetails.customers && userDetails.customers.length > 0) {
        alert("This provider have customer, First Change their providers");
        handleChangeTenant(userDetails?.business_profile?.tenantId);
        setModal(true);
      } else {
        data.providerId = userDetails?.business_profile?.userId;
        editHealthProviderProfile(data).then((response) => {
          if (response.status === true) {
            sendSuccessMessage(response);
            setCallApi(true);
          } else {
            sendErrorMessage(response);
          }
        });
      }
    }
  };

  const handleSelectCustomers = (e) => {
    const { checked, value } = e.target;
    const arr = [...changeCustomerArr];
    if (checked) {
      arr.push(value);
    } else {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    setChangeCustomerArr(arr);
  };

  const handleChangeProvider = (e) => {
    e.preventDefault();
    if (changeCustomerArr.length == 0) {
      return sendErrorInfo("Please select Customer ");
    }
    if (newProvider == "") {
      return sendErrorInfo("Please select new Health Provider ");
    }
    let postData = {
      customers: JSON.stringify(changeCustomerArr),
      providerId: newProvider,
      tenantId: userDetails?.business_profile?.tenantId,
    };
    handleChangeCustomerProvider(postData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setModal(false);
        setCallApi(true);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(submitBusinessProfile)}>
      <div className="card-body ">
        {UserDetails?.userType == "admin" && (
          <>
            <div className="row">
              <label className="col-sm-2 col-form-label">Select Tenant</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <select
                    {...register("tenantId", {
                      required: "Tenant is required",
                    })}
                    onChange={(e) => handleChangeTenant(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Tenant</option>
                    {tenants &&
                      tenants.length > 0 &&
                      tenants.map((item, i) => (
                        <option value={item.id} key={i}>
                          {item?.tenantprofile?.business_name}
                        </option>
                      ))}
                  </select>

                  <span className="text-danger">{errors?.tenantId?.message}</span>
                </div>
              </div>
            </div>
            {userDetails.userType == "user" && (
              <div className="row">
                <label className="col-sm-2 col-form-label">Select Health Provider</label>
                <div className="col-sm-10">
                  <div className="form-group">
                    <select
                      {...register("providerId", {
                        required: "Health provider is required",
                      })}
                      className="form-control"
                    >
                      <option value="">Select Health Provider</option>
                      {providers &&
                        providers.length > 0 &&
                        providers.map((item, i) => (
                          <option value={item.userId} key={i}>
                            {item?.business_name}
                          </option>
                        ))}
                    </select>

                    <span className="text-danger">{errors?.providerId?.message}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {UserDetails.userType == "tenant" && (
          <>
            <div className="row">
              <label className="col-sm-2 col-form-label">Business Name</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    {...register("business_name", {
                      required: "Business name is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Business Name"
                  />
                  <span className="text-danger">{errors?.business_name?.message}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 col-form-label">Incorporation Year</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    {...register("incorporation_year", {
                      required: "Incorporation year is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Incorporation Year"
                  />
                  <span className="text-danger">{errors?.incorporation_year?.message}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 col-form-label">Certification Number</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    {...register("certification_number", {
                      required: "Certification Number is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Certification Number"
                  />
                  <span className="text-danger">{errors?.certification_number?.message}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 col-form-label">Contact Person</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    {...register("contact_person", {
                      required: "Contact Person is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Contact Person"
                  />
                  <span className="text-danger">{errors?.contact_person?.message}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div class="card-footer ">
        <button type="submit" class="btn btn-fill btn-primary">
          Submit
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <ul class="list-group">
            {userDetails.customers &&
              userDetails.customers.length > 0 &&
              userDetails.customers.map((item, i) => (
                <li class="list-group-item d-flex justify-content-between" key={i}>
                  <div>
                    <input
                      type="checkbox"
                      id={"idx" + i}
                      value={item?.customer?.id}
                      onChange={(e) => handleSelectCustomers(e)}
                    />{" "}
                    <label htmlFor={"idx" + i} className="ml-3">
                      {item?.customer?.first_name} {item?.customer?.last_name}
                    </label>
                  </div>
                  <span>{item?.customer?.email}</span>
                </li>
              ))}
            <div className="row">
              <label className="col-sm-12 col-form-label">Select Health Provider</label>
              <div className="col-sm-12">
                <div className="form-group">
                  <select className="form-control" onChange={(e) => setNewProvider(e.target.value)}>
                    <option value="">Select Health Provider</option>
                    {providers &&
                      providers.length > 0 &&
                      providers.map((item, i) => (
                        <option value={item.userId} key={i}>
                          {item?.business_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </ul>
          <button type="button" onClick={(e) => handleChangeProvider(e)} class="btn btn-fill btn-primary">
            Change Health Provider
          </button>
        </ModalBody>
      </Modal>
    </form>
  );
};

export default EditBusinessProfile;
