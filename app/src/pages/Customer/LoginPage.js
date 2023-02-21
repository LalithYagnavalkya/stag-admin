import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const LoginPage = () => {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [phonenumber, setphonenumber] = useState("");
  return (
    <CustomerLogin>
      <div className="logo-login">
        <img src="/logo.svg" alt="" />
        <span>Stag Investment</span>
      </div>
      <div className="whole-page">
        {isLoginPressed ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
              rowGap: "1rem",
              // alignItems: "center",
            }}
          >
            <Tooltip
              title="back"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => setIsLoginPressed(false)}
            >
              <IconButton>
                <ArrowBackIosIcon sx={{ color: "white" }} />{" "}
                <span style={{ color: "#fff" }}>Back</span>
              </IconButton>
            </Tooltip>
            <div className="Login-header">
              <TextField
                placeholder="Enter your phone number"
                variant="filled"
                fullWidth
                focused
                value={phonenumber}
                onChange={(e) => setphonenumber(e.target.value)}
                sx={{ backgroundColor: "#ffffff", fontFamily: "Poppins" }}
              ></TextField>
              <Tooltip
                title=""
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  color: "#fff",
                }}
                // onClick={}
              >
                <Button variant="contained">Send Otp</Button>
              </Tooltip>
            </div>
          </Box>
        ) : (
          <div className="login-options">
            <div className="Login-header" s>
              Sit back and relax while we make money for you.
            </div>
            <div className="options-container">
              <div
                className="login-button"
                onClick={() => setIsLoginPressed(true)}
              >
                Login
              </div>
              <div className="register-button">
                <a
                  href="https://stag-admin.vercel.app/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}

        <img className="login-illus" src="/illus/login.svg" alt="" srcset="" />
      </div>
    </CustomerLogin>
  );
};

export default LoginPage;

const CustomerLogin = styled.div`
  height: 100%;
  background-color: #1e1e1e;
  padding: 2rem 10rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  .logo-login {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #ffffff;
    img {
      margin-top: -1rem;
    }
  }
  .Login-header {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 60px;
    color: #ffffff;
    width: 70%;
  }
  .whole-page {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .login-illus {
    }
    .options-container {
      display: flex;
      column-gap: 2rem;
      padding-top: 4rem;
      .login-button {
        background: #f27900;
        border-radius: 28px;
        padding: 18px 50px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        /* identical to box height */

        color: #1e1e1e;
        cursor: pointer;
      }
      .register-button {
        cursor: pointer;

        border: 1px solid #f27900;
        border-radius: 28px;
        padding: 18px 50px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        /* identical to box height */

        color: #f27900;
      }
    }
  }
  overflow: hidden;
`;
