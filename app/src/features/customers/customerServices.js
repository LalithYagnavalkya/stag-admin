import baseUrl from "../../baseUrl";

const getAllCustomers = async ({ token, filter, query }) => {
  const updatedToken = "Bearer " + token;
  const response = await baseUrl.post(
    "/admin/customers",
    {
      query,
      filter,
    },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  // console.log(token);
  if (response.status == 200) {
    console.log(response);
    return response.data;
  } else {
    return response;
  }
};
const AddCustomer = async ({ token, id, capital, returns }) => {
  const updatedToken = "Bearer " + token;
  console.log(returns);
  const response = await baseUrl.post(
    "/admin/createCustomer",
    { id, returns, capital },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  // console.log(token);
  if (response.status == 200) {
    console.log(response.data);
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
    "/admin/getcustomer",
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
  const response = await baseUrl.get("/admin/getclientreqs", {
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
    "/admin/deleteclientreq",
    { _id },
    {
      headers: {
        Authorization: updatedToken,
      },
    }
  );
  if (response.status == 200) {
    console.log(response.data._id);
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
