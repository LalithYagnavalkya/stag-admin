import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment, { now } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../features/customers/customerSlice";
// import { cusomters } from "../data";
import CustomerBar from "../components/CustomerBar";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { customers } = useSelector((store) => store.customers);

  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user.token);
    dispatch(getAllCustomers({ token: user.token }));
  }, []);

  useEffect(() => {
    setInterval(() => {
      let nwDate = new Date();
      setTime(nwDate);
    }, 60000);
  }, []);
  return (
    <HomeStyles>
      <div className="left-home">
        <span>{moment(time).format("hh:mm A")}</span>
        <span className="day-name">{moment().format("dddd")}</span>
        <span className="date-name">{moment().format("MMMM d  yy")}</span>
      </div>
      <div className="right-home">
        <span>Due this Week</span>
        <div className="customers-container">
          {customers.map((customer) => {
            return <CustomerBar {...customer}></CustomerBar>;
          })}
        </div>
      </div>
    </HomeStyles>
  );
};
//https://stag-backend.onrender.com/

export default Home;

// const HomeStyles = styled.div``;

const HomeStyles = styled.div`
  background-color: white;
  height: 100%;
  color: white;
  padding: 0 5rem;
  display: flex;
  .left-home {
    display: flex;
    padding-top: 5rem;
    flex: 0.5;
    color: #d6d6d6;
    flex-direction: column;
    row-gap: 2rem;
    span {
      font-size: 49px;

      font-weight: 600;
    }
    .day-name {
      font-size: 24px;
    }
    \.date-name {
      font-size: 24px;
    }
  }
`;
