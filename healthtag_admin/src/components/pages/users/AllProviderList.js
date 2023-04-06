import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { callDataTable } from "../../services/endPoints";
import {
  blockUnblockUser,
  getAllProviders,
  getAllTenentCustomers,
  getAllTenents,
  getAllUser,
  handleDeleteUser,
  makeProviderAdmin,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";
const AllProviderList = () => {
  const [csvData, setCsvData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [usersList, setUserList] = useState([]);
  const navigate = useNavigate();
  const headers = [
    { label: "Business Name", key: "business_name" },
    { label: "Email", key: "email" },
    { label: "Phone No", key: "phone_no" },
    { label: "Address", key: "address" },
    { label: "Incorporation Year", key: "incorporation_year" },
    { label: "Certification No", key: "certification_number" },
    { label: "Join Date", key: "createdAt" },
    { label: "status", key: "status" },
  ];
  useEffect(() => {
    if (callApi === true) {
      getAllProviders()
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  business_name: response.data[i].providerprofile?.business_name,
                  email: response.data[i].email,
                  phone_no: response.data[i].phone_no,
                  address: response.data[i].address,
                  incorporation_year: response.data[i].providerprofile?.incorporation_year,
                  certification_number: response.data[i].providerprofile?.certification_number,
                  createdAt: response.data[i].createdAt,
                  status: response.data[i].status,
                });
                i++;
              }
              setCsvData(arr);
            }
            setUserList(response.data);
          }
        })
        .catch((err) => console.log(err));

      setCallApi(false);
    }
  }, [callApi]);

  const handleUserStatus = (id, status) => {
    let postData = {
      userId: id,
      status: status,
    };
    blockUnblockUser(postData).then((response) => {
      if (response.status === true) {
        setCallApi(true);
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const getToProfile = (id) => {
    navigate(`/profile`, {
      state: {
        userId: id,
      },
    });
  };
  const deleteUser = (id) => {
    swal({
      title: "Are you sure, you want to delete this user?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteUser(id).then((response) => {
          if (response.status === true) {
            sendSuccessMessage(response);
            // setUserList([...usersList.filter(user => user.id !== id)])
            setCallApi(true);
            // navigate("/dashboard")
          } else {
            sendErrorMessage(response);
          }
        });
      } else {
        return;
      }
    });
  };

  const changeAdminAccess = (providerId) => {
    makeProviderAdmin({ providerId: providerId }).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setCallApi(true);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const columns = [
    { name: "Business Name", selector: (user) => user?.providerprofile?.business_name },
    { name: "Email", selector: (user) => user.email },
    { name: "Mobile", selector: (user) => user.phone_no },
    { name: "Incorporation Year", selector: (user) => user?.providerprofile?.incorporation_year },
    { name: "Certification Number", selector: (user) => user?.providerprofile?.certification_number },
    { name: "is Admin", selector: (user) => (user?.providerprofile?.is_admin ? "Admin" : "NA") },
    {
      name: "Status",
      cell: (user) => (
        <>
          {user?.status == "pending" ? (
            <span className="text-secondary">Pending</span>
          ) : user?.status == "blocked" ? (
            <span className="text-danger">Blocked</span>
          ) : (
            <span className="text-success">Active</span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      cell: (user) => (
        <>
          <a
            href="javascript:void(0)"
            onClick={() => getToProfile(user.id)}
            className="btn btn-round btn-primary btn-icon btn-sm mx-2"
          >
            <i className="fas fa-edit" />
          </a>
          {user?.status == "pending" ? (
            <a
              href="javascript:void(0)"
              onClick={() => handleUserStatus(user.id, "active")}
              className="btn btn-round btn-success btn-icon btn-sm"
            >
              <i className="fas fa-check" />
            </a>
          ) : user?.status == "blocked" ? (
            <a
              href="javascript:void(0)"
              onClick={() => handleUserStatus(user?.id, "active")}
              className="btn btn-round btn-success btn-icon btn-sm"
            >
              <i className="fas fa-check" />
            </a>
          ) : (
            <a
              href="javascript:void(0)"
              onClick={() => handleUserStatus(user?.id, "blocked")}
              className="btn btn-round btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-ban" />
            </a>
          )}

          <a
            href="javascript:void(0)"
            onClick={() => deleteUser(user?.id)}
            className="btn btn-round btn-danger btn-icon btn-sm  mx-2"
          >
            <i className="fas fa-trash" />
          </a>
          <a
            href="javascript:void(0)"
            onClick={() => changeAdminAccess(user?.id)}
            className="btn btn-round btn-danger btn-icon btn-sm  mx-2"
          >
            <i className={user?.providerprofile?.is_admin ? "fas fa-user" : "fas fa-user-slash"}></i>
          </a>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">All Health Providers List</h4>
              <h5 className="card-category ml-auto ">
                <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
                  Download CSV
                </CSVLink>
                ;
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar"></div>
              <ReactDatatable columns={columns} data={usersList} />
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

export default AllProviderList;
