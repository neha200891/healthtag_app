import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../services/contentService";

const IndexBlogs = ({ heading }) => {
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
    <section className="section6 py-lg-5 link_section_bg_section6 d-flex align-items-center">
      <div className="container py-lg-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12 text-center pb-5">
                <h3 className="helth_tag">{heading}</h3>
              </div>
              {blogs &&
                blogs.length > 0 &&
                blogs.slice(0, 3).map((item, i) => (
                  <div className="col-12 col-md-12 col-lg-4" key={i}>
                    <div className=" bg_for_blog_tag">
                      <img src={item.image} />
                      <div className="p-3">
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
                ))}

              <div className="col-md-12 text-center mt-2 pb-4 mt-lg-5 pb-lg-5">
                <Link to="/blogs" className="btn view_blogs">
                  {" "}
                  View All Blogs{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexBlogs;
