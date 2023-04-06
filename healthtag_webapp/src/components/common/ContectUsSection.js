import React from "react";

const ContectUsSection = () => {
  return (
    <section className="section-9  d-flex align-items-center pt-0">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12">
                <div className="center-title">
                  <h2>Contact us</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center contact-info">
                  <img src={process.env.PUBLIC_URL + "/assets/images/massages.png"} />
                  <p>
                    Chat with a <br /> health expert.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center contact-info">
                  <img src={process.env.PUBLIC_URL + "/assets/images/email_icon.png"} />
                  <p>
                    <a href="mailto:contact@healthtag.com" title="contact@healthtag.com">
                      contact@healthtag.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center contact-info">
                  <img src={process.env.PUBLIC_URL + "/assets/images/phone_icon.png"} />
                  <p>
                    <a href="tel:1-800-445-XXXX" title="1-800-445-XXXX">
                      1-800-445-XXXX
                    </a>{" "}
                    <br />
                    Mon-Fri 9AM - 6PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContectUsSection;
