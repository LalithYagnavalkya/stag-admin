import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeStyles>
      <div className="header">
        <span>
          <img src="/logo.svg" alt="" />
        </span>
        <span>Stag Investments</span>
      </div>
    </HomeStyles>
  );
};

export default Home;

const HomeStyles = styled.div`
  /* hell */
  background-color: #1e1e1e;
  padding: 2rem;
  height: calc(100vh - 4rem);
  color: white;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    img {
      /* height: 2rem; */
    }
    span {
      font-size: 24px;
    }
  }
`;
