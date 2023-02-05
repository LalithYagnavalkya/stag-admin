import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetCustomer } from "../features/customers/customerSlice";

const SingleCustomer = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  console.log(id);
  useEffect(() => {
    dispatch(GetCustomer({ token: user.token, id: id }));
  }, []);

  return <SinglePageCutomers>{id}</SinglePageCutomers>;
};

export default SingleCustomer;

const SinglePageCutomers = styled.div`
  background-color: pink;
  padding-top: 8rem;
`;
