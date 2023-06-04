import { API_BASE_URL } from "../../config.js";
import execute from "./todo.js";

export function signup(data) {
  return execute.post(`${API_BASE_URL}/users/signup`, data);
}
