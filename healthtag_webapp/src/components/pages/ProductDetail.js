import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";

import OwlCarousel from "react-owl-carousel";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductDetails, getProducts, handleAddToCart, handleBuyNowItem } from "../services/productService";
import { sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../services/userServices";
import ContectUsSection from "../common/ContectUsSection";
import IndexProductSlider from "../common/HomePage/IndexProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { buyNowItem } from "../../store/actions/userActions";
const ProductDetail = () => {
  const location = useLocation();
  const userDetails = useSelector((state) => state.root.userDetails);
  const [product, setProductDetails] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetails(productId).then((response) => {
      if (response.status === true) {
        setProductDetails(response.data);
        setPreviewImg(response.data.productimages && response.data.productimages[0].image);
      }
    });
  }, [productId]);

  const addToCart = () => {
    if (!userDetails?.token) {
      navigate("/login");
      return sendErrorInfo("please login first");
    }
    handleAddToCart({ productId: product.id }).then((response) => {
      if (response.status == true) {
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const buynow = () => {
    if (!userDetails?.token) {
      navigate("/login");
      return sendErrorInfo("please login first");
    }
    dispatch(buyNowItem(product));
    navigate("/checkout");
  };
  return (
    <Layout>
      <main>
        <section className="section-14 py-3">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Diabetes</a>
                    </li>
                    <li className="breadcrumb-item active">{product?.name}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="section-13 py-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="slider-section">
                  <div className="d-flex justify-content-center">
                    <div className=" center-image" id="slider-for">
                      <div className="item d-flex justify-content-center ">
                        <img src={previewImg} width="100%" height title alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="products-slider py-5">
                    <OwlCarousel className="owl-theme" loop margin={10} nav={false} id="slider-nav">
                      {product?.productimages &&
                        product?.productimages.length > 0 &&
                        product?.productimages.map((item, index) => (
                          <div className="item d-flex justify-content-center" key={index}>
                            <img
                              src={item?.image}
                              width
                              height
                              title
                              alt=""
                              onClick={() => setPreviewImg(item?.image)}
                            />
                          </div>
                        ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="detail-section">
                  <div className="title">
                    <h2>{product?.name}</h2>
                    <span>{product?.category?.category}</span>
                    <div className="d-flex pt-2">
                      <div className="rating">
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                        <i className="fa-solid fa-star" />
                      </div>
                      <div className="count px-4">4.0 (20)</div>
                      <div className="write-review">
                        <a href="#" title="Write a review">
                          Write a review
                        </a>
                      </div>
                    </div>
                    <div>
                      <p>{product?.short_desc}</p>
                    </div>
                    <div className="price py-4">${product?.price}</div>
                    <div className="product-btn">
                      <div>
                        <a
                          href="javascript:void(0)"
                          onClick={() => buynow(product.id)}
                          className="btn btn-primary"
                          title="Buy Now"
                        >
                          Buy Now
                        </a>
                      </div>
                      <div>
                        <a
                          href="javascript:void(0)"
                          onClick={() => addToCart()}
                          className="btn btn-secondary"
                          title="Add to Cart"
                        >
                          Add to Cart
                        </a>
                      </div>
                    </div>
                    <div className="social-icons">
                      <small>Share</small>
                      <div className="d-flex pt-2">
                        <div>
                          <a href="#" title="Pinterest">
                            <i className="fa-brands fa-pinterest" />
                          </a>
                        </div>
                        <div className="mx-3">
                          <a href="#" title="Facebook">
                            <i className="fa-brands fa-facebook" />
                          </a>
                        </div>
                        <div>
                          <a href="#" title="Email">
                            <i className="fa-solid fa-envelope" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-15 py-5 my-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <div>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Description
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">{product?.long_desc}</div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            How to use
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>{product?.how_to_use}</p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Reviews
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                              been the industry’s standard dummy text ever since the 1500s, when an unknown printer took
                              a galley of type and scrambled it to make a type specimen book. It has survived not only
                              five centuries, but also the leap into electronic typesetting, remaining essentially
                              unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                              PageMaker including versions of Lorem Ipsum.
                            </p>
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
        <section className="section5 py-5 my-5">
          <div className="container">
            <div className="main-title text-center">
              <h2>Recommended Products</h2>
            </div>
            <div className="row slider-row align-items-center pt-5 mt-3">
              <IndexProductSlider />
            </div>
          </div>
        </section>
        <ContectUsSection />
      </main>
    </Layout>
  );
};

export default ProductDetail;
