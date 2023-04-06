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
import { getBlogs, changeBlogStatus, handleDeleteBlog } from "../../services/contentService";
import { getCategories } from "../../services/productServices";
import ReactDatatable from "../../common/ReactDatatable";
const Blogs = () => {
  const [csvData, setCsvData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const navigate = useNavigate();
  const headers = [
    { label: "Title", key: "heading" },
    { label: "Content", key: "content" },
    { label: "Created Date", key: "createdAt" },
    { label: "status", key: "status" },
  ];

  useEffect(() => {
    if (callApi === true) {
      getBlogs()
        .then((response) => {
          if (response.status === true) {
            if (response.data.length > 0) {
              let arr = [];
              let i = 0;
              while (i < response.data.length) {
                arr.push({
                  heading: response.data[i].heading,
                  content: response.data[i].content,
                  createdAt: response.data[i].createdAt,
                  status: response.data[i].status,
                });

                i++;
              }
              setCsvData(arr);
            }
            setBlogList(response.data);
          }
        })
        .catch((err) => console.log(err));

      setCallApi(false);
    }
  }, [callApi]);

  const handleEditBlog = (item) => {
    console.log("item-------", item);
    navigate("/add-Blog", {
      state: {
        blog: item,
      },
    });
  };
  const handleChangeStatus = (id) => {
    changeBlogStatus(id).then((response) => {
      if (response.status === true) {
        setCallApi(true);
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const deleteBlog = (id) => {
    swal({
      title: "Are you sure, you want to delete this item?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteBlog(id).then((response) => {
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
    { name: "Title", selector: (row) => row.heading },
    {
      name: "Image",
      cell: (row) => (
        <>
          {" "}
          <img className="table_img" src={row?.image ? row?.image : "assets/img/default-avatar.png"} />
        </>
      ),
    },
    { name: "Category", selector: (row) => row.category.category },
    {
      name: "Content",
      selector: (row) => row?.content && row?.content.slice(0, 80) + "......",
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
      name: "Actions",
      cell: (item) => (
        <>
          <a
            href="javascript:void(0)"
            onClick={() => handleEditBlog(item)}
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
            onClick={() => deleteBlog(item?.id)}
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
              <h4 className="card-title">All Categories List</h4>
              <h5 className="card-blog ml-auto ">
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
              <ReactDatatable data={blogList} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
