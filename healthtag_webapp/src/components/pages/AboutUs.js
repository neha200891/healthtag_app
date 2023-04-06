import React from "react";
import ContectUsSection from "../common/ContectUsSection";
import Layout from "../common/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <main>
        <section className="banner about-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h1>About Us</h1>
                  <p>Who we are and why we do what we do</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-8 py-5 py-lg-5">
          <div className="container pt-2 pt-lg-3">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center center-title ">
                  <h2>HealthTag</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </p>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center pt-4">
              <div className="col-12 col-lg-8">
                <div className="row">
                  <div className="col-6">
                    <div>
                      <div className="card">
                        <div className="image">
                          <img src="images/over-vision.png" alt="" title width height />
                          <div className="cure-img">
                            <img src="images/curv_image.png" alt="" height width title />
                          </div>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">Our Vision</h3>
                          <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <div className="card">
                        <div className="image">
                          <img src="images/our-missoin.png" alt="" title width height />
                          <div className="cure-img">
                            <img src="images/curv_image.png" alt="" height width title />
                          </div>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">Our Mission</h3>
                          <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center pt-4 pt-lg-5 mt-4 mt-lg-5">
                  <div className="col-lg-9">
                    <div className="section-title text-center">
                      <h3>Our Goals</h3>
                      <p className="px-0">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.
                      </p>
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

export default AboutUs;
