import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import { getCategories, handleAddCategoryQuestion } from "../../services/productServices";
import { sendErrorMessage, sendSuccessMessage } from "../../services/userServices";

const AddCategoryQuestion = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
  } = useForm({ mode: "onBlur" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArray",
  });
  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
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

  const submitQuestion = (data) => {
    let postData = {
      question: data.question,
      options: [{ option: data.option, score: data.score }, ...data.fieldArray],
      categoryId: data.categoryId,
      ques_type: data.ques_type,
    };
    console.log("post data", postData);
    handleAddCategoryQuestion(postData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/questions");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Create A Question</h4>
            </div>
            <form onSubmit={handleSubmit(submitQuestion)} className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-3 col-form-label">Select Category</label>
                  <div className="col-sm-9">
                    <div className="form-group">
                      <select
                        className="form-control"
                        {...register("categoryId", {
                          required: "Category is required",
                        })}
                      >
                        <option value={""} selected>
                          Select Category
                        </option>
                        {categoryList &&
                          categoryList.length > 0 &&
                          categoryList
                            .filter((item) => item.status == "active")
                            .map((item, i) => <option value={item.id}>{item.category}</option>)}
                      </select>
                      <span className="text-danger">{errors?.categoryId?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="col-sm-3 col-form-label">Question</label>
                  <div className="col-sm-9">
                    <div className="form-group">
                      <textarea
                        {...register("question", {
                          required: "Field is required",
                        })}
                        type="text"
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{errors?.question?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Question Type</label>
                  <div className="col-sm-10 checkbox-radios">
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("ques_type", {
                            required: "Type is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="ques_type"
                          id="exampleRadios01"
                          value="radio"
                          defaultChecked
                        />
                        <span className="form-check-sign" />
                        Radio
                      </label>
                    </div>
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("ques_type", {
                            required: "Type is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="ques_type"
                          value="checkbox"
                          id="exampleRadios2"
                        />
                        <span className="form-check-sign" />
                        Checkbox
                      </label>
                    </div>
                    <span className="text-danger">{errors?.ques_type?.message}</span>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-3 col-form-label">Option 1 </label>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-7">
                        {" "}
                        <div className="form-group">
                          <input
                            {...register("option", {
                              required: "Field is required",
                            })}
                            placeholder="option"
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">{errors?.option?.message}</span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <input
                            {...register("score", {
                              required: "Field is required",
                            })}
                            type="text"
                            placeholder="score"
                            className="form-control"
                          />
                          <span className="text-danger">{errors?.score?.message}</span>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <a
                          href="javascript:void(0)"
                          onClick={() => append()}
                          className="btn btn-round btn-primary btn-icon btn-sm mx-2"
                        >
                          <i className="fas fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {controlledFields.map((field, index) => {
                  return (
                    <div className="row">
                      <label className="col-sm-3 col-form-label">Option {index + 2} </label>
                      <div className="col-sm-9">
                        <div className="row">
                          <div className="col-sm-7">
                            {" "}
                            <div className="form-group">
                              <input
                                {...register(`fieldArray.${index}.option`, {
                                  required: "Field is required",
                                })}
                                placeholder="option"
                                type="text"
                                className="form-control"
                              />
                              <span className="text-danger">{errors?.[`fieldArray.${index}.option`]?.message}</span>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-group">
                              <input
                                {...register(`fieldArray.${index}.score`, {
                                  required: "Field is required",
                                })}
                                type="text"
                                placeholder="score"
                                className="form-control"
                              />
                              <span className="text-danger">{errors?.[`fieldArray.${index}.score`]?.message}</span>
                            </div>
                          </div>
                          <div className="col-sm-2">
                            <a
                              href="javascript:void(0)"
                              onClick={() => remove(index)}
                              className="btn btn-round btn-primary btn-icon btn-sm mx-2"
                            >
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="card-footer ">
                <button type="submit" class="btn btn-fill btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategoryQuestion;
