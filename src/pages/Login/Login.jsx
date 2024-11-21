import React from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import LoginWithOTP from "./LoginWithOTP";

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
  width: 500px;
  padding: 20px;
  border-radius: 20px;
`;

const LoginWithAnother = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  // width: 0px;
  padding: 0px;
  background: #f7f1f1;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginWithOTP, setLoginWithOTP] = React.useState(false);
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
    <>
      {!loginWithOTP ? (
        <Container>
          <SignUpContainer>
            <h2>Login</h2>
            <form
              onSubmit={submitHandler}
              style={{ margin: 0, width: "100%", lineHeight: 2.5 }}
            >
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
              <button
                type="button"
                style={{
                  marginTop: "16px",
                  width: "100%",
                  marginInline: "auto",
                }}
                onClick={() => setLoginWithOTP(true)}
              >
                Login With OTP
              </button>
              <Wrapper>
                <LoginWithAnother type="button" onClick={loginWithGoogle}>
                  {/* Login with Google{" "} */}
                  <img
                    src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business-thumbnail.png"
                    alt="Google Icon"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                </LoginWithAnother>
                <LoginWithAnother type="button" onClick={loginWithGithub}>
                  {/* Login with Github */}
                  <img
                    src="https://banner2.cleanpng.com/20190523/juu/kisspng-github-software-repository-computer-icons-email-5ce6e863973725.5475298415586366436194.jpg"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                </LoginWithAnother>
                <LoginWithAnother type="button" onClick={loginWithFacebook}>
                  {/* Login with FaceBook */}
                  <img
                    src="https://icon2.cleanpng.com/20190402/iob/kisspng-portable-network-graphics-computer-icons-jpeg-imag-1713899405879.webp"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                </LoginWithAnother>
              </Wrapper>
            </form>
          </SignUpContainer>
        </Container>
      ) : (
        <LoginWithOTP setLoginWithOTP={setLoginWithOTP} />
      )}
    </>
  );
};

export default Login;
