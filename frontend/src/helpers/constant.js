const LOGIN_SUCCESS = 'login';
const LOGOUT = 'logout';

const BASE_API_URL = "http://128.199.19.170/api/api/";
const LOCAL_BASE_URL = "http://localhost:8000/api/";
const isProduction = false;

const AddManuallyCard = {
  type: "add",
  title: "Add Manually",
  imageLink: "https://i.ibb.co/FWLP0Py/Screenshot-2021-10-16-at-9-07-49-PM.jpg",
  buttonText: "Add Product Manually"
};

const StockListCard = {
  type: "list",
  title: "Stock List",
  imageLink: "https://i.ibb.co/crkDb7B/Screenshot-2021-10-16-at-10-36-05-PM.jpg",
  buttonText: "View Stock List"
};

module.exports = {
  LOGIN_SUCCESS,
  LOGOUT,
  AddManuallyCard,
  StockListCard,
  BASE_API_URL,
  LOCAL_BASE_URL,
  isProduction,
};