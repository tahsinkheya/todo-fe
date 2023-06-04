import execute from "./todo.js";

export function signup(data) {
  return execute.post("/signup", data);
}
