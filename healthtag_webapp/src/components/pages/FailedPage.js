import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetDataWithToken } from "../../apis/apiHelper";
import Layout from "../common/Layout";
import { changeOrderStatus } from "../services/productService";

const FailedPage = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const orderId = useSelector((state) => state.root.orderId);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    GetDataWithToken(`stripe/get-transection-details/${session_id}`, "").then((response) => {
      let postData;
      if (response.status === true) {
        if (response.data.payment_status == "paid" && response.data.status == "complete") {
          setSuccess(true);
          postData = {
            payment_id: response.data.id,
            orderId: orderId,
            status: "amount_paid",
          };
        } else {
          setSuccess(false);
          postData = {
            payment_id: response.data.id,
            orderId: orderId,
            status: "failed",
          };
        }
      } else {
        setSuccess(false);
        postData = {
          payment_id: response.data.id,
          orderId: orderId,
          status: "failed",
        };
      }
      changeOrderStatus(postData).then((res) => {
        if (res.status === true) {
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setLoading(false);
        }
      });
    });
  }, []);
  return (
    <Layout>
      {" "}
      <section className="section-8 py-5 py-lg-5">
        <div className="container pt-2 pt-lg-3">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center center-title ">
                {loading == true ? (
                  <h2>Please Wait!</h2>
                ) : (
                  <>
                    {success === true ? (
                      <>
                        <h2>Congratulations!</h2>
                        <h3 className="mt-3">Your Order has been placed</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                          been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type specimen book.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2>Ohh No!</h2>
                        <h3 className="mt-3">Order Faild</h3>
                        <p>Please Contact to us we will help you</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FailedPage;
