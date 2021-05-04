import axios from "axios";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSRFToken": csrftoken,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
