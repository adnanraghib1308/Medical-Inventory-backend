import axios from "axios";
import { getJwtToken } from "../../helpers/jwt";
const { isProduction, BASE_API_URL, LOCAL_BASE_URL} = require('../../helpers/constant');

const API_URL = isProduction ? BASE_API_URL : LOCAL_BASE_URL;

export const getHomePageData = async () => {
  return axios.get(`${API_URL}home/`, {
    headers: {
      'token': `Bearer ${getJwtToken()}`
    }
  }).then(res => res.data);
}