import axios from "axios";
import { getJwtToken } from "../../helpers/jwt";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const getAllSalesData = async (filter) => {
  return axios
    .post(`${API_URL}sales/`, filter, {
      headers: {
        token: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => res.data);
};
