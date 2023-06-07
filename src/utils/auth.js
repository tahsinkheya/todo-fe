export const isLoggedIn = () => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("jwt_token");
};
