import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from "../services/productService";
import { saveCategories } from "../../store/actions/userActions";
import IndexBlogs from "../common/HomePage/IndexBlogs";
import IndexProductSlider from "../common/HomePage/IndexProductSlider";
const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.root.categories);

  useEffect(() => {
    getCategories().then((response) => {
      if (response.status === true) {
        dispatch(saveCategories(response.data));
      }
    });
  }, []);
  return (
    <Layout>
      <section className="section2 background_home_image mb-0 mb-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 always_connected">
                  <img src={process.env.PUBLIC_URL + "/assets/images/always_connected.png"} />
                  <h2 className="mb-3 mb-lg-5">
                    Always stay <br />
                    connected
                  </h2>
                  <p>
                    Your doctor, your family, anyone you want can
                    <br /> stay updated on your health progress
                  </p>
                  <button className="btn btn_learn_more"> Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section3 mt-4 mt-lg-5 pt-lg-5 mb-lg-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="row">
                {categories &&
                  categories.length > 0 &&
                  categories.map((item, index) => (
                    <div className="col-12 col-md-6 col-lg-3 text-center" key={index}>
                      <img src={item.image} />
                      <p> {item.category} </p>
                      <a
                        href="javascript:void(0)"
                        onClick={() =>
                          navigate("/category-details", {
                            state: {
                              categoryId: item.id,
                            },
                          })
                        }
                      >
                        View Products{" "}
                      </a>
                    </div>
                  ))}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section4 link_section_bg d-flex align-items-center  pt-0 pt-lg-4">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="row ">
                <div className="col-12 col-md-12 col-lg-6 d-flex align-items-center ">
                  <div>
                    <h2>Link+</h2>
                    <p className="mt-0 mt-lg-4">
                      The Link+ easily connects you to healthcare <br />
                      solutions through our E3 platform. The Link+ <br />
                      automatically connects to any peripheral, so <br />
                      you can take back control of your health.
                    </p>
                    <button className="btn link_btn">Learn More</button>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                  <div className="outer-image">
                    <img src={process.env.PUBLIC_URL + "/assets/images/link_left.png"} />
                    <div className="inner-image">
                      <img src={process.env.PUBLIC_URL + "/assets/images/htalink.png"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section7 desktop">
        <div className="container">
          <div className="row pb-5 mb-5">
            <div className="col-md-12 text-center">
              <div className="title">
                <h2>How It Works</h2>
              </div>
            </div>
          </div>
          {/* <div class="row order-4">
			<div class="col-md-12">
				<div class="contant-box d-flex justify-content-center">
					<div class="icon-outer">
						<div class="image">
                       		<img src={process.env.PUBLIC_URL +"/assets/images/cicrle-image.png"} alt="" height="" width="" title="">
                       		<div class="text text-center py-3">
								Stores your data <br>in the cloud.
							</div>
                   		</div>
					</div>	
				</div>
			</div>
		</div>
		<div class="row py-5 my-5 order-3">
			<div class="col-md-4">
				<div class="contant-box d-flex justify-content-center">
					<div class="icon-outer">
						<div class="image">
							<div class="d-flex align-items-center">
								<img src={process.env.PUBLIC_URL +"/assets/images/bluetooth_aromatically connects.png"} alt="" height="" width="" title="">
								<div class="mx-5">
									<img src={process.env.PUBLIC_URL +"/assets/images/left-arrow.png"} width="" height="" align="" title="">
								</div>	
							</div>
                       		<div class="text py-3 mx-5">
								Bluetooth aromatically <br>connects to your device.
							</div>
                   		</div>
					</div>	
				</div>
			</div>
			<div class="col-md-4">
				<div class="contant-box d-flex justify-content-center">
					<div class="icon-outer">
						<div class="image">
							<div class="text-center">
								<div>
									<div>
										<img src={process.env.PUBLIC_URL +"/assets/images/up-arrow.png"} width="" height="" align="" title="">
									</div>
									<div>
                       					<img src={process.env.PUBLIC_URL +"/assets/images/center-card.png"} alt="" height="" width="" title="">		
									</div>	
								</div>
							</div>
                   		</div>
					</div>	
				</div>
			</div>
			<div class="col-md-4">
				<div class="contant-box d-flex justify-content-center">
					<div class="right-box">
						<div class="icon-outer">
							<div class="image">
	                       		<img src={process.env.PUBLIC_URL +"/assets/images/convert_understand.png"} alt="" height="" width="" title="">
	                       		<div class="text text-center py-3">
									Stores your data <br>in the cloud.
								</div>
								<div class="arrow-top">
									<img src={process.env.PUBLIC_URL +"/assets/images/arrow-down.png"} width="" height="" align="" title="">
								</div>
								<div class="arrow-bottom">
									<img src={process.env.PUBLIC_URL +"/assets/images/arrow-right-down.png"} width="" height="" align="" title="">
								</div>
	                   		</div>
						</div>		
					</div>
				</div>
			</div>
		</div>
		<div class="row d-flex justify-content-center">
			<div class="col-md-10">
				<div class="d-flex justify-content-center">
					<div class="contant-box d-flex justify-content-center ">
						<div class="icon-outer">
							<div class="image">
								<div class="d-flex align-items-center">
									<div class="d-flex align-items-center">
										<img src={process.env.PUBLIC_URL +"/assets/images/understand_health.png"} alt="" height="" width="" title="">
									</div>
								</div>
	                       		<div class="text text-center py-3">
									Stores your data <br>in the cloud.
								</div>
	                   		</div>
						</div>	
					</div>
					<div class="mx-5 px-5">
						<div class="center-arrow">
							<img src={process.env.PUBLIC_URL +"/assets/images/left-arrow.png"} width="" height="" align="" title="">
						</div>	
					</div>
					<div class="contant-box d-flex justify-content-center">
						<div class="icon-outer">
							<div class="image">
	                       		<img src={process.env.PUBLIC_URL +"/assets/images/provider_can_health_data.png"} alt="" height="" width="" title="">
	                       		<div class="text text-center py-3">
									Stores your data <br>in the cloud.
								</div>
	                   		</div>
						</div>	
					</div>
				</div>
			</div>
		</div> */}
          <div className="row">
            <div className="col-12 order-3 order-lg-1">
              <div className="contant-box d-flex justify-content-center">
                <div className="icon-outer">
                  <div className="image">
                    <img src={process.env.PUBLIC_URL + "/assets/images/cicrle-image.png"} alt="" height width title />
                    <div className="text text-center py-3">
                      Stores your data <br />
                      in the cloud.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 order-1 order-lg-2">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="contant-box d-flex justify-content-center">
                    <div className="icon-outer">
                      <div className="image">
                        <div className="d-lg-flex align-items-lg-center">
                          <img
                            src={process.env.PUBLIC_URL + "/assets/images/bluetooth_aromatically connects.png"}
                            alt=""
                            height
                            width
                            title
                          />
                          <div className="mx-5 desktop-d">
                            <img
                              src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"}
                              width
                              height
                              align
                              title
                            />
                          </div>
                        </div>
                        <div className="text py-3 mx-5">
                          Bluetooth aromatically <br />
                          connects to your device.
                        </div>
                        <div className="mx-5 m-image-center">
                          <img
                            src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"}
                            width
                            height
                            align
                            title
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="contant-box d-flex justify-content-center">
                    <div className="icon-outer">
                      <div className="image">
                        <div className="text-center">
                          <div>
                            <div className="d-desktop">
                              <img
                                src={process.env.PUBLIC_URL + "/assets/images/up-arrow.png"}
                                width
                                height
                                align
                                title
                              />
                            </div>
                            <div>
                              <img
                                src={process.env.PUBLIC_URL + "/assets/images/center-card.png"}
                                alt=""
                                height
                                width
                                title
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="contant-box d-flex justify-content-center">
                    <div className="right-box">
                      <div className="icon-outer">
                        <div className="image">
                          <img
                            src={process.env.PUBLIC_URL + "/assets/images/convert_understand.png"}
                            alt=""
                            height
                            width
                            title
                          />
                          <div className="text text-center py-3">
                            Stores your data <br />
                            in the cloud.
                          </div>
                          <div className="arrow-top">
                            <img
                              src={process.env.PUBLIC_URL + "/assets/images/arrow-down.png"}
                              width
                              height
                              align
                              title
                            />
                          </div>
                          <div className="arrow-bottom">
                            <img
                              src={process.env.PUBLIC_URL + "/assets/images/arrow-right-down.png"}
                              width
                              height
                              align
                              title
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 order-2 order-lg-3">
              <div className="row d-flex justify-content-center">
                <div className=" col-12 col-md-10">
                  <div className="d-lg-flex justify-content-center">
                    <div className="contant-box d-flex justify-content-center ">
                      <div className="icon-outer">
                        <div className="image">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <img
                                src={process.env.PUBLIC_URL + "/assets/images/understand_health.png"}
                                alt=""
                                height
                                width
                                title
                              />
                            </div>
                          </div>
                          <div className="text text-center py-3">
                            Stores your data <br />
                            in the cloud.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-5 px-5">
                      <div className="center-arrow">
                        <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                      </div>
                    </div>
                    <div className="contant-box d-lg-flex justify-content-center">
                      <div className="icon-outer">
                        <div className="image">
                          <img
                            src={process.env.PUBLIC_URL + "/assets/images/provider_can_health_data.png"}
                            alt=""
                            height
                            width
                            title
                          />
                          <div className="text text-center py-3">
                            Stores your data <br />
                            in the cloud.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-7 m-device">
        <div className="container">
          <div className="row pb-5 mb-5">
            <div className="col-md-12 text-center py-4">
              <div className="title">
                <h2>How It Works</h2>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div>
                <div className="py-4 text-center circle-img">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/bluetooth_aromatically connects.png"}
                    alt=""
                    height
                    width
                    title
                  />
                </div>
                <div className="text">
                  Bluetooth aromatically <br />
                  connects to your device.
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <div className="arrow-imgs">
                    <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                  </div>
                </div>
                <div className="card-img text-center">
                  <img src={process.env.PUBLIC_URL + "/assets/images/center-card.png"} alt="" height width title />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <div className="arrow-imgs">
                    <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                  </div>
                </div>
                <div className="mt-5 text-center circle-img">
                  <img src={process.env.PUBLIC_URL + "/assets/images/cicrle-image.png"} alt="" height width title />
                </div>
                <div className="text py-3">
                  Bluetooth aromatically <br />
                  connects to your device.
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <div className="arrow-imgs">
                    <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                  </div>
                </div>
                <div className="mt-5 text-center circle-img">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/convert_understand.png"}
                    alt=""
                    height
                    width
                    title
                  />
                </div>
                <div className="text py-3">
                  Bluetooth aromatically <br />
                  connects to your device.
                </div>
                <div className="d-flex justify-content-center py-4">
                  <div className="d-flex">
                    <div className="arrow-left">
                      <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                    </div>
                    <div className="mx-2" />
                    <div className="arrow-right">
                      <img src={process.env.PUBLIC_URL + "/assets/images/left-arrow.png"} width height align title />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <div className="d-flex">
                    <div className="circle-img">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/understand_health.png"}
                        width
                        height
                        align
                        title
                      />
                    </div>
                    <div className="mx-3" />
                    <div className="circle-img">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/provider_can_health_data.png"}
                        alt=""
                        height
                        width
                        title
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section5 pt-2 pt-lg-5">
        <div className="container">
          <div className="row slider-row align-items-center">
            <div className="col-md-12 text-center mb-5">
              <span className="bg_font">PRODUCTS</span>
            </div>
            <IndexProductSlider />
            <div className="col-md-12 text-center mt-2 mt-lg-5">
              <button className="btn browse_products_catagory"> Browse Products by Catagory</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section5 py-3 py-lg-5">
        <div className="container py-3 py-lg-5">
          <div className="row slider-row align-items-center pt-5">
            <div className="col-12 col-md-12">
              <OwlCarousel className="owl-theme" loop margin={10} nav id="logo-slider">
                <div className="slides text-center d-flex justify-content-center">
                  <div className="text-center d-flex justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/assets/images/omron.png"} />
                  </div>
                </div>
                <div className="slides text-center d-flex justify-content-center">
                  <div className="text-center d-flex justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/assets/images/medtronic.png"} />
                  </div>
                </div>
                <div className="slides text-center d-flex justify-content-center">
                  <div className="text-center d-flex justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/assets/images/danaher.png"} />
                  </div>
                </div>
                <div className="slides text-center d-flex justify-content-center">
                  <div className="text-center d-flex justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/assets/images/baxter.png"} />
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
      <IndexBlogs heading={"HealthTag Blog"} />
    </Layout>
  );
};

export default Index;
