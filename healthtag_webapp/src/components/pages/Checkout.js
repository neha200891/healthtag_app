import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { GetDataWithToken, PostDataWithToken } from "../../apis/apiHelper";
import { buyNowItem, openBag, saveOrderId } from "../../store/actions/userActions";
import ContectUsSection from "../common/ContectUsSection";
import IndexProductSlider from "../common/HomePage/IndexProductSlider";
import Layout from "../common/Layout";
import {
  checkoutCartItems,
  handleBuyNowItem,
  handleChangeProdudctQTY,
  removeItemFromCart,
} from "../services/productService";
import { sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../services/userServices";

const Checkout = () => {
  const cart = useSelector((state) => state.root.cart);
  const buyNow = useSelector((state) => state.root.buyNow);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();
  const navType = useNavigationType();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (navType == "POP") {
        dispatch(buyNowItem(null));
      }
    };
  }, [navigate]);

  useEffect(() => {
    document.body.classList.remove("show");
    let doc = document.getElementsByClassName("modal-backdrop fade show");
    //  modal-backdrop.fade.show
    var element = document.querySelector(".modal-backdrop.fade.show");
    if (element) {
      element.classList.remove("modal-backdrop", "fade", "show");
    }
    document.body.style.overflow = "scroll";
    GetDataWithToken("product/getServiceTax", "").then((response) => {
      if (response.status === true) {
        if (buyNow) {
          setTax((buyNow.price * response.data.tax) / 100);
        }
      }
    });
  }, []);

  const handleChangeQty = (quantity, productId) => {
    if (quantity == 0) {
      return sendErrorInfo("Minimum 1 item is required");
    }
    if (quantity > 10) {
      return sendErrorInfo("Maximum quantity is 10 ");
    }
    let postData = {
      productId: productId,
      cartId: cart?.id,
      quantity: quantity,
    };

    handleChangeProdudctQTY(postData).then((response) => {
      if (response.status === true) {
        openBag();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const removeItem = (productId) => {
    let postData = {
      productId: productId,
      cartId: cart?.id,
    };

    removeItemFromCart(postData).then((response) => {
      if (response.status === true) {
        openBag();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const handleGoToPayment = () => {
    let postData = {
      ...(buyNow != null ? { productId: buyNow.id } : { cart: JSON.stringify(cart) }),
    };
    PostDataWithToken("stripe/create-checkout-session", postData)
      .then((response) => {
        if (response.url) {
          if (buyNow) {
            let postData = {
              productId: buyNow.id,
              addressId: null,
              cardId: null,
            };
            handleBuyNowItem(postData).then((res) => {
              if (res.status === true) {
                dispatch(saveOrderId(res.data.id));
                window.location.href = response.url;
              } else {
                sendErrorMessage(res);
              }
            });
          } else {
            let postData = {
              cartId: cart.id,
              addressId: null,
              cardId: null,
            };
            checkoutCartItems(postData).then((res) => {
              if (res.status === true) {
                dispatch(saveOrderId(res.data.id));
                window.location.href = response.url;
              } else {
                sendErrorMessage(res);
              }
            });
          }
        } else {
          sendErrorInfo("Something went wrong try again");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <main>
        <section className="banner checkout-page">
          <div className="container checkout-bg">
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <div className="section-title  mx-3">
                  <div className="px-5 mx-5">
                    <h1>10% off</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-17">
          <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="left-box">
                  <div className="title">
                    {buyNow ? (
                      <h3>Shopping Cart ( 1 Item )</h3>
                    ) : (
                      <h3>Shopping Cart ( {cart?.CartItems ? cart?.CartItems.length : 0} Items )</h3>
                    )}
                  </div>
                  {!cart?.CartItems && (
                    <div className="product-list">
                      <div className="row">
                        <div className="col-12">
                          <h5>Cart is empty</h5>
                        </div>
                      </div>
                    </div>
                  )}

                  {buyNow ? (
                    <div className="product-list mt-5">
                      <div className="d-flex">
                        <div className="image">
                          <img
                            src={buyNow?.productimages && buyNow?.productimages[0].image}
                            width={150}
                            height={150}
                            title
                            alt=""
                          />
                        </div>
                        <div className="content mx-5 px-5">
                          <div className="product-title">{buyNow?.name}</div>
                          <div className="price py-4">${buyNow?.price}</div>
                          <div className="d-flex justify-content-between w-75"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    cart?.CartItems &&
                    cart?.CartItems.length > 0 &&
                    cart?.CartItems.map((item, i) => (
                      <div className="product-list mt-5">
                        <div className="d-flex">
                          <div className="image">
                            <img
                              src={item?.product?.productimages && item?.product?.productimages[0].image}
                              width={150}
                              height={150}
                              title
                              alt=""
                            />
                          </div>
                          <div className="content mx-5 px-5">
                            <div className="product-title">{item?.product?.name}</div>
                            <div className="price py-4">${item?.product?.price}</div>
                            <div className="d-flex justify-content-between w-75">
                              <div id="field1">
                                <button
                                  type="button"
                                  id="sub"
                                  onClick={() => handleChangeQty(item?.quantity - 1, item?.product?.id)}
                                  className="minus"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  id={1}
                                  value={item?.quantity}
                                  defaultValue={1}
                                  min={1}
                                  className="quantity"
                                  max={10}
                                />
                                <button
                                  type="button"
                                  id="add"
                                  onClick={() => handleChangeQty(item?.quantity + 1, item?.product?.id)}
                                  className="plus"
                                >
                                  +
                                </button>
                              </div>
                              <div className="remove">
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => removeItem(item?.product?.id)}
                                  title="Remove"
                                >
                                  Remove
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className="right-box">
                  <div className="title pb-4">Summary</div>
                  <div className="d-flex justify-content-between">
                    <div className="text">Subtotal</div>
                    {buyNow ? (
                      <div className="price">${buyNow?.price ? buyNow?.price : 0}</div>
                    ) : (
                      <div className="price">
                        ${cart?.total ? (cart?.total - cart?.delivery_charges).toFixed(2) || 0 : 0}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text">Estimated Shipping</div>
                    {buyNow ? (
                      <div className="price">${buyNow?.delivery_rate ? buyNow?.delivery_rate : 0}</div>
                    ) : (
                      <div className="price">${cart?.delivery_charges ? cart?.delivery_charges : 0}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text">Total</div>
                    {buyNow ? (
                      <div className="price">
                        ${buyNow?.price ? (buyNow?.price + tax + buyNow.delivery_rate).toFixed(2) : 0}
                      </div>
                    ) : (
                      <div className="price">${cart?.total ? cart?.total : 0}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between pt-4 estimated-tax">
                    <div className="text">Estimated Taxes</div>
                    <div className="price">
                      {" "}
                      {buyNow ? (
                        <div className="price">${tax}</div>
                      ) : (
                        <div className="price">${cart?.tax_amount ? cart?.tax_amount : 0}</div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex pb-4">
                    <div className="image">
                      <img src="./assets/images/credit-image.png" />
                    </div>
                  </div>
                </div>
                <div className="promo-code pt-3 pb-5 mt-4">
                  <div className="text pb-3">Promo Code</div>
                  <div className="search-form">
                    <form method="post" id="form" name="form">
                      <div className="search-text">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Promo code here"
                          name="zipcode"
                        />
                        <button type="submit" className="btn btn-primary">
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bottom-btn mt-4">
                  <button
                    type="submit"
                    onClick={() => handleGoToPayment()}
                    className="btn btn-primary"
                    title="Check Out"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section5 py-5">
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-12 section-title-II text-center py-3">
                <h2>You May Like</h2>
              </div>
            </div>
            <div className="row slider-row align-items-center">
              <IndexProductSlider />
            </div>
          </div>
        </section>
        <ContectUsSection />
      </main>
    </Layout>
  );
};

export default Checkout;
