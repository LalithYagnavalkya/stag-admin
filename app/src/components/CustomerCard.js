import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
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
  phoneNumber,
  dueDate,
  note,
}) => {
  const [percentage, setPercentage] = useState({ min: 0, max: 0 });

  var numberCaptial = capital.replace(/\,/g, "");
  numberCaptial = Number(numberCaptial);
  console.log(numberCaptial);
  // const return = (numberCaptial * returns[0]) / 100;
  // setPercentage((prev) => ({...prev, min: (100 * returns[0])/capital})

  return (
    <CusCard>
      <span className="customer-card-name">{username}</span>
      <span className="customer-feilds">
        <div className="customer-card-field">
          <span className="subfeildhead">Amount</span>
          <span className="subfeildvalue">
            {(numberCaptial * returns[0]) / numberCaptial}
          </span>
        </div>
        <div className="customer-card-field">
          <span className="subfeildhead">Capital</span>
          <span className="subfeildvalue">{capital}</span>
        </div>
        <div className="customer-card-field">
          <span className="subfeildhead">Returns</span>
          <span className="subfeildvalue">
            {returns[0]}% {returns[1] !== 0 && `- ${returns[1]}%`}
          </span>
        </div>
        <div className="customer-card-field">
          <span className="subfeildhead">Due</span>
          <span className="subfeildvalue">
            {moment(dueDate).format("dddd DD/MM/YYYY")}
          </span>
        </div>
      </span>
      <span className="customer-card-footer">
        <div className="pending-btn">Pending</div>
        <div className="card-phone">9959844490</div>
      </span>
    </CusCard>
  );
};

export default CustomerCard;

const CusCard = styled.div`
  color: black;
  background-color: #e6e7e8;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 4px;
  font-family: "Metropolis";

  .customer-card-name {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }
  .customer-feilds {
    display: flex;
    flex-direction: column;
    row-gap: 0.7rem;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
  }
  .customer-feilds span {
    font-family: "Metropolis";
    font-size: 16px;
    color: #575555;
  }
  .customer-card-field {
    display: flex;
    column-gap: 1rem;
  }
  .customer-card-footer {
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    margin-top: 1.3rem;
    padding-top: 1rem;
    margin-bottom: -14px;
    .pending-btn {
      background-color: #ee6969;
      border-radius: 7px;
      padding: 7px 13px;
      margin-left: -1rem;
      color: white;
    }
  }
`;
