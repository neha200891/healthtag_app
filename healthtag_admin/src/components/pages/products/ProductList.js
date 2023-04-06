import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { callDataTable } from "../../services/endPoints";
import {
  blockUnblockUser,
  getAllUser,
  handleDeleteUser,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../services/userServices";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import Layout from "../../common/Layout";
import { changeProductStatus, getCategories, getProducts, handleDeleteProduct } from "../../services/productServices";
import ReactDatatable from "../../common/ReactDatatable";
const ProductList = () => {
  const [csvData, setCsvData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [productList, setProducList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();
  const headers = [
    { label: "name", key: "name" },
    { label: "Short Desc", key: "short_desc" },
    { label: "Long Desc", key: "long_desc" },
    { label: "How To Use", key: "how_to_use" },
    { label: "Created Date", key: "createdAt" },
    { label: "status", key: "status" },
  ];
  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.status === true) {
          setCategoryList(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (callApi === true) {
      getProducts(categoryId)
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  name: response.data[i].name,
                  short_desc: response.data[i].short_desc,
                  long_desc: response.data[i].long_desc,
                  how_to_use: response.data[i].how_to_use,

                  createdAt: response.data[i].createdAt,
                  status: response.data[i].status,
                });

                i++;
              }
              setCsvData(arr);
            }
            setProducList(response.data);
          }
        })
        .catch((err) => console.log(err));

      setCallApi(false);
    }
  }, [callApi]);

  const handleSelectCategory = (catId) => {
    setCategoryId(catId);
    setCallApi(true);
  };

  const handleProductStatus = (id) => {
    changeProductStatus(id).then((response) => {
      if (response.status === true) {
        setCallApi(true);
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const handleEditProduct = (itemId) => {
    navigate(`/addProduct`, {
      state: {
        productId: itemId,
      },
    });
  };
  const deleteProduct = (id) => {
    swal({
      title: "Are you sure, you want to delete this item?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteProduct(id).then((response) => {
          console.log("respnse", response);
          if (response.status === true) {
            setCallApi(true);
            sendSuccessMessage(response);
            // setProducList([...productList.filter(item => item.id !== id)])
            // navigate("/dashboard")
          } else {
            sendErrorMessage(response);
          }
        });
      } else {
        return;
      }
    });
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => row.name,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          className="table_img"
          src={row?.productimages ? row?.productimages[0].image : "assets/img/default-avatar.png"}
        />
      ),
    },
    {
      name: "Category",
      selector: (row) => row?.category?.category,
    },
    {
      name: "Short Description",
      selector: (row) => row.short_desc,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row?.status == "inactive" ? (
            <span className="text-danger">Blocked</span>
          ) : (
            <span className="text-success">Active</span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      cell: (item) => (
        <>
          <a
            href="javascript:void(0)"
            onClick={() => handleEditProduct(item.id)}
            className="btn btn-round btn-primary btn-icon btn-sm mx-2"
          >
            <i className="fas fa-edit" />
          </a>
          {item?.status == "active" ? (
            <a
              href="javascript:void(0)"
              onClick={() => handleProductStatus(item?.id)}
              className="btn btn-round btn-success btn-icon btn-sm"
            >
              <i className="fas fa-check" />
            </a>
          ) : (
            <a
              href="javascript:void(0)"
              onClick={() => handleProductStatus(item?.id)}
              className="btn btn-round btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-ban" />
            </a>
          )}

          <a
            href="javascript:void(0)"
            onClick={() => deleteProduct(item?.id)}
            className="btn btn-round btn-danger btn-icon btn-sm  mx-2"
          >
            <i className="fas fa-trash" />
          </a>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <div className="col-md-12 d-flex justify-content-between">
                <div className="col-lg-2">
                  <h4 className="card-title">All Products</h4>
                </div>
                <div className="col-lg-1"> </div>
                <div className="col-lg-4 pr-0 mr-0">
                  <select className="form-control mt-3" onChange={(e) => handleSelectCategory(e.target.value)}>
                    <option value="">select category</option>
                    {categoryList &&
                      categoryList.length > 0 &&
                      categoryList.map((item, i) => <option value={item.id}>{item.category}</option>)}
                  </select>
                </div>
                <div className="col-lg-3  pl-0 ml-0">
                  <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
                    Download CSV
                  </CSVLink>
                  <button className="btn btn-fill btn-primary">Add Product</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="toolbar">
                {/*        Here you can write extra buttons/actions for the toolbar              */}
              </div>
              <ReactDatatable data={productList} columns={columns} />
            </div>
            {/* end content*/}
          </div>
          {/*  end card  */}
        </div>
        {/* end col-md-12 */}
      </div>
      {/* end row */}
    </Layout>
  );
};

export default ProductList;
