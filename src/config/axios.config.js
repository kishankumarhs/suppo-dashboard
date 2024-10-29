import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_URL || "http://49.13.72.88:3000/";

const token = localStorage.getItem("token");
axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  authorization: `Bearer ${token}`,
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

export default axiosClient;
