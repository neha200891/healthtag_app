import React from "react";
import Layout from "../../common/Layout";

const UsersReportListing = () => {
  return (
    <Layout>
      <div className="filter-result">
        <p className="mb-30 ff-montserrat">Total Job Openings : 89</p>
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
          <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">FD</div>
            <div className="job-content">
              <h5 className="text-center text-md-left">Front End Developer</h5>
              <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                <li className="mr-md-4">
                  <i className="zmdi zmdi-pin mr-2" /> Los Angeles
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-money mr-2" /> 2500-3500/pm
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-time mr-2" /> Full Time
                </li>
              </ul>
            </div>
          </div>
          <div className="job-right my-4 flex-shrink-0">
            <a href="#" className="btn d-block w-100 d-sm-inline-block btn-light">
              Apply now
            </a>
          </div>
        </div>
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
          <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">UX</div>
            <div className="job-content">
              <h5 className="text-center text-md-left">Ui/Ux Developer</h5>
              <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                <li className="mr-md-4">
                  <i className="zmdi zmdi-pin mr-2" /> Los Angeles
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-money mr-2" /> 2500-3500/pm
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-time mr-2" /> Full Time
                </li>
              </ul>
            </div>
          </div>
          <div className="job-right my-4 flex-shrink-0">
            <a href="#" className="btn d-block w-100 d-sm-inline-block btn-light">
              Apply now
            </a>
          </div>
        </div>
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
          <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">GD</div>
            <div className="job-content">
              <h5 className="text-center text-md-left">Graphic Designer</h5>
              <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                <li className="mr-md-4">
                  <i className="zmdi zmdi-pin mr-2" /> Los Angeles
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-money mr-2" /> 2500-3500/pm
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-time mr-2" /> Full Time
                </li>
              </ul>
            </div>
          </div>
          <div className="job-right my-4 flex-shrink-0">
            <a href="#" className="btn d-block w-100 d-sm-inline-block btn-light">
              Apply now
            </a>
          </div>
        </div>
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
          <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">JS</div>
            <div className="job-content">
              <h5 className="text-center text-md-left">Javascript Developer</h5>
              <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                <li className="mr-md-4">
                  <i className="zmdi zmdi-pin mr-2" /> Los Angeles
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-money mr-2" /> 2500-3500/pm
                </li>
                <li className="mr-md-4">
                  <i className="zmdi zmdi-time mr-2" /> Full Time
                </li>
              </ul>
            </div>
          </div>
          <div className="job-right my-4 flex-shrink-0">
            <a href="#" className="btn d-block w-100 d-sm-inline-block btn-light">
              Apply now
            </a>
          </div>
        </div>
      </div>
      {/* START Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-reset justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
              <i className="zmdi zmdi-long-arrow-left" />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item d-none d-md-inline-block">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item d-none d-md-inline-block">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              8
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="zmdi zmdi-long-arrow-right" />
            </a>
          </li>
        </ul>
      </nav>
      {/* END Pagination */}
    </Layout>
  );
};

export default UsersReportListing;
