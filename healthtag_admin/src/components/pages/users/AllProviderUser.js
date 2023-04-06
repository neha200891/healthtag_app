import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  blockUnblockUser,
  getAllProviderCustomer,
  getAllTenentCustomers,
  getAllUser,
  handleDeleteUser,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";

const AllProviderUser = () => {
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
      getAllProviderCustomer()
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  first_name: response.data[i]?.customer?.first_name,
                  last_name: response.data[i]?.customer?.last_name,
                  email: response.data[i]?.customer?.email,
                  phone_no: response.data[i]?.customer?.phone_no,
                  address: response.data[i]?.customer?.address,
                  age: response.data[i]?.customer?.age,
                  gender: response.data[i]?.customer?.gender,
                  createdAt: response.data[i]?.customer?.createdAt,
                  status: response.data[i]?.customer?.status,
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
  const columns = [
    { name: "Name", selector: (row) => row?.customer?.first_name + " " + row?.customer?.last_name },
    { name: "Email", selector: (row) => row?.customer?.email },
    { name: "Mobile", selector: (row) => row?.customer?.phone_no },
    { name: "Gender", selector: (row) => row?.customer?.gender },
    { name: "Provider", selector: (row) => row?.provider?.providerprofile?.business_name },
    {
      name: "status",
      cell: (row) => (
        <>
          {row?.customer?.status == "pending" ? (
            <span className="text-secondary">Pending</span>
          ) : row?.customer?.status == "blocked" ? (
            <span className="text-danger">Blocked</span>
          ) : (
            <span className="text-success">Active</span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <a
          href="javascript:void(0)"
          onClick={() => getToProfile(row?.customer.id)}
          className="btn btn-round btn-primary btn-icon btn-sm mx-2"
        >
          <i className="fas fa-edit" />
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

export default AllProviderUser;
