import baseUrl from "../../baseUrl";

const getAllCustomers = async ({ token }) => {
  const updatedToken = "Bearer " + token;
  const response = await baseUrl.get("/customers", {
    headers: {
      Authorization: updatedToken,
    },
  });
  // console.log(token);
  if (response.status == 200) {
    console.log(response);
    return response.data;
  } else {
    return response;
  }
};
const customerServices = {
  getAllCustomers,
};
export default customerServices;
