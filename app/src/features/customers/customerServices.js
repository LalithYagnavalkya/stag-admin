import baseUrl from "../../baseUrl";

const getAllCustomers = async ({ token }) => {
  const updatedToken = "Bearer " + token;
  const response = await baseUrl.get("/customers", {
    headers: {
      Authorization: updatedToken,
    },
  });
  // console.log(token);
  console.log(response);
  return response;
};
const customerServices = {
  getAllCustomers,
};
export default customerServices;
