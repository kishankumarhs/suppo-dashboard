import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL =
  process.env.NODE_ENV !== "production" ? process.env.REACT_APP_URL : "http://localhost:3000";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

export default axiosClient;
