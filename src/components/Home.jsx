import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height for centering
`;

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      <h1>
        Welcome{" "}
        {currentUser.displayName ? currentUser.displayName : ` to my React App`}
      </h1>
      {/* <h1>Welcome to my React App</h1> */}
    </Container>
  );
};

export default Home;
