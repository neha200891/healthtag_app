import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { deleteSubscripion, getAllSubscriptions } from "../../services/subscriptionService";
import { sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const Subsctiptions = () => {
  const [planList, setPlanList] = React.useState([]);
  const [callApi, setCallApi] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/plugins/jquery.dataTables.min.js";
    script.async = true;
    setTimeout(() => {
      script.onload = () => scriptLoaded();
    }, 1500);

    document.body.appendChild(script);
  }, []);
  const scriptLoaded = () => {
    window.loadDataTable();
  };
  useEffect(() => {
    if (callApi === true) {
      getAllSubscriptions()
        .then((response) => {
          if (response.status === true) {
            setPlanList(response.data);
          } else {
            console.log(response);
          }
        })
        .catch((err) => console.log(err));
      setCallApi(false);
    }
  }, [callApi]);

  const handleDeletePlan = (id) => {
    deleteSubscripion(id)
      .then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          console.log(response);
          sendErrorMessage(response);
        }
      })
      .catch((err) => console.log(err));
  };

  const editSubscription = (plan) => {
    navigate("/add-subscription", {
      state: {
        planData: plan,
      },
    });
  };
  return (
    <div className="wrapper ">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        {/* Navbar */}
        <Header />
        {/* End Navbar */}

        <div class="panel-header"></div>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Subsctiptions List</h4>
                </div>
                <div className="card-body">
                  <div className="toolbar">
                    {/*        Here you can write extra buttons/actions for the toolbar              */}
                  </div>
                  <table className="table table-striped table-bordered" cellSpacing={0} width="100%">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Device Limit</th>
                        <th>Validity</th>
                        <th>Provider Access</th>
                        <th>Trend Analytics</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th className="disabled-sorting text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planList &&
                        planList.length > 0 &&
                        planList.map((plan, index) => (
                          <tr>
                            <td>
                              {" "}
                              <img
                                className="table_img"
                                src={plan?.image ? plan?.image : "assets/img/default-avatar.png"}
                              />
                            </td>
                            <td>{plan?.planName}</td>

                            <td>{plan?.price}</td>
                            <td>{plan?.device_limit}</td>
                            <td>
                              {plan?.days == "30"
                                ? "Monthly"
                                : plan?.days == "90"
                                ? "Quaterly"
                                : plan?.days == "180"
                                ? "Half Yearly"
                                : plan?.days == "365" && "Yearly"}
                            </td>
                            <td>{plan?.provider_access == true ? "Yes" : "No"}</td>
                            <td>{plan?.trend_analytics == true ? "Yes" : "No"}</td>
                            <td>{plan?.description}</td>
                            <td>
                              {plan?.status == "inactive" ? (
                                <span className="text-danger">Inactive</span>
                              ) : (
                                <span className="text-success">Active</span>
                              )}
                            </td>
                            <td className="text-right">
                              <a
                                href="javascript:void(0)"
                                onClick={() => editSubscription(plan)}
                                className="btn btn-round btn-secondary btn-icon btn-sm mx-2"
                              >
                                <i className="fas fa-edit" />
                              </a>
                              <a
                                href="javascript:void(0)"
                                onClick={() => handleDeletePlan(plan?.id)}
                                className="btn btn-round btn-danger btn-icon btn-sm"
                              >
                                <i className="fas fa-trash" />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* end content*/}
              </div>
              {/*  end card  */}
            </div>
            {/* end col-md-12 */}
          </div>
          {/* end row */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Subsctiptions;
