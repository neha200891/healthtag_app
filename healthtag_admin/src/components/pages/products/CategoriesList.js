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
import { changeCategoryStatus, getCategories, handleDeleteCategory } from "../../services/productServices";
const CategoriesList = () => {
  const [csvData, setCsvData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const headers = [
    { label: "Category", key: "category" },
    { label: "Short Desc", key: "short_desc" },
    { label: "Long Desc", key: "long_desc" },
    { label: "Created Date", key: "createdAt" },
    { label: "status", key: "status" },
  ];
  useEffect(() => {
    if (callApi === true) {
      getCategories()
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  category: response.data[i].category,
                  short_desc: response.data[i].short_desc,
                  long_desc: response.data[i].long_desc,
                  createdAt: response.data[i].createdAt,
                  status: response.data[i].status,
                });

                i++;
              }
              setCsvData(arr);
            }
            setCategoryList(response.data);
          }
        })
        .catch((err) => console.log(err));

      setCallApi(false);
    }
  }, [callApi]);

  const handleEditCategory = (item) => {
    navigate("/addCategory", {
      state: {
        category: item,
      },
    });
  };
  const handleChangeStatus = (id) => {
    changeCategoryStatus(id).then((response) => {
      if (response.status === true) {
        setCallApi(true);
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const deleteCategory = (id) => {
    swal({
      title: "Are you sure, you want to delete this item?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteCategory(id).then((response) => {
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
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header row">
              <h4 className="card-title">All Categories List</h4>
              <h5 className="card-category ml-auto ">
                <CSVLink className="btn btn-fill btn-primary" headers={headers} data={csvData}>
                  Download CSV
                </CSVLink>
                ;
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar">
                {/*        Here you can write extra buttons/actions for the toolbar              */}
              </div>
              <table className="table table-striped table-bordered data_table" cellSpacing={0} width="100%">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Short Description</th>
                    <th>Long Description</th>
                    <th>Status</th>
                    <th className="disabled-sorting text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((item, index) => (
                      <tr>
                        <td>{item?.category}</td>
                        <td>
                          <img
                            className="table_img"
                            src={item?.image ? item?.image : "assets/img/default-avatar.png"}
                          />{" "}
                        </td>
                        <td>{item?.short_desc}</td>
                        <td>
                          {" "}
                          <p> {item?.long_desc && item?.long_desc.slice(0, 80) + "......"}</p>
                        </td>
                        <td>
                          {item?.status == "inactive" ? (
                            <span className="text-danger">Blocked</span>
                          ) : (
                            <span className="text-success">Active</span>
                          )}
                        </td>
                        <td className="d-flex ">
                          <a
                            href="javascript:void(0)"
                            onClick={() => handleEditCategory(item)}
                            className="btn btn-round btn-primary btn-icon btn-sm mx-2"
                          >
                            <i className="fas fa-edit" />
                          </a>
                          {item?.status == "active" ? (
                            <a
                              href="javascript:void(0)"
                              onClick={() => handleChangeStatus(item.id)}
                              className="btn btn-round btn-success btn-icon btn-sm"
                            >
                              <i className="fas fa-check" />
                            </a>
                          ) : (
                            <a
                              href="javascript:void(0)"
                              onClick={() => handleChangeStatus(item?.id)}
                              className="btn btn-round btn-danger btn-icon btn-sm"
                            >
                              <i className="fas fa-ban" />
                            </a>
                          )}
                          <a
                            href="javascript:void(0)"
                            onClick={() => deleteCategory(item?.id)}
                            className="btn btn-round btn-danger btn-icon btn-sm  mx-2"
                          >
                            <i className="fas fa-trash" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesList;
