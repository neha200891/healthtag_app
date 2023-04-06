import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { buyNowItem, openBag } from "../../store/actions/userActions";
import { clearMyCart, handleChangeProdudctQTY, removeItemFromCart } from "../services/productService";
import { sendErrorInfo, sendErrorMessage } from "../services/userServices";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const Footer = () => {
  const cart = useSelector((state) => state.root.cart);
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.root.cartOpen);
  const navigate = useNavigate();

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

  const handleClearCart = () => {
    clearMyCart().then((response) => {
      if (response.status === true) {
        openBag();
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <div>
      <footer className="container pt-lg-5">
        <div className="row pt-lg-5">
          <div className="col-md-4">
            <div className="footer-logo">
              <img src="./assets/images/footer-logo.png" alt="" width height title />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry’s standard dummy text ever since the 1500s
              </p>
              <div className="card-img pt-4">
                <img src="./assets/images/credit-card.png" alt="" height width title />
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-center">
            <div className="footer-links">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-center">
            <div className="footer-links">
              <ul>
                <li>
                  <a href="#">COPD</a>
                </li>
                <li>
                  <a href="#">Asthma</a>
                </li>
                <li>
                  <a href="#">Diabetes</a>
                </li>
                <li>
                  <a href="#">Weight Management</a>
                </li>
                <li>
                  <a href="#">Hypertension</a>
                </li>
                <li>
                  <a href="#">Aging</a>
                </li>
                <li>
                  <a href="#">Fall prevention</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <div className="footer-title">Stay Connected</div>
              <div className="search-form">
                <form method="post" id="form" name="form">
                  <div className="search-text">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                      name="email"
                    />
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <div className="form-check pt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="check1"
                      name="option1"
                      defaultValue="something"
                      defaultChecked
                    />
                    <label className="form-check-label">
                      I have read and I agree with the Terms of Use and Privacy Policy.
                    </label>
                  </div>
                </form>
                <div className="d-flex footer-icon pt-lg-4">
                  <div>
                    <i className="fa-brands fa-linkedin" />
                  </div>
                  <div className="mx-3">
                    <i className="fa-brands fa-instagram" />
                  </div>
                  <div>
                    <i className="fa-brands fa-facebook" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer-bottom">
          <div className="col-12">
            <div className="d-lg-flex justify-content-lg-between align-items-center py-5">
              <div>
                <p>Copyright HealthTag App © 2022</p>
              </div>
              <div className="d-flex">
                <div>
                  <p>
                    <a href="#" title="Privacy Policy" target="_blank">
                      Terms of Use{" "}
                    </a>
                  </p>
                </div>
                <div className="mx-3">|</div>
                <div>
                  <p>
                    <a href="#" title="Terms of Service" target="_blank">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="mx-3">|</div>
                <div>
                  <p>
                    <a href="#" title="Terms of Service" target="_blank">
                      Cookie Policy
                    </a>
                  </p>
                </div>
                <div className="mx-3">|</div>
                <div>
                  <p>
                    <a href="#" title="Terms of Service" target="_blank">
                      Returns &amp; Warranty
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* cart modal */}
      <div className="modal fade" id="cartModal" tabIndex={-1} aria-labelledby="cartModalLabel" aria-hidden="true">
        <div className="modal-dialog float-end">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Your Bag
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="left-box">
                <div className="row">
                  <div className="col-12 d-flex justify-content-end ">
                    <div className="bag py-3">
                      <a href="javascript:void(0)" onClick={() => handleClearCart()} title="Clear Bag">
                        Clear Bag
                      </a>
                    </div>
                  </div>
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
                {cart?.CartItems &&
                  cart?.CartItems.length > 0 &&
                  cart?.CartItems.map((item, i) => (
                    <div className="product-list">
                      <div className="row">
                        <div className="col-3">
                          <div className="image">
                            <img
                              src={item?.product?.productimages && item?.product?.productimages[0].image}
                              width
                              height
                              title
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                          <div className="content">
                            <div className="product-title pb-4">{item?.product?.name}</div>

                            <div className="d-flex justify-content-between">
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
                                  defaultValue={1}
                                  min={1}
                                  value={item?.quantity}
                                  className="quantity"
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
                            </div>
                          </div>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-end">
                          <div>
                            <div className="price pb-3">${item?.product?.price}</div>
                            <div className="remove text-end">
                              <a href="javascript:void(0)" onClick={() => removeItem(item?.product?.id)} title="Remove">
                                Remove
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="product-total d-flex justify-content-between pt-4">
                  <div className="sub-toatl">Subtotal</div>
                  <div className="price">${cart?.total ? cart?.total : 0}</div>
                </div>

                <div className="tax text-end py-4">
                  <a href="javascript:void(0)">Taxes and shipping calculated at checkout</a>
                </div>
              </div>
              {cart?.total > 0 && (
                <button
                  onClick={() => {
                    {
                      dispatch(buyNowItem(null));
                      navigate("/checkout");
                    }
                  }}
                  className="btn btn_learn_more mb-2"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
