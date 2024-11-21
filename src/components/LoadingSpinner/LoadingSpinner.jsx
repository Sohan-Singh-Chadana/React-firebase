import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height for centering
`;
const Loader = styled.div`
  border: 0.5rem solid white;
  border-top: 0.5rem solid transparent;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function LoadingSpinner() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}
