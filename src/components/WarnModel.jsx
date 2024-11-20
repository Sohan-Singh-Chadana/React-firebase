import React from "react";
import styled from "styled-components";

const Model = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModelBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff9c;
`;

const WarnModel = ({ children, showModal }) => {
  return (
    <>
      {showModal && (
        <ModelBack>
          <Model>{children}</Model>
        </ModelBack>
      )}
    </>
  );
};

export default WarnModel;
