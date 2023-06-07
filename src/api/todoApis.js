import { API_BASE_URL } from "../../config.js";
import execute from "./todo.js";
import axios from "axios";

export function signup(data) {
  return axios.post(`${API_BASE_URL}/users/signup`, data, {
    "Content-Type": "application/json",
  });
}

export function login(data) {
  return axios.post(`${API_BASE_URL}/users/login`, data, {
    "Content-Type": "application/json",
  });
}

export function getUserInfo(data) {
  return execute.post(`${API_BASE_URL}/user_info/get-user-info`, data);
}

export function addTask(data) {
  console.log(data);
  return execute.post(`${API_BASE_URL}/tasks/add-task`, data);
}

export function getAllTasks(data) {
  return execute.post(`${API_BASE_URL}/tasks/get-tasks`, data);
}

export function getAllProjects(data) {
  console.log(data);
  return execute.post(`${API_BASE_URL}/projects/get-projects`, data);
}

export function addProject(data) {
  return execute.post(`${API_BASE_URL}/projects/add-project `, data);
}
