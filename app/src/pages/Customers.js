import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CustomerCard from "../components/CustomerCard";

const Customers = () => {
  const { customers } = useSelector((store) => store.customers);
  return (
    <CustomerPage>
      <div className="search-section">
        <div className="search-bar">
          <input type="text" />
        </div>
        <div className="filterSearch"></div>
      </div>
      <div className="customers-cards-section">
        {customers?.map((customer, index) => {
          return <CustomerCard key={index} {...customer} />;
        })}
      </div>
    </CustomerPage>
  );
};

export default Customers;

const CustomerPage = styled.div`
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  height: 100%;
  .search-section {
    background-color: white;
    height: 64px;
    display: flex;
    /* justify-content: center; */
    padding: 0rem 2rem;
    align-items: center;
  }
  .customers-cards-section {
    padding: 0 2rem;
    background-color: yellow;
    height: 100%;
  }
`;
