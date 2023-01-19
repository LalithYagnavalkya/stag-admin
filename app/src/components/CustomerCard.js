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

      {date}
      {capital}
      {/* {email} */}
      {returns}
    </CusCard>
  );
};

export default CustomerCard;

const CusCard = styled.div`
  color: black;
  background-color: white;
`;
