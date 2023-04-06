import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserDetails } from "../../store/actions/userActions";
import MyAddress from "../common/Accounts/MyAddress";
import MyOrders from "../common/Accounts/MyOrders";
import MyProfile from "../common/Accounts/MyProfile";
import PaymentMethod from "../common/Accounts/PaymentMethod";
import ContectUsSection from "../common/ContectUsSection";
import Layout from "../common/Layout";
import { getMyOrders } from "../services/productService";
import cookie from "react-cookies";
import IndexProductSlider from "../common/HomePage/IndexProductSlider";
const AccountManagement = () => {
  const userDetails = useSelector((state) => state.root.userDetails);
  const [myOrders, setMyOrders] = useState([]);
  const [accountCount, SetAccountCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);
  useEffect(() => {
    getMyOrders()
      .then((response) => {
        if (response.status === true) {
          setMyOrders(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(saveUserDetails({}));
    cookie.remove("token", { path: "/" });
    navigate("/");
  };
  return (
    <Layout>
      <section className="section-30 py-lg-5 my-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="form-title d-flex justify-content-center">
                <div className="text-center">
                  <h2>Account</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <a href="javascript:voide(0);" onClick={() => logoutUser()} title="Sign Out">
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="tab-title">
                <div className="row">
                  <div className="col-12 col-md-3">
                    <div>
                      <h3>
                        {userDetails?.first_name} {userDetails?.last_name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-section">
                <div className="row">
                  <div className="col-12 col-md-3">
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        className="nav-link active"
                        id="v-pills-orders-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-orders"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-orders"
                        aria-selected="true"
                      >
                        Orders ({myOrders.length})
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-subscriptions-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-subscriptions"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-subscriptions"
                        aria-selected="false"
                      >
                        Manage Subscriptions (2)
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-addresses-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-addresses"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-addresses"
                        aria-selected="false"
                      >
                        View Addresses ({addressCount})
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-methods-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-methods"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-methods"
                        aria-selected="false"
                      >
                        Payment Methods ({accountCount})
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="right-tab">
                      <div className="tab-content" id="v-pills-tabContent">
                        <MyOrders MyOrders={myOrders} />
                        <div
                          className="tab-pane fade"
                          id="v-pills-subscriptions"
                          role="tabpanel"
                          aria-labelledby="v-pills-subscriptions-tab"
                        >
                          <div className="order-history">
                            <h3>Subscriptions</h3>
                          </div>
                          {/* <div class="tab-item">
							    				<img src="images/opps.png" alt="" height="" width="">
							    				<div class="opps-title">
							    					<p>HMM.. It looks like you don’t have any subscriptions yet.</p>
							    				</div>
							    				<div class="shopping-btn">
							    					<a href="javascript:void(0);" title="Go Shopping" class="btn btn-primary">Go Shopping</a>
							    				</div>
							    			</div> */}
                          <div className="table-section">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Subscriptions ID</th>
                                  <th scope="col">Order Placed</th>
                                  <th scope="col">Expires On</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">&nbsp;</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td scope="row">HTS54121561</td>
                                  <td>December 28 2022</td>
                                  <td>January 28 2023</td>
                                  <td>
                                    <button className="btn btn-primary delivered">Running</button>
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
                                  <td>November 28 2022</td>
                                  <td>
                                    <button className="btn btn-primary canceled" title="Expired">
                                      Expired
                                    </button>
                                  </td>
                                  <td>
                                    <a href="javascript:void(0);" title="View Details">
                                      View Details
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-addresses"
                          role="tabpanel"
                          aria-labelledby="v-pills-addresses-tab"
                        >
                          <MyAddress setAddressCount={(a) => setAddressCount(a)} />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-methods"
                          role="tabpanel"
                          aria-labelledby="v-pills-methods-tab"
                        >
                          <PaymentMethod SetAccountCount={(c) => SetAccountCount(c)} />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-profile-profile-tab"
                        >
                          <MyProfile />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section5 py-5">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-12 section-title-II text-center py-3">
              <h2>You May Like</h2>
            </div>
          </div>
          <div className="row slider-row align-items-center">
            <IndexProductSlider />
          </div>
        </div>
      </section>
      <ContectUsSection />
      <div
        className="modal fade"
        id="order-cancel-resion"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Order Cancellation
                  </h5>
                </div>
                <div>
                  <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close">
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <form method="post" id>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-field">
                      <select className="form-control" aria-label="Default select example" name id>
                        <option>Reason</option>
                        <option>Option - 2</option>
                        <option>Option - 3</option>
                        <option>Option - 4</option>
                        <option>Option - 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-field">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        style={{ height: "180px" }}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-field">
                      <button className="btn btn-primary" title="Submit Request">
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="write-review"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h5 className="modal-title">Write a Review</h5>
                </div>
                <div>
                  <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close">
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <form method="post" id>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-field d-flex justify-content-center">
                      <div className="rating-section">
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-field">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        style={{ height: "180px" }}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-field">
                      <button className="btn btn-primary" title="Submit Review">
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountManagement;
