import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import ReactDatatable from "../../common/ReactDatatable";
import { getCategories, getCategoryQuestion, handleChangeQuestionStatus } from "../../services/productServices";
import { sendErrorMessage } from "../../services/userServices";

const CategoryQuestion = () => {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
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
    getQuestions();
  }, [category]);

  const getQuestions = () => {
    getCategoryQuestion(category).then((response) => {
      if (response.status == true) {
        setQuestions(response.data);
      }
    });
  };

  const handleSelectCategory = (catId) => {
    setCategory(catId);
  };

  const editQuestion = (quesid) => {
    navigate("/question-details", {
      state: { questionId: quesid },
    });
  };
  const changeCategoryStatus = (quesid, status) => {
    let postData = {
      questionId: quesid,
      status: status,
    };
    handleChangeQuestionStatus(postData).then((response) => {
      if (response.status == true) {
        getQuestions();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const columns = [
    {
      name: "Question",
      selector: (row) => row.question,
    },
    {
      name: "Category",
      selector: (row) => row.category.category,
    },
    {
      name: "Question Type",
      selector: (row) => row.ques_type,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row?.status == "inactive" ? (
            <span className="text-danger">Inactive</span>
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
            onClick={() => editQuestion(item.id)}
            className="btn btn-round btn-primary btn-icon btn-sm mx-2"
          >
            <i className="fas fa-eye" />
          </a>

          {item?.status == "inactive" ? (
            <a
              href="javascript:void(0)"
              onClick={() => changeCategoryStatus(item?.id, "active")}
              className="btn btn-round btn-success btn-icon btn-sm"
            >
              <i className="fas fa-check" />
            </a>
          ) : (
            <a
              href="javascript:void(0)"
              onClick={() => changeCategoryStatus(item?.id, "inactive")}
              className="btn btn-round btn-danger btn-icon btn-sm"
            >
              <i className="fas fa-ban" />
            </a>
          )}
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
              <h4 className="card-title">All Question</h4>
              <h5 className="card-category ml-auto ">
                <select className="form-control mt-3" onChange={(e) => handleSelectCategory(e.target.value)}>
                  <option value="">select category</option>
                  {categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((item, i) => <option value={item.id}>{item.category}</option>)}
                </select>
              </h5>
            </div>
            <div className="card-body">
              <div className="toolbar"></div>
              <ReactDatatable data={questions} columns={columns} />
            </div>
            {/* end content*/}
          </div>
          {/*  end card  */}
        </div>
        {/* end col-md-12 */}
      </div>
    </Layout>
  );
};

export default CategoryQuestion;
