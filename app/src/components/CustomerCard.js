import React from "react";
import styled from "styled-components";

// _id(pin):"63bfd8f9852c87c92fbe6bf5"
// username(pin):"Priya paul"
// email(pin):""
// capital(pin):50000
// returns(pin):"10%"
// date(pin):"28/12/22"
// note(pin):
// googleid(pin):""
// verified(pin):false
// createdAt(pin):"2023-01-12T09:55:05.569Z"

const CustomerCard = ({
  _id,
  username,
  email,
  capital,
  returns,
  date,
  note,
}) => {
  return (
    <CusCard>
      <span className="customer-card-name">{username}</span>
      <span className="customer-feilds">
        <div className="customer-card-field">
          <span>Capital</span>
          <span>{capital}</span>
        </div>
        <div className="customer-card-field">
          <span>Next Payment</span>
          <span>{date}</span>
        </div>
        <div className="customer-card-field">
          <span>Returns</span>
          <span>{returns}</span>
        </div>
      </span>
    </CusCard>
  );
};

export default CustomerCard;

const CusCard = styled.div`
  color: black;
  background-color: white;
  /* width: 311px; */
  display: flex;
  flex-direction: column;
  padding: 24px;
  .customer-card-name {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 69.84%;
    letter-spacing: -0.02em;
  }
  .customer-feilds {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .customer-feilds span {
    font-family: "Metropolis";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 69.84%;
    letter-spacing: -0.02em;
  }
`;
