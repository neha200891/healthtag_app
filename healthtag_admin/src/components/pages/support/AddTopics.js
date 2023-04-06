import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../common/Layout";
import { getSupportTopics, handleAddTicket, handleDeleteTopic } from "../../services/contentService";
import { sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const AddTopics = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  const submitTopic = (data) => {
    handleAddTicket(data).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        getTopics();
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const getTopics = () => {
    getSupportTopics().then((response) => {
      if (response.status === true) {
        setTopics(response.data);
      } else {
        sendErrorMessage(response);
      }
    });
  };

  const deleteTopic = (id) => {
    handleDeleteTopic(id).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        getTopics();
      } else {
        sendErrorMessage(response);
      }
    });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add Topic</h4>
            </div>
            <form onSubmit={handleSubmit(submitTopic)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Topic</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("topic", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Support Topic Title"
                      />
                      <span className="text-danger">{errors?.topic?.message}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer ">
                <button type="submit" class="btn btn-fill btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Topic List</h4>
            </div>
            <table className="table table-striped table-bordered " cellSpacing={0} width="100%">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Category</th>

                  <th className="disabled-sorting text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics &&
                  topics.length > 0 &&
                  topics.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.topic}</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          onClick={() => deleteTopic(item?.id)}
                          className="btn btn-round btn-danger btn-icon btn-sm  mx-2 float-right mr-3"
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
      {/* end row */}
    </Layout>
  );
};

export default AddTopics;
