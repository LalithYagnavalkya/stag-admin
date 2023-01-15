import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { login } from "../features/auth/authSlice";
const LoginPage = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginreq, setReq] = useState({ username: "", password: "" });
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log("got triggered");
    dispatch(login(loginreq));
  };
  useEffect(() => {
    if (isError) {
      console.log("error occuere in loginpage");
    }
    if (isSuccess || user) {
      navigate(`/home`);
    } else {
      // dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <LoginStyles>
      <div className="login-header">
        <span>Stag Investments</span>
      </div>
      <div className="login-body">
        <div className="login-left-section">
          <span className="login-portal-heading">Admin Portal</span>
          <div className="login-admin-portal-container">
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setReq((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setReq((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
            </div>
          </div>
          {isError && <span style={{ color: "red" }}>invalid credentials</span>}
          <button className="login-btn" onClick={(e) => loginHandler(e)}>
            Login In
          </button>
        </div>
        <div className="login-right-section">
          <img src="/logo.svg" alt="" />
        </div>
      </div>
    </LoginStyles>
  );
};

export default LoginPage;

const LoginStyles = styled.div`
  background-color: #1e1e1e;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .login-header {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    padding: 0 2rem;
    padding-top: 32px;
  }
  .login-body {
    display: flex;
    overflow: hidden;
    height: 100%;
    justify-content: center;
    align-items: center;
    .login-left-section {
      display: flex;
      flex-direction: column;
      flex: 0.5;
      justify-content: center;
      align-items: center;
      row-gap: 40px;
      .login-portal-heading {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 36px;
        color: #c9c9c9;
        width: 40%;
      }
      .login-admin-portal-container {
        display: flex;
        flex-direction: column;
        row-gap: 40px;
        width: 40%;
        div {
          input {
            outline: none;
            background-color: transparent;
            border: none;
            color: #e8e8e8;
            font-family: "Metropolis";
            font-size: 17px;
          }
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
          }
          padding: 7px;
          border-bottom: 1px solid white;
        }
      }
      .login-btn {
        cursor: pointer;
        padding: 15px 21px;
        background: #f27900;
        border-radius: 14px;
        border: none;
        font-family: "Metropolis";
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        flex: none;
        order: 0;
        flex-grow: 0;
      }
      .login-btn:hover {
        background-color: #4e9f3d;
      }
    }
    .login-right-section {
      flex: 0.5;
      img {
        width: 55%;
      }
    }
  }
`;
