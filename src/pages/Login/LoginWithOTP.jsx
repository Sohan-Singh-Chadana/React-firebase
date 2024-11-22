import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../../Firebase";

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

const LoginWithOTP = ({ setLoginWithOTP }) => {
  const [phone, setPhone] = React.useState("");
  const [isOtp, setIsOtp] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const navigate = useNavigate();

  const sendOTP = () => {
    // console.log(phone);

    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    setIsDisabled(true); // Disable the button to prevent spamming
    setTimeout(() => setIsDisabled(false), 30000); // Re-enable after 30 seconds

    const auth = getAuth(app);
    const appVerifier = new RecaptchaVerifier(auth, "abc", {
      size: "invisible",
    });

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((res) => {
        // console.log(res);
        window.confirmationResult = res;
        // console.log("otp send");
        setIsOtp(true);
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          alert(
            "Too many requests. Please wait before trying again or contact support."
          );
        } else {
          console.error("Error sending OTP:", error);
          alert("An error occurred: " + error.message);
        }
      });

    setPhone("");
  };

  const confirmOtp = () => {
    window.confirmationResult
      .confirm(code)
      .then((res) => {
        // console.log("User authenticated:", res);
        alert("Authentication successful!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <Container>
      {!isOtp ? (
        <SignUpContainer>
          <h2>Login with OTP</h2>
          <div style={{ margin: 0, width: "100%", lineHeight: 2.5 }}>
            <input
              onChange={(e) => setPhone("+91" + e.target.value)}
              // onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter Phone Number..."
              style={{ backgroundColor: "#ccc8c0", color: "black" }}
            />
            <div id="abc"></div>
            <button
              type="button"
              style={{ marginTop: "16px", width: "100%", marginInline: "auto" }}
              onClick={sendOTP}
            >
              {isDisabled ? "Wait 30 seconds" : "Send OTP"}
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <button type="button" onClick={() => setLoginWithOTP(false)}>
                Back
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </SignUpContainer>
      ) : (
        <SignUpContainer>
          <h2>Confirm OTP</h2>
          <div style={{ margin: 0, width: "100%", lineHeight: 2.5 }}>
            <input
              onChange={(e) => setCode(e.target.value)}
              type="text"
              // value={code}
              placeholder="Enter OTP "
              style={{ backgroundColor: "#ccc8c0", color: "black" }}
            />
            <button
              onClick={confirmOtp}
              type="submit"
              style={{ marginTop: "16px", width: "100%", marginInline: "auto" }}
            >
              Submit OTP
            </button>
          </div>
        </SignUpContainer>
      )}
    </Container>
  );
};

export default LoginWithOTP;
