import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout } from "../utils/auth"

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      config.headers["Authorization"] = "Bearer " + jwt_token;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      const jwt_token_decode = jwtDecode(localStorage.getItem("jwt_token"));
      console.log(jwt_token_decode)
      const currentTime = Date.now() / 1000;
      if (jwt_token_decode.exp <= currentTime) {
        localStorage.removeItem("jwt_token");
        logout()
      }
    } else {
      throw error;
    }
  }
);

export default instance;
