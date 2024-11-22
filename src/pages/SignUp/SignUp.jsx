import React from "react";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh; // Full height for centering
`;
const SignUpContainer = styled.div`
  background-color: white;
  color: black;
  box-shadow: 0 0 10px rgb(175 30 237 / 69%);
  // height: 300px;
  width: 30%;
  padding: 20px;
  border-radius: 20px;

  @media (max-width: 1194px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res);
        // console.log(res.user);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });

    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
  };
  return (
    <Container>
      <SignUpContainer>
        <h2>SignUp</h2>
        <form onSubmit={submitHandler} style={{ margin: 0, width: "100%" }}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Enter email"
            style={{ backgroundColor: "#ccc8c0", color: "black" }}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            style={{ backgroundColor: "#ccc8c0", color: "black" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button type="submit">SignUp</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
