import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContectUsSection from "../common/ContectUsSection";
import Layout from "../common/Layout";
import { getCategoriesDetails, getProducts } from "../services/productService";

const CategoryDetails = () => {
  const [products, setProducts] = useState([]);
  const [CategoryDetails, setCategoryDetails] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });
  useEffect(() => {
    getCategoriesDetails(location.state.categoryId).then((response) => {
      if (response.status === true) {
        setCategoryDetails(response.data);
      }
    });
    getProducts(`categoryId=${location.state.categoryId}&page=${pagination.page}`).then((response) => {
      if (response.status === true) {
        setProducts(response.data.rows);
        setPagination({ ...pagination, totalPage: response.data.totalPages });
      }
    });
  }, [pagination.page]);
  return (
    <Layout>
      <main>
        <section className="banner about-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h1>{CategoryDetails?.category}</h1>
                  <p>{CategoryDetails?.short_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-16 py-4 py-lg-5">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-lg-7">
                <div className="section-title text-center">
                  <p>{CategoryDetails?.long_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section5 category-page">
          <div className="container">
            <div className="row pt-0 pt-lg-5 mt-0 mt-lg-3">
              {products &&
                products.length > 0 &&
                products.map((item, i) => (
                  <div className="col-12 col-md-6 col-lg-4 py-2 py-lg-5">
                    <div className="slides text-center d-flex justify-content-center">
                      <div className="text-center">
                        <div className="d-flex justify-content-center">
                          <img src={item?.productimages && item?.productimages[0].image} />
                        </div>
                        <p
                          onClick={() => navigate("/product-detail/" + item.id)}
                          className="pt-4"
                          style={{ cursor: "pointer" }}
                        >
                          {item?.name}
                        </p>
                        <p className="price">${item?.price}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {pagination.totalPage > 1 && (
                <div className="col-md-12 text-center my-2 my-lg-5 pb-3 pb-lg-5">
                  <button
                    disabled={pagination.page >= pagination.totalPage}
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    className="btn browse_products_catagory"
                  >
                    {" "}
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <ContectUsSection />
      </main>
    </Layout>
  );
};

export default CategoryDetails;
