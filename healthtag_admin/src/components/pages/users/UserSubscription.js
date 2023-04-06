import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";
import { getAllUserSubscription } from "../../services/userServices";

const UserSubscription = () => {
  const [subscriptionList, setSubscrptionList] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getAllUserSubscription(location.state.userId).then((response) => {
      if (response.status === true) {
        setSubscrptionList(response.data);
      }
    });
  }, []);

  const columns = [
    {
      name: "Subscription",
      selector: (row) => row.plan.planName,
    },
    {
      name: "Plan Status",
      selector: (row) => row.status,
    },
    {
      name: "Purchase Date",
      selector: (row) => moment(row.createdAt).format("DD MMM,YYYY"),
    },
    {
      name: "Plan End Date",
      selector: (row) => moment(row.end_date).format("DD MMM,YYYY"),
    },

    {
      name: "Plan Validity",
      selector: (row) =>
        row?.plan.days == "30"
          ? "Monthly"
          : row?.plan.days == "90"
          ? "Quaterly"
          : row?.plan.days == "180"
          ? "Half Yearly"
          : row?.plan.days == "365" && "Yearly",
    },
    {
      name: "Device Limit",
      selector: (row) => row.plan.device_limit,
    },
    {
      name: "Provider Access",
      selector: (row) => (row.plan?.provider_access == true ? "Yes" : "No"),
    },
    {
      name: "Trend Analytics",
      selector: (row) => (row.plan?.trend_analytics == true ? "Yes" : "No"),
    },
  ];
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">User Subscription</h4>
              <h5 className="card-category ml-auto "></h5>
            </div>
            <div className="card-body">
              <div className="toolbar">
                {/*        Here you can write extra buttons/actions for the toolbar              */}
              </div>
              <ReactDatatable data={subscriptionList} columns={columns} />
            </div>
            {/* end content*/}
          </div>
          {/*  end card  */}
        </div>
        {/* end col-md-12 */}
      </div>
      {/* end row */}
    </Layout>
  );
};

export default UserSubscription;
