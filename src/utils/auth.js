export const isLoggedIn = () => {
  const token = localStorage.getItem("my_token");
  if (token) {
    return true;
  }
  return false;
};
