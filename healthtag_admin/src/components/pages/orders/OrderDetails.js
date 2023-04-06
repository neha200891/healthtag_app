import moment from "moment/moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Layout from "../../common/Layout";
import {
  addSerialNumbers,
  changeOrderStatus,
  getOrderDetails,
  sendErrorInfo,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const OrderDetails = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [orderItemArr, setOrderItemArr] = useState([]);

  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2);
  useEffect(() => {
    callOrderData();
  }, []);

  const submitDeliveryDetails = (data) => {
    data.status = "dispatched";
    data.orderId = location.state.orderId;
    changeOrderStatus(data).then((response) => {
      if (response.status === true) {
        setModal(false);
        callOrderData();
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const handleOrderDeliverd = () => {
    let data = {};
    data.status = "completed";
    data.orderId = location.state.orderId;
    changeOrderStatus(data).then((response) => {
      if (response.status === true) {
        callOrderData();
        sendSuccessMessage(response);
        reset();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const callOrderData = () => {
    getOrderDetails(location.state.orderId).then((response) => {
      if (response.status === true) {
        setOrderDetails(response.data);
        let OrderItems = response.data.OrderItems;

        let arr = [];
        let i = 0;
        while (i < OrderItems.length || 0) {
          let j = 0;
          while (j < OrderItems[i].quantity) {
            arr.push(OrderItems[i]);
            j++;
          }
          i++;
        }
        setOrderItemArr(arr);
      }
    });
  };
  const [serialNumberData, setSerialNumberData] = useState([]);

  const handleChangeInput = (value, id, index) => {
    let temp = serialNumberData;
    temp[index] = {
      product_sno: value,
      orderItemId: id,
      userId: orderDetails.userId,
    };
    setSerialNumberData(temp);
    console.log(temp);
  };

  const submitSerialNumbers = (e) => {
    e.preventDefault();
    if (serialNumberData.length < orderDetails?.OrderItems && orderDetails?.OrderItems.length) {
      return sendErrorInfo("Please fill all serial numbers");
    } else {
      console.log("serial number data", serialNumberData);
      addSerialNumbers({ orderItems: JSON.stringify(serialNumberData) }).then((response) => {
        if (response.status === true) {
          toggleModal();
          setModal2(false);
        } else {
          sendErrorMessage(response);
        }
      });
    }
  };

  const handleAssignDeliveryPartner = () => {
    toggleModal();
  };
  return (
    <Layout>
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center py-5">
        <h2 className="h5 mb-0">
          <a href="#" className="text-muted" /> OrderId #{orderDetails?.id}
        </h2>
      </div>
      {/* Main content */}
      <div className="row">
        <div className="col-lg-8">
          {/* Details */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between">
                <div>
                  <span className="me-3">{moment(orderDetails?.createdAt).format("DD MMM,YYYY")} </span>
                  <span className="me-3"> PaymentId {orderDetails?.payment_id} </span>
                  <span className="me-3">
                    Card -XXXX XXXX XXXX{" "}
                    {orderDetails?.user_payment?.card_no.substr(orderDetails?.user_payment?.card_no.length - 4)}
                  </span>
                  <span className="badge rounded-pill bg-info">
                    {orderDetails?.status && orderDetails?.status.toUpperCase()}
                  </span>
                </div>
                <div className="d-flex">
                  <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                    <i className="bi bi-download" /> <span className="text">Invoice</span>
                  </button>
                  <div className="dropdown">
                    <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots-vertical" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-pencil" /> Edit
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-printer" /> Print
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <table className="table ">
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Serial Number</td>
                    <td>Quantity</td>
                    <td className="text-end">Amount (Per Unit)</td>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.OrderItems &&
                    orderDetails?.OrderItems.length > 0 &&
                    orderDetails?.OrderItems.map((item, i) => (
                      <tr>
                        <td>
                          <div className="d-flex mb-2">
                            <div className="flex-shrink-0">
                              <img
                                src={item?.product?.productimages && item?.product?.productimages[0].image}
                                alt=""
                                width={35}
                                className="img-fluid"
                              />
                            </div>
                            <div className="flex-lg-grow-1 ms-3">
                              <h6 className="small mb-0">
                                <a href="#" className="text-reset">
                                  {item?.product?.name}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item?.product_serials &&
                            item?.product_serials.length > 0 &&
                            item?.product_serials.map((sno, i) => <p>{sno.product_sno}</p>)}
                        </td>
                        <td>{item?.quantity}</td>
                        <td className="text-end">${item?.item_price}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>Subtotal</td>
                    <td className="text-end">
                      ${(orderDetails?.total - orderDetails?.delivery_charges - orderDetails?.tax_amount).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Shipping</td>
                    <td className="text-end">${orderDetails?.delivery_charges}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Tax</td>
                    <td className="text-end">${orderDetails?.tax_amount}</td>
                  </tr>
                  {/* <tr>
                    <td colSpan={2}>Discount (Code: NEWYEAR)</td>
                    <td className="text-danger text-end">-$10.00</td>
                  </tr> */}
                  <tr className="fw-bold">
                    <td colSpan={2}>TOTAL</td>
                    <td className="text-end">${orderDetails?.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          {/* Customer Notes */}
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h6">Payment Method</h3>
              <p>
                Card- {orderDetails?.user_payment?.card_no.substr(orderDetails?.user_payment?.card_no.length - 4)}{" "}
                <br />
                Total: ${orderDetails?.total}
                {orderDetails?.status == "amount_paid" ? (
                  <span className="badge bg-success rounded-pill">PAID</span>
                ) : (
                  orderDetails?.status == "pending" && <span className="badge bg-primary rounded-pill">Not PAID</span>
                )}
              </p>
            </div>
          </div>
          <div className="card mb-4">
            {/* Shipping information */}
            <div className="card-body">
              <h3 className="h6">Shipping Information</h3>
              {orderDetails?.status == "amount_paid" ? (
                <>
                  <button onClick={() => handleAssignDeliveryPartner()} type="submit" class="btn btn-fill btn-primary">
                    Assign Shipping Partner
                  </button>
                </>
              ) : (
                <>
                  <strong>Shipping Partner:- {orderDetails?.delivery_partner} </strong>
                  <br />
                  <span>
                    Track Id:-
                    <a href={orderDetails?.tracking_url} className="text-decoration-underline" target="_blank">
                      {orderDetails?.tracking_id}
                    </a>{" "}
                    <i className="bi bi-box-arrow-up-right" />{" "}
                  </span>
                  <br />
                  <span>
                    Expected Delivery:-
                    {moment(orderDetails?.expected_delivery_date).format("DD MMM, YYYY")}
                  </span>
                  {orderDetails?.status == "dispatched" && (
                    <button onClick={() => handleOrderDeliverd()} type="submit" class="btn btn-fill btn-primary">
                      Order Delivered
                    </button>
                  )}
                </>
              )}

              <hr />
              <h3 className="h6">Address</h3>
              <address>
                <strong>
                  Customer: {orderDetails?.user?.first_name} {orderDetails?.user?.last_name}
                </strong>
                <br />
                <strong> Email: {orderDetails?.user?.email}</strong>
                <br />
                <strong>Mobile: {orderDetails?.user?.phone_no}</strong>
                <br />
                <br />
                {orderDetails?.useraddress?.address_type}:- {orderDetails?.useraddress?.address}
                <br />
                {orderDetails?.useraddress?.city} {orderDetails?.useraddress?.state}
                <br />
                <abbr title="Phone">Pincode: </abbr>
                {orderDetails?.useraddress?.zipcode}
              </address>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal2} size="lg" toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>
          <h6>Add Product Serial Numbers</h6>
          <p style={{ fontSize: "12px" }}>(it will help users to find there products)</p>
        </ModalHeader>
        <ModalBody>
          <form className="form-horizontal" onSubmit={submitSerialNumbers}>
            <div className="card-body ">
              {orderItemArr &&
                orderItemArr.length > 0 &&
                orderItemArr.map((item, i) => (
                  <div className="form-group">
                    <label className="ml-3">{item.product.name}</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      value={item.product_sno}
                      onChange={(e) => handleChangeInput(e.target.value, item.id, i)}
                      placeholder={"Product Serial Number for product "}
                    />
                  </div>
                ))}

              <button type="submit" class="btn btn-fill btn-primary">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Shipping Partner details</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(submitDeliveryDetails)} className="form-horizontal">
            <div className="card-body ">
              <div className="form-group">
                <label className="ml-3">Tracking Id</label>
                <input
                  {...register("tracking_id", {
                    required: "field is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Tracking Id"
                />
                <span className="text-danger">{errors?.tracking_id?.message}</span>
              </div>
              <div className="form-group">
                <label className="ml-3">Deliver Partner</label>
                <input
                  {...register("delivery_partner", {
                    required: "field is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Delivery Partner"
                />
                <span className="text-danger">{errors?.delivery_partner?.message}</span>
              </div>
              <div className="form-group">
                <label className="ml-3">Tracking Link</label>
                <input
                  {...register("tracking_url", {
                    required: "field is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Tracking URL"
                />
                <span className="text-danger">{errors?.tracking_url?.message}</span>
              </div>
              <div className="form-group">
                <label className="ml-3">Expected Delivery Date</label>
                <input
                  {...register("expected_delivery_date", {
                    required: "field is required",
                  })}
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  min={moment().format("YYYY-MM-DD")}
                />
                <span className="text-danger">{errors?.expected_delivery_date?.message}</span>
              </div>

              <button type="submit" class="btn btn-fill btn-primary">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </Layout>
  );
};

export default OrderDetails;
