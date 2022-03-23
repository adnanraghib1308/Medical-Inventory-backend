import axios from "axios";
import { getJwtToken } from "../../helpers/jwt";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const searchProduct = async (searchString) => {
  return axios
    .post(`${API_URL}billing/product-search`, {
      search_string: searchString,
      headers: {
          token: `Bearer ${getJwtToken()}`,
      },
    }).then( res => res.data.data)
};

export const makeSale = async (data) => {
  return axios
    .post(`${API_URL}billing/generate-bill`, data,{
      headers: {
          token: `Bearer ${getJwtToken()}`,
      },
    }).then( res => res.data.file_path)
};