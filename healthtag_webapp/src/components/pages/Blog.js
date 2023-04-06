import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContectUsSection from "../common/ContectUsSection";
import Layout from "../common/Layout";
import { getAllBlogs } from "../services/contentService";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllBlogs().then((response) => {
      if (response.status === true) {
        setBlogs(response.data);
      }
    });
  }, []);
  return (
    <Layout>
      <section className="banner bg_21">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h1>Blog</h1>
                <p>Hear the latest from experts in their fields.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="section-21 bg_21 mb-5 d-flex align-items-center">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
			     <div class="row">
			     	<div class="col-md-12 always_connected">
			     		<h2 class="mb-5">Blog</h2>
			     		<p>Hear the latest from experts in their fields.</p>
			     	</div>
			     </div>
			</div>
	    </div>
	</div>
</section> */}
      <section className="section-23 mt-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-12 col-lg-8">
              <div className="row g-0">
                <div className="col-12 col-md-12 col-lg-7">
                  <img src={"./assets/images/blog_img.png"} width="100%" />
                </div>
                <div className="col-12 col-md-12 col-lg-5 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center blog_top_section">
                    <div>
                      <h4 className="eat_right"> Eat right, live right </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-22 py-lg-5 d-flex align-items-center">
        <div className="container py-lg-5">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-12 col-lg-8">
              <div className="row">
                <div className="col-md-12 text-center pb-3 pb-lg-5">
                  <h3 className="helth_tag">HealthTag Blog</h3>
                </div>
                {blogs &&
                  blogs.length > 0 &&
                  blogs.map((item, i) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-5 mt-3 mt-lg-5" key={i}>
                      <div className="card">
                        <div className>
                          <img src={item.image} className="card-img-top" />
                          <div className="card-body">
                            <p>{item.heading}</p>
                            <a
                              href="javascript:void(0)"
                              onClick={() => navigate("/blog-detail", { state: { blogId: item.id } })}
                            >
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* <div className="col-md-12 text-center mt-2 mt-lg-5 pb-2 pb-lg-5">
                  <button className="btn view_blogs"> View All Blogs </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContectUsSection />
    </Layout>
  );
};

export default Blog;
