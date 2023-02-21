import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetCustomer } from "../features/customers/customerSlice";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
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
      <div className="single-customer-container">
        <div className="single-customer-left">
          <Avatar
            sx={{ width: 256, height: 256 }}
            src={currentCustomer.profilePic}
          ></Avatar>
          <span>{currentCustomer.username}</span>
          {!currentCustomer.isDue ? (
            <span className="pending-button">Due</span>
          ) : (
            <span className="paid-button">Paid</span>
          )}
        </div>
        <div className="single-customer-right">
          <div className="current-customer-feild">
            <span className="customer-feild-heading">Joined on</span>
            <span className="customer-feild-date customer-feild-value">
              {moment(Number(currentCustomer.joiningDate)).format(
                "DD MMM YYYY"
              )}
            </span>
          </div>
          <div className="current-customer-feild">
            <span className="customer-feild-heading ">Email</span>{" "}
            {currentCustomer.email === "" ? (
              <div style={{ color: "#E55959" }}>Email not provided</div>
            ) : (
              <span className="customer-feild-value">
                {currentCustomer.email}
              </span>
            )}
            <Tooltip title="edit">
              <IconButton>
                <EditIcon sx={{ color: "#d4d4d4" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="current-customer-feild">
            <span className="customer-feild-heading">Phone </span>{" "}
            {currentCustomer?.phoneNumber === "" ? (
              <div style={{ color: "#E55959" }}>Phone number not provided</div>
            ) : (
              <span className="customer-feild-value">
                {currentCustomer?.phoneNumber}
              </span>
            )}
            <Tooltip title="edit">
              <IconButton>
                <EditIcon sx={{ color: "#d4d4d4" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="current-customer-feild">
            <span className="customer-feild-heading"> BankAccount </span>

            {currentCustomer?.bankaccount === "" ||
            currentCustomer?.bankaccount == null ? (
              <div style={{ color: "#E55959" }}>
                Bank account number not provided
              </div>
            ) : (
              <span className="customer-feild-value">
                {currentCustomer?.bankaccount}
              </span>
            )}
            <Tooltip title="edit">
              <IconButton>
                <EditIcon sx={{ color: "#d4d4d4" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="current-customer-feild">
            <span className="customer-feild-heading"> Ifsc </span>

            {currentCustomer?.ifsc === "" || currentCustomer?.ifsc == null ? (
              <div style={{ color: "#E55959" }}>
                Ifsc account number not provided
              </div>
            ) : (
              <span className="customer-feild-value">
                {currentCustomer?.ifsc}
              </span>
            )}
            <Tooltip title="edit">
              <IconButton>
                <EditIcon sx={{ color: "#d4d4d4" }} />
              </IconButton>
            </Tooltip>
          </div>

          <div className="Update-payment-btn">Update payment</div>
          <div className="captial-returns-place">
            <>
              <div className="captial-place">
                <span className="place-value">₹{currentCustomer?.capital}</span>
                <span className="feild-heading-place">Capital</span>
              </div>
              <Tooltip title="edit">
                <IconButton>
                  <EditIcon sx={{ color: "#d4d4d4" }} />
                </IconButton>
              </Tooltip>
            </>
            <>
              <div className="returns-palce">
                <span className="place-value">
                  {/* <span>{currentCustomer?.returns[0]}%</span> - */}
                  {/* {currentCustomer?.returns[1]}% */}
                </span>
                <span className="feild-heading-place">Returns</span>
              </div>
              <Tooltip title="edit">
                <IconButton>
                  <EditIcon sx={{ color: "#d4d4d4" }} />
                </IconButton>
              </Tooltip>
            </>
          </div>
        </div>
      </div>
    </SinglePageCutomers>
  );
};

export default SingleCustomer;

const SinglePageCutomers = styled.div`
  padding-top: 8rem;
  display: flex;
  font-family: "Metropolis";
  height: 100vh;
  justify-content: space-between;
  padding: 10rem 2rem;
  color: white;
  .single-customer-container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    column-gap: 5rem;
    align-items: center;
  }
  .single-customer-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    span {
      font-size: 24px;
    }
    .pending-button {
      border: 1px solid #e55959;
      border-radius: 7px;
      font-weight: 500;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 18px;
      color: #e55959;
    }
    .paid-button {
      border: 1px solid #4e9f3d;
      border-radius: 7px;
      font-weight: 500;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 18px;
      color: #4e9f3d;
    }
  }
  .single-customer-right {
    .current-customer-feild {
      display: flex;
      column-gap: 1rem;
      align-items: center;
      padding: 0.8rem;
      .customer-feild-heading {
        font-family: "Metropolis";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 69.84%;
        letter-spacing: -0.02em;
        color: #d4d4d4;
      }
      .customer-feild-date {
        font-family: "Metropolis";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 69.84%;
        letter-spacing: -0.02em;
        color: #ffffff;
      }
      .customer-feild-value {
        font-size: 24px;
      }
    }
    .Update-payment-btn {
      background: #8f73de;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      font-family: "Metropolis";
      font-size: 24px;
      line-height: 106.34%;
      padding: 14px 2px;
      cursor: pointer;
    }
    .captial-returns-place {
      padding: 2rem 2rem;

      display: flex;
      justify-content: space-between;
      .captial-place,
      .returns-palce {
        display: flex;
        flex-direction: column;
        row-gap: 0.8rem;
        justify-content: center;
        align-items: center;
      }
      .place-value {
        font-family: "Metropolis";
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 69.84%;
        letter-spacing: -0.02em;
        color: #fff;
      }
      .feild-heading-place {
        font-family: "Metropolis";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 69.84%;
        /* identical to box height, or 17px */

        letter-spacing: -0.02em;

        color: #d5d5d5;
      }
    }
  }
`;
