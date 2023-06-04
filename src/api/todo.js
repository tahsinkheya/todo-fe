import axios from "axios";
import jwtDecode from "jwt-decode";
// import { logout } from "./auth"

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const jwt_token = localStorage.getItem("auth_token");
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
      const jwt_token_decode = jwtDecode(localStorage.getItem("auth_token"));
      const currentTime = Date.now() / 1000;
      if (jwt_token_decode.exp <= currentTime) {
        localStorage.setItem("logged_out", "true");
        // logout()
      }
    } else {
      throw error;
    }
  }
);

export default instance;
