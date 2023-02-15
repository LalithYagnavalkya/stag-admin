import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetCustomer } from "../features/customers/customerSlice";
import { Avatar } from "@mui/material";
import moment from "moment";
const SingleCustomer = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { currentCustomer } = useSelector((store) => store.customers);
  const dispatch = useDispatch();

  console.log(id);
  useEffect(() => {
    dispatch(GetCustomer({ token: user.token, id: id }));
  }, []);

  return (
    <SinglePageCutomers>
      <div className="single-customer-left">
        <Avatar sx={{ width: 256, height: 256 }}></Avatar>
        <span>{currentCustomer.username}</span>
      </div>
      <div className="single-customer-right">
        <div className="current-customer-feild">
          Joining on {moment(currentCustomer.joiningDate).format("DD MM YYYY")}
        </div>
        <div className="current-customer-feild">
          Email {currentCustomer.email}
        </div>
        <div className="current-customer-feild">
          Phone {currentCustomer.phoneNumber}
        </div>
        <div className="current-customer-feild">
          Bank Number {currentCustomer?.bankNumber}
        </div>
        <div className="current-customer-feild">
          Joining on {moment(currentCustomer.joiningDate).format("DD MM YYYY")}
        </div>
        <div className="genterate-link">Generate form link</div>
        div.
      </div>
    </SinglePageCutomers>
  );
};

export default SingleCustomer;

const SinglePageCutomers = styled.div`
  padding-top: 8rem;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding: 10rem 2rem;
  color: white;
  .single-customer-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    span {
      font-size: 24px;
    }
  }
`;
