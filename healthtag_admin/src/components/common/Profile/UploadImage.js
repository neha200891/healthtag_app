import React, { useEffect } from "react";
import { handleEditProfile, handleEditUserProfile, sendErrorInfo, sendErrorMessage, sendSuccessInfo, sendSuccessMessage } from "../../services/userServices";

const UploadImage = ({userId, userDetails, setCallApi }) => {
  const [image, setImage] = React.useState({
    file: null,
    imagePreviewUrl: null,
  });
  useEffect(() => {
    setImage({...image, imagePreviewUrl:  userDetails?.profile_image ? userDetails.profile_image : null})
  },[])
  const handleUploadFile = (e) => {
    //check image type
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return sendErrorInfo("Please upload a valid image file");
    }
    setImage({
      file: file,
      imagePreviewUrl: URL.createObjectURL(file),
    });
  };

  const submitImage = () => {
    const formData = new FormData();
    formData.append("image", image.file);
    if(userId){
      handleEditUserProfile(userId,formData).then((response) => {
        if (response.status === true) {
          sendSuccessInfo("Profile Image updated successfully")
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }else{
      handleEditProfile(formData).then((response) => {
        if (response.status === true) {
          sendSuccessMessage(response);
          setCallApi(true);
        } else {
          sendErrorMessage(response);
        }
      });
    }
    
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-12">{image.imagePreviewUrl && <img src={image.imagePreviewUrl} alt="image" className="table_img mt-3" style={{ width: "150px", height: "150px" }} />}</div>
        <div className="col-sm-12 mt-2">
          <label htmlFor="imagefront" style={{ color: "#fff" }} className="btn btn-fill btn-primary">
            Upload Profile Image
          </label>
          <div className="form-group">
            <input id="imagefront" onChange={(e) => handleUploadFile(e)} name="aadhar_front" className="form-control d-none" type="file" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6">
          <button type="submit" onClick={() => submitImage()} class="btn btn-fill btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
