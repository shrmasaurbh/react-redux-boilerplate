import * as types from "./types";
import { get, post } from "../utils/Methods";

export const adminLogin = loginRequest => dispatch => {
  console.log("loginRequest",loginRequest)
  const options = {
    
    body: loginRequest
  };

  post('/login', options)
    .then(response => {
      console.log("1st page");
      dispatch({
        type: types.LOGIN,
        payload: response
      });
    })
    .catch(err => {
      console.error("Request failed", err);
    });
};

