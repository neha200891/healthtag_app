import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Layout from "../../common/Layout";
import {
  getQuestionDetails,
  handleAddEditQuestionOption,
  handleChangeOptionStatus,
  handleEditQuestion,
} from "../../services/productServices";
import { sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const QuestionDetails = () => {
  const [question, setQuestion] = useState({});
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [state, setState] = useState({
    questionEdit: false,
    question: "",
    optionEdit: false,
    index: null,
    questionId: null,
    optionId: null,
    option: "",
    score: null,
  });
  const getQuestion = () => {
    getQuestionDetails(location.state.questionId).then((response) => {
      if (response.status === true) {
        setQuestion(response.data);
      }
    });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const updateQuestion = () => {
    let postData = {
      question: state.question,
      questionId: state.questionId,
    };
    handleEditQuestion(postData).then((response) => {
      if (response.status === true) {
        setState({ ...state, questionEdit: false, questionId: null });
        getQuestion();
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const updateOption = () => {
    let postData = {
      questionId: state.questionId,
      optionId: state.optionId,
      option: state.option,
      score: state.score,
    };
    handleAddEditQuestionOption(postData).then((response) => {
      if (response.status === true) {
        setState({
          ...state,
          questionId: null,
          optionId: null,
          option: "",
          score: "",
          index: null,
          optionEdit: false,
        });
        getQuestion();
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const addOption = (e) => {
    e.preventDefault();
    let postData = {
      questionId: state.questionId,
      option: state.option,
      score: state.score,
    };
    handleAddEditQuestionOption(postData).then((response) => {
      if (response.status === true) {
        setState({
          ...state,
          questionId: null,
          optionId: null,
          option: "",
          score: "",
          index: null,
          optionEdit: false,
        });
        toggleModal();
        getQuestion();
        sendSuccessMessage(response);
      } else {
        sendErrorMessage(response);
      }
    });
  };
  const changeOptionStatus = (optionId, questionId, status) => {
    let postData = {
      optionId,
      questionId,
      status,
    };
    handleChangeOptionStatus(postData).then((response) => {
      if (response.status === true) {
        getQuestion();
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header row">
              <h4 className="card-title ml-3">All User List</h4>
              <h5 className="card-category ml-auto mr-2 ">
                <button
                  onClick={() => {
                    setState({ ...state, questionId: question.id });
                    toggleModal();
                  }}
                  className="btn btn-fill btn-primary"
                >
                  Add Option
                </button>
              </h5>
            </div>
            <div className="card-body ">
              <div className="row">
                <div className="col-lg-11">
                  {state.questionEdit === true ? (
                    <textarea
                      defaultValue={question?.question}
                      onChange={(e) => setState({ ...state, question: e.target.value })}
                      className="form-control"
                    ></textarea>
                  ) : (
                    <p>{question?.question}</p>
                  )}
                </div>
                <div className="col-lg-1">
                  {state.questionEdit == false ? (
                    <a
                      href="javascript:void(0)"
                      onClick={() => setState({ ...state, questionEdit: true, questionId: question.id })}
                      className="btn btn-round btn-primary btn-icon btn-sm mx-2"
                    >
                      <i className="fas fa-edit" />
                    </a>
                  ) : (
                    <>
                      <a
                        href="javascript:void(0)"
                        onClick={() => updateQuestion()}
                        className="btn btn-round btn-success btn-icon btn-sm mx-2"
                      >
                        <i className="fas fa-check" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => setState({ ...state, questionEdit: false, questionId: null })}
                        className="btn btn-round btn-danger btn-icon btn-sm mx-2"
                      >
                        <i className="fas fa-times" />
                      </a>
                    </>
                  )}
                </div>

                <div className="col-lg-12">
                  <table className="table table-striped table-bordered ">
                    <thead>
                      <tr>
                        <th>Option</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {question?.questionnaires_options &&
                        question?.questionnaires_options.length > 0 &&
                        question?.questionnaires_options.map((item, i) => (
                          <tr>
                            <td>
                              {state.optionEdit && i == state.index ? (
                                <input
                                  defaultValue={item.option}
                                  className="form-control"
                                  onChange={(e) => setState({ ...state, option: e.target.value })}
                                />
                              ) : (
                                item.option
                              )}
                            </td>
                            <td>
                              {state.optionEdit && i == state.index ? (
                                <input
                                  defaultValue={item.score}
                                  className="form-control"
                                  type="number"
                                  onChange={(e) => setState({ ...state, score: e.target.value })}
                                />
                              ) : (
                                item.score
                              )}
                            </td>
                            <td>
                              {" "}
                              {item?.status == "inactive" ? (
                                <span className="text-danger">Inactive</span>
                              ) : (
                                <span className="text-success">Active</span>
                              )}
                            </td>
                            <td>
                              {" "}
                              {state.optionEdit && i == state.index ? (
                                <>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => updateOption()}
                                    className="btn btn-round btn-success btn-icon btn-sm mx-2"
                                  >
                                    <i className="fas fa-check" />
                                  </a>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() =>
                                      setState({
                                        ...state,
                                        questionId: null,
                                        optionId: null,
                                        option: "",
                                        score: "",
                                        index: null,
                                        optionEdit: false,
                                      })
                                    }
                                    className="btn btn-round btn-danger btn-icon btn-sm mx-2"
                                  >
                                    <i className="fas fa-times" />
                                  </a>
                                </>
                              ) : (
                                <>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() =>
                                      setState({
                                        ...state,
                                        questionId: question?.id,
                                        optionId: item.id,
                                        option: item.option,
                                        score: item.score,
                                        index: i,
                                        optionEdit: true,
                                      })
                                    }
                                    className="btn btn-round btn-primary btn-icon btn-sm mx-2"
                                  >
                                    <i className="fas fa-edit" />
                                  </a>
                                  {item?.status == "inactive" ? (
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => changeOptionStatus(item?.id, item.questionId, "active")}
                                      className="btn btn-round btn-success btn-icon btn-sm"
                                    >
                                      <i className="fas fa-check" />
                                    </a>
                                  ) : (
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => changeOptionStatus(item?.id, item.questionId, "inactive")}
                                      className="btn btn-round btn-danger btn-icon btn-sm"
                                    >
                                      <i className="fas fa-ban" />
                                    </a>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Shipping Partner details</ModalHeader>
        <ModalBody>
          <form onSubmit={addOption} className="form-horizontal">
            <div className="card-body ">
              <div className="form-group">
                <label className="ml-3">Option</label>
                <input
                  onChange={(e) => setState({ ...state, option: e.target.value })}
                  type="text"
                  className="form-control"
                  placeholder="Option"
                />
              </div>
              <div className="form-group">
                <label className="ml-3">Deliver Partner</label>
                <input
                  onChange={(e) => setState({ ...state, score: e.target.value })}
                  type="number"
                  className="form-control"
                  placeholder="Score"
                />
              </div>

              <button type="submit" class="btn btn-fill btn-primary">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </Layout>
  );
};

export default QuestionDetails;
