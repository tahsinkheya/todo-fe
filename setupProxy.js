// import { API_BASE_URL } from "./config";

const { createProxyMiddleware } = require("http-proxy-middleware");
const API_BASE_URL = "http://127.0.0.1:5000/api/v1";
const px = createProxyMiddleware({ target: API_BASE_URL, changeOrigin: true });

module.exports = (app) => {
  app.use("/api/*", px);
};
