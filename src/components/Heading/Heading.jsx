import styled from "styled-components";

const HeadingTitle = styled.h2`
  color: white;
  background-color: #32394c;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Heading = ({ children }) => {
  return <HeadingTitle>{children}</HeadingTitle>;
};

export default Heading;
