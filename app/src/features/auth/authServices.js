import baseUrl from "../../baseUrl";
const login = async (user) => {
  const response = await baseUrl.post("/signin", user);
  localStorage.setItem("currentUser", JSON.stringify(response.data));
  return response.data;
};
const logout = async () => {
  localStorage.removeItem("currentUser");
};

const authService = {
  login,
  logout,
};
export default authService;
