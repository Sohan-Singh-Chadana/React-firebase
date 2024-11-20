import React from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../Firebase";
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
  width: 400px;
  padding: 20px;
  border-radius: 20px;
`;

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((useData) => {
        console.log(useData);
        console.log(useData.user);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));

    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
  };

  const loginWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  const loginWithFacebook = () => {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  const loginWithGithub = () => {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <SignUpContainer>
        <h2>Login</h2>
        <form onSubmit={submitHandler} style={{ margin: 0 }}>
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
            }}
          >
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={loginWithGoogle}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              Login with Google{" "}
              <img
                src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
                alt="Google Icon"
                width={30}
                height={30}
              />
            </button>
            <button
              type="button"
              onClick={loginWithGithub}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              Login with Github
              <img
                src="https://banner2.cleanpng.com/20190523/juu/kisspng-github-software-repository-computer-icons-email-5ce6e863973725.5475298415586366436194.jpg"
                width={40}
                height={40}
              />
            </button>
            <button
              type="button"
              onClick={loginWithFacebook}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              Login with FaceBook
              <img
                src="https://icon2.cleanpng.com/20190402/iob/kisspng-portable-network-graphics-computer-icons-jpeg-imag-1713899405879.webp"
                width={40}
                height={40}
              />
            </button>
          </div>
        </form>
      </SignUpContainer>
    </Container>
  );
};

export default Login;
