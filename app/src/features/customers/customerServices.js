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
const AddCustomer = async ({ token, customer }) => {
  const updatedToken = "Bearer " + token;
  console.log(customer);
  const response = await baseUrl.post(
    "/createCustomer",
    { customer },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  // console.log(token);
  if (response.status == 200) {
    return response.data;
  } else {
    return response;
  }
};
const customerServices = {
  getAllCustomers,
  AddCustomer,
};
export default customerServices;
