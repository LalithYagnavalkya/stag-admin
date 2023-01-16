import baseUrl from "../../baseUrl";

const getAllCustomers = async ({ token }) => {
  const response = await baseUrl.get("/customers", {
    headers: {
      Authorization: token,
    },
  });
  console.log(data);
  return data;
};

export { getAllCustomers };
