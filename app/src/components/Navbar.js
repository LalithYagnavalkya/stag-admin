import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// this navbar is not used
// go to defaultlayout.js where the actual navbar has been written

const Navbar = () => {
  return (
    <NavWrapper>
      <div className="logo">
        <span>
          <img src="/logo.svg" alt="" />
        </span>
        <span>Stag Investments</span>
      </div>
      <div className="links">
        <span>
          <NavLink
            style={{ textDecoration: "none", color: "#FFFFFF" }}
            to="/app/home"
          >
            Home
          </NavLink>
        </span>
        <span>
          <NavLink
            style={{ textDecoration: "none", color: "#FFFFFF" }}
            to={"/app/customers"}
          >
            Customers
          </NavLink>
        </span>
        <span>
          <Button variant="outlined"> Logout </Button>
          {/* <NavLink

            style={{ textDecoration: "none", color: "#FFFFFF" }}
            to={"/app/profile"}
          >
            Profile
          </NavLink> */}
        </span>
      </div>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.div`
  height: 64px;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 0 2rem;
  padding-top: 0.9rem;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    font-weight: 500;
    img {
      /* margin-top: -10px; */
    }
  }
  .links {
    color: white;
    display: flex;
    column-gap: 1rem;
    span {
      cursor: pointer;
      border-bottom: 2px solid #1e1e1e;
      padding-bottom: 4px;
    }
    span:hover {
      border-bottom: 2px solid #f27900;
    }
  }
`;
