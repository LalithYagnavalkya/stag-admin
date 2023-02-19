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
const getCustomer = async ({ token, id }) => {
  const updatedToken = "Bearer " + token;
  console.log(id);
  console.log(updatedToken);
  const response = await baseUrl.post(
    "/getcustomer",
    { id: id },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  } else {
    return response;
  }
};
const getReqs = async ({ token }) => {
  const updatedToken = "Bearer " + token;
  const response = await baseUrl.get("/getclientreqs", {
    headers: {
      Authorization: updatedToken,
    },
  });
  if (response.status == 200) {
    console.log(response);
    return response.data;
  } else {
    return response;
  }
};
const deleteReq = async ({ token, _id }) => {
  const updatedToken = "Bearer " + token;

  const response = await baseUrl.post(
    "/deletereq",
    { _id },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  if (response.status == 200) {
    return response.data._id;
  } else {
    return response;
  }
};
const customerServices = {
  getAllCustomers,
  AddCustomer,
  getCustomer,
  getReqs,
  deleteReq,
};
export default customerServices;
