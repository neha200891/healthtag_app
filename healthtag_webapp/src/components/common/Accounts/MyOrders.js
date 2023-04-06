import moment from "moment/moment";
import React, { useState } from "react";

const MyOrders = ({ MyOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState({});
  const [show, setShow] = useState(false);
  return (
    <div className="tab-pane fade show active" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
      <div className="tab-item"></div>
      <div className={show === false ? "table-section" : "table-section d-none"} id="table-section-hide">
        <div className="order-history">
          <h3>Order history</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Order Placed</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {MyOrders &&
              MyOrders.length > 0 &&
              MyOrders.map((item, i) => (
                <tr>
                  <td scope="row">{item?.id}</td>
                  <td>{moment(item.createdAt).format("MMMM DD YYYY")}</td>
                  <td>$ {item?.total}</td>
                  <td>
                    <button className="btn btn-primary order-placed">Order Placed</button>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        setSelectedOrder(item);
                        setShow(true);
                      }}
                      id="open-order"
                      title="View Details"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}

            {/* <tr>
              <td scope="row">HTS54121561</td>
              <td>December 28 2022</td>
              <td>$ 483.99</td>
              <td>
                <button className="btn btn-primary shipped">Shipped</button>
              </td>
              <td>
                <a href="javascript:void(0);" title="View Details">
                  View Details
                </a>
              </td>
            </tr>
            <tr>
              <td scope="row">HTS54121561</td>
              <td>December 28 2022</td>
              <td>$ 483.99</td>
              <td>
                <button className="btn btn-primary delivered">Delivered</button>
              </td>
              <td>
                <a href="javascript:void(0);" id="open-order" title="View Details">
                  View Details
                </a>
              </td>
            </tr>
            <tr>
              <td scope="row">HTS54121561</td>
              <td>December 28 2022</td>
              <td>$ 483.99</td>
              <td>
                <button className="btn btn-primary delivered">Delivered</button>
              </td>
              <td>
                <a href="javascript:void(0);" id="open-order" title="View Details">
                  View Details
                </a>
              </td>
            </tr>
            <tr>
              <td scope="row">HTS54121561</td>
              <td>December 28 2022</td>
              <td>$ 483.99</td>
              <td>
                <button className="btn btn-primary canceled">Canceled</button>
              </td>
              <td>
                <a href="javascript:void(0);" id="open-order" title="View Details">
                  View Details
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className={show == false ? "order-section d-none" : "order-section"} id="order-history-show">
        <div className="order-history">
          <h3>
            <i style={{ cursor: "pointer" }} onClick={() => setShow(false)} class="fa-solid fa-arrow-left-long"></i>{" "}
            Order ID {selectedOrder?.payment_id}
          </h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th width="30%">Order Placed</th>
              <th width="30%">Total</th>
              <th width="40%">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{moment(selectedOrder?.createdAt).format("MMMM DD YYYY")}</td>
              <td>$ {selectedOrder?.total}</td>
              <td>
                <button className="btn btn-primary order-placed">Order Placed</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bottom-table">
          <table className="table">
            <thead>
              <tr>
                <th width="30%">Payment mode</th>
                <th width="30%">Address</th>
                <th width="40%">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Credit Card (xxxx xxxx xxxx 9999)</td>
                <td>
                  <div className="address">
                    <p>House No 21, ABC Park 84791, Dubai</p>
                    <p>
                      Dubai Phone No.{" "}
                      <a href="tel:99999 99999" title="99999 99999">
                        99999 99999
                      </a>
                    </p>
                  </div>
                </td>
                <td>
                  <a
                    href="javascript:void(0);"
                    className="cancel-text"
                    title="Cancel Order"
                    data-bs-toggle="modal"
                    data-bs-target="#order-cancel-resion"
                  >
                    Cancel Order
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="product-title">
          <h3>Products</h3>
        </div>
        <div className="prduct-section">
          {selectedOrder?.OrderItems &&
            selectedOrder?.OrderItems.length > 0 &&
            selectedOrder?.OrderItems.map((item, i) => (
              <div className="product-table">
                <div className="d-flex justify-content-between">
                  <div className="image">
                    <img
                      src={item?.product?.productimages && item?.product?.productimages[0].image}
                      alt=""
                      height
                      title
                      width
                    />
                  </div>
                  <div className="product-detail pt-4">
                    <div>
                      <div>
                        <div>
                          <h2>{item?.product?.name}</h2>
                        </div>
                        <div className="price">${item?.item_price}</div>
                        Quantity {""}({item?.quantity})
                        <div className="subscriptions">
                          <div className="d-flex justify-content-between w-100 align-items-center">
                            <div>
                              <b>3 month subscription (Save 10%)</b>
                            </div>
                            <div className="save-price">
                              $12.99<span>/month</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="write-review d-flex align-items-center justify-content-center">
                    <a
                      href="javascript:void(0);"
                      className="cancel-text"
                      title="Write a Review"
                      data-bs-toggle="modal"
                      data-bs-target="#write-review"
                    >
                      Write a Review
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
