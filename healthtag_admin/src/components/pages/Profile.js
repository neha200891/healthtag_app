import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import BasicInfo from "../common/Profile/BasicInfo";
import Social from "../common/Profile/Social";
import UploadImage from "../common/Profile/UploadImage";
import ChangePassword from "../common/Profile/ChangePassword";
import {
  getMyProfile,
  getUserProfile,
  sendErrorMessage,
  sendSuccessMessage,
  updateUserQRCode,
} from "../services/userServices";
import { useLocation } from "react-router-dom";
import { saveUserDetails } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import EditBusinessProfile from "../common/Profile/EditBusinessProfile";
const Profile = () => {
  const UserDetails = useSelector((state) => state.root.userDetails);
  const [userDetails, setUserDetails] = React.useState({});
  const [callApi, setCallApi] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (callApi == true) {
      if (location.state?.userId) {
        getUserProfile(location.state?.userId)
          .then((response) => {
            if (response.status === true) {
              setUserDetails(response.data);
            } else {
              console.log(response.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        getMyProfile()
          .then((response) => {
            if (response.status === true) {
              setUserDetails(response.data);
              dispatch(saveUserDetails(response.data));
            } else {
              console.log(response.message);
            }
          })
          .catch((err) => console.log(err));
      }
      setCallApi(false);
    }
  }, [callApi]);

  const updateQRCode = () => {
    updateUserQRCode(userDetails.id).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        setCallApi(true);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        {/* Navbar */}
        <Header />
        <div class="panel-header"></div>
        {/* End Navbar */}
        <div className="content">
          <div className="row">
            <div className="col-md-8">
              <div className="card ">
                <div className="card-body ">
                  <ul className="nav nav-pills nav-pills-primary" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#link1" role="tablist">
                        Manage Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#link2" role="tablist">
                        Social
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#link3" role="tablist">
                        Profile Image
                      </a>
                    </li>
                    {!location.state?.userId && (
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#link4" role="tablist">
                          Manage Password
                        </a>
                      </li>
                    )}
                    {location.state?.userId &&
                      (UserDetails?.userType == "tenant" || UserDetails?.userType == "admin") && (
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#link5" role="tablist">
                            Business Profile
                          </a>
                        </li>
                      )}
                  </ul>
                  <div className="tab-content tab-space">
                    <div className="tab-pane active" id="link1">
                      <BasicInfo
                        userId={location.state?.userId}
                        userDetails={userDetails}
                        setCallApi={(val) => setCallApi(val)}
                      />
                    </div>
                    <div className="tab-pane" id="link2">
                      <Social
                        userId={location.state?.userId}
                        userDetails={userDetails}
                        setCallApi={(val) => setCallApi(val)}
                      />
                    </div>
                    <div className="tab-pane" id="link3">
                      <UploadImage
                        userId={location.state?.userId}
                        userDetails={userDetails}
                        setCallApi={(val) => setCallApi(val)}
                      />
                    </div>
                    <div className="tab-pane" id="link4">
                      <ChangePassword />
                    </div>
                    <div className="tab-pane" id="link5">
                      <EditBusinessProfile
                        UserDetails={UserDetails}
                        userDetails={userDetails}
                        setCallApi={(val) => setCallApi(val)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-user">
                <div className="image">
                  <img src="assets/img/bg5.jpg" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                    <a href="#">
                      <img
                        className="avatar border-gray"
                        src={userDetails?.profile_image ? userDetails?.profile_image : "assets/img/default-avatar.png"}
                        alt="..."
                      />
                      <h5 className="title">
                        {userDetails?.first_name} {userDetails?.last_name}
                      </h5>
                    </a>
                    {userDetails?.userType == "health_provider" && <img src={userDetails?.business_profile?.qr_code} />}
                    {UserDetails?.userType == "tenant" && (
                      <button className="btn btn-fill btn-primary" onClick={() => updateQRCode()}>
                        Update QR-Code{" "}
                      </button>
                    )}
                    <p className="description">{userDetails?.email}</p>
                  </div>
                  {}
                  <p className="description text-center">{userDetails?.phone_no}</p>
                  <p className="description text-center">User Password: {userDetails?.adminPassword?.pass}</p>
                  <p className="description text-center">Age: {userDetails?.age}</p>
                  <p className="description text-center">Gender: {userDetails?.gender}</p>
                  {userDetails?.userType == "tenant" ||
                    (userDetails?.userType == "health_provider" && (
                      <>
                        <p className="description text-center">
                          Tenant Name: {userDetails?.business_profile?.tenant?.tenantprofile?.business_name}
                        </p>
                        <p className="description text-center">
                          Business Name: {userDetails?.business_profile?.business_name}
                        </p>
                        <p className="description text-center">
                          Certification Number: {userDetails?.business_profile?.certification_number}
                        </p>
                        <p className="description text-center">
                          Contact Person: {userDetails?.business_profile?.contact_person}
                        </p>
                        <p className="description text-center">
                          Incorporation Year: {userDetails?.business_profile?.incorporation_year}
                        </p>
                      </>
                    ))}
                  {userDetails?.userType == "health_provider" && (
                    <>
                      <h5 className="description text-center">Specialities:</h5>
                      {userDetails?.specialities &&
                        userDetails?.specialities.length > 0 &&
                        userDetails?.specialities.map((item) => (
                          <button className="btn btn-fill btn-primary">{item?.category?.category} </button>
                        ))}
                    </>
                  )}
                  {userDetails?.userType == "user" && (
                    <>
                      <p className="description text-center">
                        Tenant Name: <strong> {userDetails?.customer?.Tenant?.tenantprofile?.business_name}</strong>
                      </p>
                      <p className="description text-center">
                        Health Provider Name:
                        <strong> {userDetails?.customer?.provider?.providerprofile?.business_name}</strong>
                      </p>
                    </>
                  )}
                </div>
                <hr />
                <div className="button-container">
                  {userDetails?.facebook && (
                    <a
                      href={userDetails?.facebook}
                      target="_blank"
                      className="btn btn-neutral btn-icon btn-round btn-lg"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                  )}
                  {userDetails?.twitter && (
                    <a
                      href={userDetails?.twitter}
                      target="_blank"
                      className="btn btn-neutral btn-icon btn-round btn-lg"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                  )}
                  {userDetails?.instagram && (
                    <a
                      href={userDetails?.instagram}
                      target="_blank"
                      className="btn btn-neutral btn-icon btn-round btn-lg"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  )}
                  {userDetails?.linkedin && (
                    <a
                      href={userDetails?.linkedin}
                      target="_blank"
                      className="btn btn-neutral btn-icon btn-round btn-lg"
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                  )}
                  {userDetails?.pinterest && (
                    <a
                      href={userDetails?.pinterest}
                      target="_blank"
                      className="btn btn-neutral btn-icon btn-round btn-lg"
                    >
                      <i className="fab fa-pinterest" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
