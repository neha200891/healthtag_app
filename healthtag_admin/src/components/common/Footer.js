import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className=" container-fluid ">
        {/* <nav>
        <ul>
          <li>
            <a href="https://www.creative-tim.com">
              Creative Tim
            </a>
          </li>
          <li>
            <a href="http://presentation.creative-tim.com">
              About Us
            </a>
          </li>
          <li>
            <a href="http://blog.creative-tim.com">
              Blog
            </a>
          </li>
        </ul>
      </nav> */}
        <div className="copyright" id="copyright">
          ©2022
          {/* , Designed by */}
          <a href="#" target="_blank">
            Health Tag
          </a>
          {/* <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>. */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
