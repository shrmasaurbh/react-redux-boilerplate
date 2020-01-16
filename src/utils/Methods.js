import axios from 'axios';
import API from './api';

const accessToken = () => {
  if (localStorage.getItem("homesfy_lg")) {
    return JSON.parse(window.atob(localStorage.getItem("homesfy_lg")));
  }
};

const isTokenValid = (status,message) => {
  if (
    (status === 400 && message === "Token Not Found") ||
    (status === 401 && message === "Authentication error")
  ) {
    window.localStorage.clear();
    window.location = "/";
  }

  return true;
};

const sendResponse = (res) => {
  if (isTokenValid(res.meta.status,res.meta.message)) {
    return res;
  }
};

export const get = async url => {
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  });

  var request = new Request(url, {
    method: "GET",
    headers: headers
  });

  return fetch(request).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const post = async (url, options) => {
  console.log(process.env.REACT_APP_CORE_API_URL);
  console.log(process.env.REACT_APP_URL);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "bearer "+accessToken(),
  };

  console.log("2nd page");
  // try{
    let res = await API.post('http://localhost:4000/api/auth/login', options, { headers: headers });
    console.log("res",res);
    return sendResponse(res);

  // } catch (e) {
  //   console.log('😱 Axios request failed: ${e}',e);
  // }

};

export const put = (url, options) => {
  options.method = "PUT";
  options.headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const Delete = url => {
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  });

  var request = new Request(url, {
    method: "DELETE",
    headers: headers
  });

  return fetch(request).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const FileUpload = (url, options) => {
  options.method = "POST";
  options.headers = {
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};
