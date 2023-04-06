import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";
import { getAllUserDevices } from "../../services/userServices";

const UserDevicesList = () => {
  const [devicesList, setDevicesList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getAllUserDevices(location.state.userId).then((response) => {
      if (response.status === true) {
        setDevicesList(response.data);
      }
    });
  }, []);

  const columns = [
    {
      name: "Device Nick Name",
      selector: (row) => row.nick_name,
    },
    {
      name: "Serial No",
      selector: (row) => row.product_sno,
    },
    {
      name: "Product Name",
      selector: (row) => row.product.name,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          className="table_img"
          src={row?.product.productimages ? row?.product.productimages[0].image : "assets/img/default-avatar.png"}
        />
      ),
    },
  ];
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">User Connected Devices</h4>
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
              <ReactDatatable data={devicesList} columns={columns} />
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

export default UserDevicesList;
