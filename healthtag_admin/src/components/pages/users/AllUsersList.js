import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  blockUnblockUser,
  getAllUser,
  handleDeleteUser,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import Layout from "../../common/Layout";
import moment from "moment/moment";
import DataTable from "react-data-table-component";
import DataTableFilter from "../../common/DataTableFilter";
import ReactDatatable from "../../common/ReactDatatable";
const AllUsersList = () => {
  const [csvData, setCsvData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [usersList, setUserList] = useState([]);
  const navigate = useNavigate();
  const headers = [
    { label: "User Name", key: "fullname" },
    { label: "Email", key: "email" },
    { label: "Phone No", key: "phone_no" },
    { label: "Address", key: "address" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Join Date", key: "createdAt" },
    { label: "status", key: "status" },
  ];

  useEffect(() => {
    if (callApi === true) {
      getAllUser()
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  first_name: response.data[i].first_name,
                  last_name: response.data[i].last_name,
                  email: response.data[i].email,
                  phone_no: response.data[i].phone_no,
                  address: response.data[i].address,
                  age: response.data[i].age,
                  gender: response.data[i].gender,
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
  const goToList = (id, path) => {
    navigate(path, {
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
  const columns = [
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "User Type",
      selector: (row) => row.userType,
    },
    {
      name: "Last Update",
      cell: (row) => moment(row.updatedAt).format("DD MMM, YYYY hh:mm A"),
    },
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
      name: "Activities",
      button: true,
      cell: (user) => (
        <>
          <a
            href="javascript:void(0)"
            data-toggle="tooltip"
            title="User Orders"
            onClick={() => goToList(user.id, "/user-orders")}
            className="btn btn-round btn-primary btn-icon btn-sm"
          >
            <i class="fas fa-clipboard-list"></i>
          </a>
          <a
            href="javascript:void(0)"
            data-toggle="tooltip"
            title="User Subscription"
            onClick={() => goToList(user.id, "/user-subscription")}
            className="btn btn-round btn-primary btn-icon btn-sm"
          >
            <i class="fas fa-dollar-sign"></i>
          </a>
          <a
            href="javascript:void(0)"
            data-toggle="tooltip"
            title="User Devices"
            onClick={() => goToList(user.id, "/user-devices")}
            className="btn btn-round btn-primary btn-icon btn-sm mr-4"
          >
            <i class="fas fa-laptop-medical"></i>
          </a>
        </>
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (user) => (
        <>
          <a
            href="javascript:void(0)"
            onClick={() => getToProfile(user.id)}
            className="btn btn-round btn-primary btn-icon btn-sm ml-2"
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
            className="btn btn-round btn-danger btn-icon btn-sm"
          >
            <i className="fas fa-trash" />
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
              <h4 className="card-title">All User List</h4>
              <h5 className="card-category ml-auto ">
                <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
                  Download CSV
                </CSVLink>
                ;
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar">
                {/*        Here you can write extra buttons/actions for the toolbar              */}
              </div>
              <ReactDatatable data={usersList} columns={columns} />
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

export default AllUsersList;
