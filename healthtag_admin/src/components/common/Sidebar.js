import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
const Sidebar = () => {
  const userDetails = useSelector((state) => state.root.userDetails);
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("ht_adminState");
    cookie.remove("token", { path: "/" });
    navigate("/");
  };
  return (
    <div className="sidebar" data-color="orange">
      <div className="logo">
        <NavLink to="/dashboard" className="simple-text logo-mini">
          HT
        </NavLink>
        <NavLink to="/dashboard" className="simple-text logo-normal">
          Health Tag ADMIN
        </NavLink>
        <div className="navbar-minimize">
          <button id="minimizeSidebar" className="btn btn-simple btn-icon btn-neutral btn-round">
            <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
            <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
          </button>
        </div>
      </div>
      <div className="sidebar-wrapper" id="sidebar-wrapper">
        <div className="user">
          <div className="photo">
            <img src={userDetails?.profile_image ? userDetails?.profile_image : "assets/img/default-avatar.png"} />
          </div>
          <div className="info">
            <a data-toggle="collapse" href="#collapseExample" className="collapsed">
              <span>
                {userDetails?.first_name}
                <b className="caret" />
              </span>
            </a>
            <div className="clearfix" />
            <div className="collapse" id="collapseExample">
              <ul className="nav">
                <li>
                  <NavLink to={"/profile"}>
                    <span className="sidebar-mini-icon">MP</span>
                    <span className="sidebar-normal">My Profile</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="nav">
          <li className="active">
            <NavLink to="/dashboard">
              <i className="now-ui-icons design_app" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <a data-toggle="collapse" href="#pagesExamples">
              <i className="now-ui-icons design_image" />
              <p>
                User Management
                <b className="caret" />
              </p>
            </a>
            <div className="collapse " id="pagesExamples">
              <ul className="nav">
                {userDetails?.userType == "admin" && (
                  <>
                    <li>
                      <NavLink to="/createUser">
                        <span className="sidebar-mini-icon">CU</span>
                        <span className="sidebar-normal"> Create User </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/createTenant">
                        <span className="sidebar-mini-icon">CT</span>
                        <span className="sidebar-normal"> Create Tenant </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/all-users">
                        <span className="sidebar-mini-icon">AU</span>
                        <span className="sidebar-normal">All Users </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/all-tenants">
                        <span className="sidebar-mini-icon">AT</span>
                        <span className="sidebar-normal">All Tenants </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/lastLogins">
                        <span className="sidebar-mini-icon">LL</span>
                        <span className="sidebar-normal">Last Login</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/latestUsers">
                        <span className="sidebar-mini-icon">LU</span>
                        <span className="sidebar-normal">Latest Users </span>
                      </NavLink>
                    </li>
                  </>
                )}
                {(userDetails?.userType == "tenant" ||
                  (userDetails?.userType == "health_provider" && userDetails?.tenantAdmin == true)) && (
                  <>
                    <li>
                      <NavLink to="/createProvider">
                        <span className="sidebar-mini-icon">CP</span>
                        <span className="sidebar-normal">Create Provider </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/all-providers">
                        <span className="sidebar-mini-icon">AP</span>
                        <span className="sidebar-normal">All Providers </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/my-customers">
                        <span className="sidebar-mini-icon">
                          {userDetails?.userType == "health_provider" ? "TC" : "MC"}{" "}
                        </span>
                        <span className="sidebar-normal">
                          {" "}
                          {userDetails?.userType == "health_provider" ? "Tenant Customers" : "My Customers"}{" "}
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
                {userDetails?.userType == "health_provider" && (
                  <li>
                    <NavLink to="/my-users">
                      <span className="sidebar-mini-icon">MC</span>
                      <span className="sidebar-normal">My Customers </span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </li>
          {userDetails?.userType == "admin" && (
            <li>
              <a data-toggle="collapse" href="#formsExamples">
                <i className="now-ui-icons files_single-copy-04" />
                <p>
                  Product Management
                  <b className="caret" />
                </p>
              </a>
              <div className="collapse" id="formsExamples">
                <ul className="nav">
                  <li>
                    <NavLink to="/master">
                      <span className="sidebar-mini-icon">AM</span>
                      <span className="sidebar-normal"> Add Master </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addCategory">
                      <span className="sidebar-mini-icon">AC</span>
                      <span className="sidebar-normal"> Add Category </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addProduct">
                      <span className="sidebar-mini-icon">AP</span>
                      <span className="sidebar-normal"> Add Product </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categoriesList">
                      <span className="sidebar-mini-icon">CL</span>
                      <span className="sidebar-normal"> Categories List </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/productsList">
                      <span className="sidebar-mini-icon">PL</span>
                      <span className="sidebar-normal"> Product List </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {userDetails?.userType == "admin" && (
            <li>
              <a data-toggle="collapse" href="#componentsExamples">
                <i className="now-ui-icons education_atom" />
                <p>
                  Subscription Package
                  <b className="caret" />
                </p>
              </a>
              <div className="collapse " id="componentsExamples">
                <ul className="nav">
                  <li>
                    <NavLink to="/add-subscription">
                      <span className="sidebar-mini-icon">AS</span>
                      <span className="sidebar-normal"> Add Subscription </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/subscriptions">
                      <span className="sidebar-mini-icon">SL</span>
                      <span className="sidebar-normal"> Subscription List </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {userDetails?.userType == "admin" && (
            <li>
              <a data-toggle="collapse" href="#formsExamplesew">
                <i className="now-ui-icons files_single-copy-04" />
                <p>
                  Question Management
                  <b className="caret" />
                </p>
              </a>
              <div className="collapse" id="formsExamplesew">
                <ul className="nav">
                  <li>
                    <NavLink to="/add-question">
                      <span className="sidebar-mini-icon">AQ</span>
                      <span className="sidebar-normal"> Add Question </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/questions">
                      <span className="sidebar-mini-icon">QU</span>
                      <span className="sidebar-normal"> All Questions </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {userDetails?.userType == "admin" && (
            <li>
              <a data-toggle="collapse" href="#formBlogs">
                <i className="now-ui-icons files_single-copy-04" />
                <p>
                  Blogs Management
                  <b className="caret" />
                </p>
              </a>
              <div className="collapse" id="formBlogs">
                <ul className="nav">
                  <li>
                    <NavLink to="/add-blog">
                      <span className="sidebar-mini-icon">AB</span>
                      <span className="sidebar-normal"> Add Blog </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blogs">
                      <span className="sidebar-mini-icon">QB</span>
                      <span className="sidebar-normal"> All Blogs </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {userDetails?.userType == "admin" && (
            <li className="">
              <NavLink to="/orders">
                <i className="now-ui-icons files_single-copy-04" />
                <p>Order Management</p>
              </NavLink>
            </li>
          )}
          <li>
            <a data-toggle="collapse" href="#supportManagement">
              <i className="now-ui-icons design_image" />
              <p>
                Support Management
                <b className="caret" />
              </p>
            </a>
            <div className="collapse " id="supportManagement">
              <ul className="nav">
                {userDetails?.userType == "admin" && (
                  <>
                    <li>
                      <NavLink to="/support-topic">
                        <span className="sidebar-mini-icon">AT</span>
                        <span className="sidebar-normal"> Add Support Topic </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/support">
                        <span className="sidebar-mini-icon">TL</span>
                        <span className="sidebar-normal"> Ticket List </span>
                      </NavLink>
                    </li>
                  </>
                )}
                {(userDetails?.userType == "tenant" ||
                  (userDetails?.userType == "health_provider" && userDetails?.tenantAdmin == true)) && (
                  <>
                    <li>
                      <NavLink to="/createProvider">
                        <span className="sidebar-mini-icon">CP</span>
                        <span className="sidebar-normal">Create Provider </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/all-providers">
                        <span className="sidebar-mini-icon">AP</span>
                        <span className="sidebar-normal">All Providers </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/my-customers">
                        <span className="sidebar-mini-icon">
                          {userDetails?.userType == "health_provider" ? "TC" : "MC"}{" "}
                        </span>
                        <span className="sidebar-normal">
                          {" "}
                          {userDetails?.userType == "health_provider" ? "Tenant Customers" : "My Customers"}{" "}
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
                {userDetails?.userType == "health_provider" && (
                  <li>
                    <NavLink to="/my-users">
                      <span className="sidebar-mini-icon">MC</span>
                      <span className="sidebar-normal">My Customers </span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </li>

          <li>
            <a data-toggle="collapse" href="#formsExamples" onClick={() => logoutUser()}>
              <i className="now-ui-icons files_single-copy-04" />
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
