import axios from "axios";
import { getJwtToken } from "../../helpers/jwt";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const addProductData = async (productData) => {
  return axios
    .post(`${API_URL}inventory/`, productData, {
      headers: {
        token: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => res.data);
};

export const getAllProducts = async (filter) => {
    return axios.post( `${API_URL}inventory/list`, filter,{
        headers: {
          token: `Bearer ${getJwtToken()}`,
        }
    }).then(res => res.data);
}

export const fetchProductDataWithId = async (id) => {
    return axios.get( `${API_URL}inventory/${id}`, {
        headers: {
          token: `Bearer ${getJwtToken()}`,
        }
    }).then(res => res.data);
}

export const deleteProduct = async (id) => {
    return axios.delete( `${API_URL}inventory/${id}`, {
        headers: {
          token: `Bearer ${getJwtToken()}`,
        }
    });
}


