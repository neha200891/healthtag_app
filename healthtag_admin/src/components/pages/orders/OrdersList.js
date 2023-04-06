import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Layout from "../../common/Layout";
import { getAllOrders } from "../../services/userServices";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactDatatable from "../../common/ReactDatatable";
const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllOrders().then((response) => {
      if (response.status === true) {
        setOrders(response.data);
      }
    });
  }, []);

  const columns = [
    { name: "OrderId", selector: (row) => row.id },
    { name: "Status", selector: (row) => row?.status && row?.status.toUpperCase() },
    { name: "Customer Name", selector: (row) => row?.user?.first_name },
    { name: "Mobile", selector: (row) => row?.user?.phone_no },
    { name: "Email", selector: (row) => row?.user?.email },
    { name: "Amount", selector: (row) => row?.total },
    { name: "Order Date", selector: (row) => moment(row?.createdAt).format("DD-MMM-YYYY") },
    {
      name: "Delivery Date",
      selector: (row) =>
        row?.expected_delivery_date ? moment(row?.expected_delivery_date).format("DD-MMM-YYYY") : "-",
    },
    {
      name: "Action",
      cell: (row) => (
        <a
          href="javascript:void(0)"
          onClick={() =>
            navigate("/order-details", {
              state: { orderId: row.id },
            })
          }
          className="btn btn-round btn-secondary btn-icon btn-sm"
        >
          <i className="fas fa-eye" />
        </a>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Layout>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header row">
                <h4 className="card-title">All Orders</h4>
                <h5 className="card-category ml-auto ">
                  {/* <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
              Download CSV
            </CSVLink> */}
                  ;
                </h5>
              </div>
              <div className="card-body">
                <div className="toolbar">
                  {/*        Here you can write extra buttons/actions for the toolbar              */}
                </div>
                <ReactDatatable data={orders} columns={columns} />
              </div>
              {/* end content*/}
            </div>
            {/*  end card  */}
          </div>
          {/* end col-md-12 */}
        </div>
        {/* end row */}
      </Layout>
    </div>
  );
};

export default OrdersList;
