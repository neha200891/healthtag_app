import React from "react";
import ContectUsSection from "../common/ContectUsSection";
import Layout from "../common/Layout";
const ContactUs = () => {
  return (
    <Layout>
      <main>
        <section className="banner faq-bg">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="section-title">
                  <h1>Contact Us.</h1>
                  <p>all of our contact info phone, emails etc.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-11 py-5 my-5">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-6 ">
                    <div className="left-box">
                      <div>
                        <img src="./assets/images/contact-img.png" alt="" title width height />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="search-form">
                      <div>
                        <p>
                          If you want to contact us, it’s simple! Fill your contact information and leave us a message.
                          You can also send us an e-mail to contact@healthtag.com and we will get back to you as soon as
                          possible!
                        </p>
                      </div>
                      <form>
                        <div className="mb-3">
                          <input type="text" className="form-control" id="name" placeholder="First Name & Last Name" />
                        </div>
                        <div className="mb-3">
                          <input type="email" className="form-control" id="email" name="email" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phome"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows={3}
                            placeholder="Message"
                            defaultValue={""}
                          />
                        </div>
                        <div className="mb-3">
                          <a href="#" className="btn btn-primary" title="Submit">
                            Submit
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ContectUsSection />
      </main>
    </Layout>
  );
};

export default ContactUs;
