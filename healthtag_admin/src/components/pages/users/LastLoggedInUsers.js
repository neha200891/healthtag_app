import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { callDataTable } from "../../services/endPoints";
import {
  blockUnblockUser,
  getAllUser,
  getLastLogginInUsers,
  getLetestUsers,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";

const LastLoggedInUsers = () => {
  const [callApi, setCallApi] = useState(true);
  const [usersList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (callApi === true) {
      getLastLogginInUsers()
        .then((response) => {
          if (response.status === true) {
            setUserList(response.data);
          }
        })
        .catch((err) => console.log(err));

      setCallApi(false);
    }
  }, [callApi]);
  const getToProfile = (id) => {
    navigate(`/profile`, {
      state: {
        userId: id,
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
                  <h4 className="card-title">Latest Loggedin User List</h4>
                </div>
                <div className="card-body">
                  <div className="toolbar">
                    {/*        Here you can write extra buttons/actions for the toolbar              */}
                  </div>
                  <table className="table table-striped table-bordered data_table" cellSpacing={0} width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Device Id</th>
                        <th>Timezone</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList &&
                        usersList.length > 0 &&
                        usersList.map((user, index) => (
                          <tr>
                            <td>
                              {user?.first_name} {user?.last_name}
                            </td>
                            {/* <td><img className="table_img" src={user?.profile_image ? user?.profile_image : "assets/img/default-avatar.png"} /> </td> */}
                            <td>{user?.email}</td>
                            <td>{user?.phone_no}</td>
                            <td>{user?.gender}</td>
                            <td>{user?.age}</td>
                            <th>{user?.device_model}</th>
                            <th>{user?.timezone}</th>
                            <td>
                              {user?.is_blocked == "true" ? (
                                <span className="text-danger">Blocked</span>
                              ) : (
                                <span className="text-success">Active</span>
                              )}
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

export default LastLoggedInUsers;
