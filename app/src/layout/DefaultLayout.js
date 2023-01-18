import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const DefaultLayout = () => {
  return (
    <DefaultWrapper>
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </DefaultWrapper>
  );
};

export default DefaultLayout;

const DefaultWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  .page {
    height: calc(100vh - 0.9rem - 64px);
    /* height: 100%; */
    background-color: #1e1e1e;
  }
`;
