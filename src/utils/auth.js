export const isLoggedIn = () => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    return true;
  }
  return false;
};
