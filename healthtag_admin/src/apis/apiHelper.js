/*
 * Api helper File
 * Use for all Api.
 **/
/*
npm run build
*/
import axios from "axios";
import cookie from "react-cookies";
//
// const MainUrl = "http://localhost:48000/api/v1/";
const MainUrl = "https://dev-healthtag-api.flynautstaging.com/api/v1/";
// const APP_URL = "http://localhost:48000/";
const APP_URL = "https://dev-healthtag-api.flynautstaging.com/";
export function APPURL() {
  return APP_URL;
}
//Post Data Functions.
export function PostData(url, data) {
  // body..
  //
  var headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
  };
  return axios
    .post(MainUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}
//Get Data Functions.
export function GetData(url, data) {
  // body...

  var headers = {
    "Content-Type": "application/json",
    //'Authorization':'Bearer '+Token,
    //'X-localization':'en'
  };
  //console.log("headers="+JSON.stringify(headers));
  return axios
    .get(MainUrl + url, data, { headers: headers })
    .then((res) => {
      //console.log(res);
      //console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}
//Post Data with token
//Post Data Functions.
export function PostDataWithToken(url, data) {
  // body..
  //
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + tokens,
  };
  return axios
    .post(MainUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}

//Post Data Functions.
export function PostImageDataWithToken(url, data) {
  // body..
  //
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  var headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + tokens,
  };
  return axios
    .post(MainUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}
//Get Data with token Functions.
export function GetDataWithToken(url, data) {
  let tokens = "";

  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  let config = {
    headers: {
      Authorization: "Bearer " + tokens,
    },
    params: {},
  };

  //console.log("headers="+JSON.stringify(headers));
  return axios
    .get(MainUrl + url, config)
    .then((res) => {
      //console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log("errors", error);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}

export function PostVideoDataWithToken(url, data, onUploadProgress) {
  // body..
  //
  let tokens = "";
  if (cookie.load("token")) {
    tokens = cookie.load("token");
  }
  var headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + tokens,
  };
  return axios
    .post(MainUrl + url, data, { headers: headers, onUploadProgress: onUploadProgress })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}
