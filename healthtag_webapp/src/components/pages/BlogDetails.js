import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IndexBlogs from "../common/HomePage/IndexBlogs";
import Layout from "../common/Layout";
import { getBlogDetails } from "../services/contentService";
const BlogDetails = () => {
  const location = useLocation();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    getBlogDetails(location.state.blogId).then((response) => {
      if (response.status === true) {
        setBlog(response.data);
      }
    });
  }, []);
  return (
    <Layout>
      <section className="banner blog_details_bg" style={{ backgroundImage: `url(${blog?.image})` }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-12 col-lg-8">
              <div className="section-title">
                <h1>{blog?.heading}</h1>
                <p className="px-2">Share</p>
                <div className="text-white">
                  <i className="fa-brands fa-pinterest px-2" />
                  <i className="fa-brands fa-facebook px-2" />
                  <i className="fa-regular fa-envelope px-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-24 mt-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-12 col-lg-8">
              <div className="row g-0">
                <div className="col-md-12 blog_detail_text" dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <IndexBlogs heading={"Related Topics"} />
    </Layout>
  );
};

export default BlogDetails;
