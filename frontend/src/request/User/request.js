import axios from "axios";
import { getJwtToken } from "../../helpers/jwt";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const getUserData = async () => {
  return axios
    .get(`${API_URL}user/`, {
      headers: {
        token: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => res.data);
};

export const updateUserData = async (data) => {
  return axios
    .post(`${API_URL}user/`, data,{
      headers: {
        token: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => res.data);
};