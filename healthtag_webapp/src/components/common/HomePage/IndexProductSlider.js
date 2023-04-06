import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import OwlCarousel from "react-owl-carousel";
const IndexProductSlider = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts("categoryId=&page=1").then((response) => {
      if (response.status === true) {
        setProducts(response.data.rows);
      }
    });
  }, []);
  return (
    <div className="col-12 col-md-12">
      {products && products.length > 0 && (
        <OwlCarousel className="owl-theme" loop margin={10} nav id="center">
          {products &&
            products.length > 0 &&
            products.map((item, i) => (
              <div className="slides text-center d-flex justify-content-center" key={i}>
                <div className="text-center">
                  <div className="d-flex justify-content-center text-center">
                    <img
                      src={item?.productimages.length > 0 && item?.productimages[0] && item?.productimages[0]?.image}
                    />
                  </div>
                  <p
                    onClick={() => navigate("/product-detail/" + item.id)}
                    to="javascript:void()"
                    className="pt-4"
                    style={{ cursor: "pointer" }}
                  >
                    {item?.name}
                  </p>
                  <p className="price">${item?.price}</p>
                </div>
              </div>
            ))}
        </OwlCarousel>
      )}
    </div>
  );
};

export default IndexProductSlider;
