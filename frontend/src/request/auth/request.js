import axios from "axios";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const signUpUser = async ({first_name, last_name, email, password}) => {
  return axios.post(`${API_URL}auth/signup`, {
    first_name,
    last_name,
    email,
    password,
  });
};

export const signInUser = async ({email, password}) => {
  return await axios.post(`${API_URL}auth/signin`, {
    email,
    password,
  }).then(res => res.data);
};
