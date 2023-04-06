import moment from "moment/moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";
import { getAllUserOrders } from "../../services/userServices";

const UserOrdersList = () => {
  const [orderList, setOrderList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getAllUserOrders(location.state.userId).then((response) => {
      if (response.status) {
        setOrderList(response.data);
      }
    });
  }, []);

  const columns = [
    {
      name: "OrderId",
      selector: (row) => row.id,
    },
    {
      name: "Product",
      selector: (row) => row.OrderItems[0].product.name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Order Amount",
      selector: (row) => row.total,
    },
    {
      name: "Purchase Date",
      selector: (row) => moment(row.createdAt).format("DD MMM, YYYY"),
    },
    {
      name: "Delivery Date",
      selector: (row) =>
        row?.expected_delivery_date ? moment(row?.expected_delivery_date).format("DD-MMM-YYYY") : "-",
    },
    {
      name: "Order Details",
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
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">User Order History</h4>
              <h5 className="card-category ml-auto ">
                {/* <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
              Download CSV
            </CSVLink> */}
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar">
                {/*        Here you can write extra buttons/actions for the toolbar              */}
              </div>
              <ReactDatatable data={orderList} columns={columns} />
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

export default UserOrdersList;
