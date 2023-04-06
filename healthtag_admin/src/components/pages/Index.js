import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Layout from "../common/Layout";
import ReactDatatable from "../common/ReactDatatable";
import Sidebar from "../common/Sidebar";
import { getAdminDashboard } from "../services/userServices";
const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    getAdminDashboard().then((response) => {
      if (response.status === true) {
        setDashboardData(response.data);
      }
    });
  }, []);

  const imgStyle = {
    width: "50px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #ccc",
  };
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="now-ui-icons  business_money-coins" />
                        </div>
                        <h3 className="info-title">
                          <small>$</small>{" "}
                          {(dashboardData?.counts?.revenueFromProducts &&
                            dashboardData?.counts?.revenueFromProducts.toFixed(2)) ||
                            0}
                        </h3>
                        <h6 className="stats-title">Revenue From Products</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="now-ui-icons business_money-coins" />
                        </div>
                        <h3 className="info-title">
                          <small>$</small>{" "}
                          {(dashboardData?.counts?.revenueFromSubscription &&
                            dashboardData?.counts?.revenueFromSubscription.toFixed(2)) ||
                            0}
                        </h3>
                        <h6 className="stats-title">Revenue From Subscriptions</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="now-ui-icons users_single-02" />
                        </div>
                        <h3 className="info-title">{dashboardData?.counts?.totalTenants}</h3>
                        <h6 className="stats-title">Tenants</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-danger">
                          <i className="now-ui-icons users_single-02" />
                        </div>
                        <h3 className="info-title">{dashboardData?.counts?.totalProviders}</h3>
                        <h6 className="stats-title">Health Providers</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-info">
                          <i className="now-ui-icons users_single-02" />
                        </div>
                        <h3 className="info-title">{dashboardData?.counts?.totalUsers}</h3>
                        <h6 className="stats-title">Customers</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="statistics">
                      <div className="info">
                        <div className="icon icon-danger">
                          <i className="now-ui-icons objects_support-17" />
                        </div>
                        <h3 className="info-title">{dashboardData?.counts?.supportRequest}</h3>
                        <h6 className="stats-title">Support Requests</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Top 5 Customers</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-shopping">
                    <thead className>
                      <tr>
                        <th className="text-center"></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Purchase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.topUsers &&
                        dashboardData?.topUsers.length > 0 &&
                        dashboardData?.topUsers.map((item, i) => (
                          <tr>
                            <td>
                              <img
                                style={imgStyle}
                                src={item?.profile_image ? item?.profile_image : "assets/img/default-avatar.png"}
                              />
                            </td>
                            <td>
                              {item?.first_name} {item?.last_name}
                            </td>
                            <td>{item?.email}</td>
                            <td>{item?.total.toFixed(2) || 0}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Latest Orders</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-shopping">
                    <thead className>
                      <tr>
                        <th>OrderId</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Order Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.latestOrders &&
                        dashboardData?.latestOrders.length > 0 &&
                        dashboardData?.latestOrders.map((item, i) => (
                          <tr>
                            <td>{item?.id}</td>
                            <td>{item?.status && item?.status.toUpperCase()}</td>
                            <td>{item?.user?.first_name}</td>
                            <td>{item?.total}</td>
                            <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                onClick={() =>
                                  navigate("/order-details", {
                                    state: { orderId: item.id },
                                  })
                                }
                                className="btn btn-round btn-secondary btn-icon btn-sm"
                              >
                                <i className="fas fa-eye" />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Top Selling Productss</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-shopping">
                    <thead className>
                      <tr>
                        <th className="text-center"></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Total Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.topProducts &&
                        dashboardData?.topProducts.length > 0 &&
                        dashboardData?.topProducts.map((item, i) => (
                          <tr>
                            <td>
                              <img
                                style={imgStyle}
                                src={
                                  item?.productimages ? item?.productimages[0].image : "assets/img/default-avatar.png"
                                }
                              />
                            </td>
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>{item?.total.toFixed(2) || 0}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Top Selling Subscriptions</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-shopping">
                    <thead className>
                      <tr>
                        <th className="text-center"></th>
                        <th>Name</th>
                        <th>Validity</th>
                        <th>Price</th>
                        <th>Total Purchase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.topPlan &&
                        dashboardData?.topPlan.length > 0 &&
                        dashboardData?.topPlan.map((item, i) => (
                          <tr>
                            <td>
                              <img style={imgStyle} src={item?.image ? item?.image : "assets/img/default-avatar.png"} />
                            </td>
                            <td>{item?.planName}</td>
                            <td>
                              {item?.days == "30"
                                ? "Monthly"
                                : item?.days == "90"
                                ? "Quaterly"
                                : item?.days == "180"
                                ? "Half Yearly"
                                : item?.days == "365" && "Yearly"}
                            </td>
                            <td>{item?.price.toFixed(2) || 0}</td>
                            <td>{item?.total.toFixed(2) || 0}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
