import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { handleCreateUser, sendErrorInfo, sendErrorMessage, sendSuccessMessage } from "../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import { handleCreateBlog } from "../../services/contentService";
import { APPURL } from "../../../apis/apiHelper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCategories } from "../../services/productServices";
import { TagInput } from "reactjs-tag-input";
const AddBlog = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const [image, setImage] = React.useState({
    file: null,
    imagePreviewUrl: null,
  });
  const [imgErr, setImgErr] = useState("");
  const [articleData, setArticleData] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [tags, setTags] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.status === true) {
          setCategoryList(response.data);
        }
      })
      .catch((err) => console.log(err));

    if (location.state?.blog) {
      const { blog } = location.state;
      reset({
        heading: blog.heading,
        status: blog.status,
        categoryId: blog.categoryId,
      });
      let i = 0;
      let tag = [];
      let myTags = (blog?.tags && blog?.tags.length > 0 && JSON.parse(blog?.tags)) || [];
      while (i < myTags.length) {
        tag.push({
          index: i,
          displayValue: myTags[i],
        });
        i++;
      }
      setTags(tag);
      setArticleData(blog.content);
      setImage({
        imagePreviewUrl: blog.image,
      });
    }
  }, []);
  const submitUser = (data) => {
    if (image.file === null) {
      return setImgErr("Please upload blog image");
    }
    if (editorValue == "") {
      return sendErrorInfo("Please enter content ");
    }
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (image.file) {
      formData.append("image", image.file);
    }
    formData.append("content", editorValue);
    if (location.state?.blog?.id) {
      formData.append("blogId", location.state?.blog?.id);
    }
    let newTags = [];
    tags.filter((item) => newTags.push(item.displayValue));
    formData.append("tags", JSON.stringify(newTags));
    handleCreateBlog(formData).then((response) => {
      if (response.status === true) {
        sendSuccessMessage(response);
        navigate("/blogs");
      } else {
        console.log(response);
        sendErrorMessage(response);
      }
    });
  };

  const handleUploadFile = (e) => {
    //check image type
    setImgErr("");
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return sendErrorInfo("Please upload a valid image file");
    }
    setImage({
      file: file,
      imagePreviewUrl: URL.createObjectURL(file),
    });
  };
  const onTagsChanged = (tags) => {
    setTags(tags);
  };

  return (
    <Layout>
      <div className="row">
        {console.log("tags", tags)}
        <div className="col-md-12">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Add A Blog</h4>
            </div>
            <form className="form-horizontal">
              <div className="card-body ">
                <div className="row">
                  <label className="col-sm-2 col-form-label">Select Category</label>
                  <div className="col-sm-10">
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
                  <label className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <input
                        {...register("heading", {
                          required: "Title is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                      <span className="text-danger">{errors?.blog?.message}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="col-sm-2 col-form-label">Content</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <CKEditor
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        data={articleData}
                        editor={ClassicEditor}
                        config={{
                          ckfinder: {
                            // Upload the images to the server using the CKFinder QuickUpload command.
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": "true",
                            uploadUrl: APPURL() + "api/v1/contents/uploadBlogImage",
                          },
                          toolbar: {
                            items: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "link",
                              "bulletedList",
                              "numberedList",
                              "|",
                              "indent",
                              "outdent",
                              "|",
                              "imageUpload",
                              "blockQuote",
                              "insertTable",
                              "mediaEmbed",
                              "undo",
                              "redo",
                              "fontColor",
                              "fontSize",
                              "fontFamily",
                              "MathType",
                              "ChemType",
                            ],
                          },
                          options: {
                            resourceType: "Images",
                          },
                          language: "en",
                        }}
                        onInit={(editor) => {}}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorValue(data);
                        }}
                        // {...register(`article${[index]}`,{required:"Article is required"})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-2 col-form-label">Status</label>
                  <div className="col-sm-10 checkbox-radios">
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("status", {
                            required: "Status is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="status"
                          id="exampleRadios1"
                          value="active"
                          defaultChecked
                        />
                        <span className="form-check-sign" />
                        Active
                      </label>
                    </div>
                    <div className="form-check form-check-radio">
                      <label className="form-check-label">
                        <input
                          {...register("status", {
                            required: "Satus is required",
                          })}
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="inactive"
                          id="exampleRadios2"
                        />
                        <span className="form-check-sign" />
                        Inactive
                      </label>
                    </div>
                    <span className="text-danger">{errors?.status?.message}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10">
                    <label htmlFor="imagefront" style={{ color: "#fff" }} className="btn btn-fill btn-primary">
                      Upload Blog Image
                    </label>
                    <div className="form-group">
                      <input
                        id="imagefront"
                        onChange={(e) => handleUploadFile(e)}
                        name="aadhar_front"
                        className="form-control d-none"
                        type="file"
                      />
                      {image.imagePreviewUrl && (
                        <img src={image.imagePreviewUrl} alt="image" style={{ width: "100px", height: "100px" }} />
                      )}
                      <span className="text-danger">{imgErr}</span>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <label className="col-sm-2 col-form-label">Tags</label>
                  <div className="col-sm-10">
                    <div className="form-group">
                      <TagInput tags={tags} onTagsChanged={onTagsChanged} />
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer ">
                <button type="button" onClick={handleSubmit(submitUser)} class="btn btn-fill btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* end row */}
    </Layout>
  );
};

export default AddBlog;
