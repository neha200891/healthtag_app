import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getPaymentMethod,
  removePaymentMethod,
  savePaymentMethod,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const PaymentMethod = ({ SetAccountCount = () => {} }) => {
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [payments, setPayments] = useState([]);
  const getUserPayments = () => {
    getPaymentMethod().then((response) => {
      if (response.status === true) {
        setPayments(response.data);
        SetAccountCount((response.data && response.data.length) || 0);
      }
    });
  };

  useEffect(() => {
    getUserPayments();
  }, []);

  const submitData = (data) => {
    savePaymentMethod(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setShow(!show);
        getUserPayments();
        reset();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const handleRemoveCard = (id) => {
    removePaymentMethod(id).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        getUserPayments();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  return (
    <>
      {" "}
      <div className="order-history">
        <h3>Saved Cards</h3>
      </div>
      <div className="row">
        <div className="col-lg-10">
          <div className="main-card">
            <div className="row">
              {payments &&
                payments.length > 0 &&
                payments.map((item, i) => (
                  <div className="col-lg-6">
                    <div className="card-demo">
                      <div className="d-flex">
                        <div className="visa">
                          <img src="images/visa.png" alt="" height title width />
                        </div>
                        <div className="d-flex align-items-center mx-4">
                          <div>
                            <a href="javascript:void(0);">
                              <img src="./assets/images/icons-Delete.png" alt="" height width />
                            </a>
                          </div>
                          <div className="mx-2">
                            <a href="javascript:void(0);" onClick={() => handleRemoveCard(item.id)}>
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="card-number">
                        <p>{item.card_no}</p>
                      </div>
                      <div className="date-section">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>{item.name_on_card}</h6>
                          </div>
                          <div className="d-flex  align-items-center">
                            <div className="valid-date">
                              <div>VALID</div>
                              <div>THRU</div>
                            </div>
                            <div className="expires">
                              {item.month}/{item.year}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="visa-image">
                        <img src="images/visa.png" alt="" height title width />
                      </div>
                    </div>
                  </div>
                ))}

              <div className="col-lg-12">
                <div className="add-new-card">
                  <a id="add-new-card" href="javascript:void(0);" onClick={() => setShow(!show)} title="Add New Card">
                    Add New Card
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="payment-method" style={show ? { display: "block" } : { display: "none" }}>
                  <form onSubmit={handleSubmit(submitData)}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="input-field">
                              <input
                                type="text"
                                id="inputPassword5"
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Name on card"
                                {...register("name_on_card", {
                                  required: "Name is required",
                                })}
                              />
                              <p className="text-danger">{errors?.name_on_card?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Card Number"
                                {...register("card_no", {
                                  required: "Card No is required",
                                })}
                              />
                              <p className="text-danger">{errors?.card_no?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Month"
                                {...register("month", {
                                  required: "Month is required",
                                })}
                              />
                              <p className="text-danger">{errors?.month?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                placeholder="Year"
                                {...register("year", {
                                  required: "Year is required",
                                })}
                              />
                              <p className="text-danger">{errors?.year?.message}</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-field">
                              <input
                                type="text"
                                id
                                className="form-control"
                                aria-describedby="passwordHelpBlock"
                                placeholder="CVV/CVS"
                                {...register("cvv", {
                                  required: "CVV is required",
                                })}
                              />
                              <p className="text-danger">{errors?.cvv?.message}</p>
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
                              <a href="javascript:void(0);" onClick={() => setShow(!show)} title="Cancel">
                                Cancel
                              </a>
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
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
