import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [idNumberValue, setIdNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [resetStep, setResetStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSignInButtonClick = useCallback(async () => {
    try {
      const user = users.find(
        (u) => u.idNumber === idNumberValue && u.password === passwordValue
      );
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/wshomepage", { state: { loggedInUser: user } });
      } else {
        alert("Invalid ID Number or Password. Please enter both fields correctly.");
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
    }
  }, [navigate, users, idNumberValue, passwordValue]);

  const handleIdNumberChange = (event) => {
    setIdNumberValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const onSIGNUPSIGNINClick = useCallback(() => {
    navigate("/wssignupsignin");
  }, [navigate]);

  const onSIGNUPClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const handleForgotPasswordClick = useCallback(() => {
    setResetStep(1);
  }, []);

  const handleSendCode = useCallback(async () => {
    // TODO: Implement API call to send reset code
    setResetStep(2);
    // Note: We don't start the countdown here anymore
  }, [resetEmail]);

  const handleResendCode = useCallback(() => {
    if (countdown === 0) {
      // TODO: Implement API call to resend reset code
      setCountdown(30); // Start the countdown when resend is clicked
    }
  }, [countdown]);

  const handleVerifyCode = useCallback(async () => {
    // TODO: Implement API call to verify reset code
    setResetStep(3);
  }, [resetCode]);

  const handleResetPassword = useCallback(async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Implement API call to reset password
    setResetStep(4);
  }, [newPassword, confirmPassword]);

  const handleGoBack = useCallback(() => {
    setResetStep(0);
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
    setCountdown(0);
  }, []);

  const handleResetBack = useCallback(() => {
    if (resetStep > 1) {
      setResetStep(resetStep - 1);
    } else {
      setResetStep(0);
      setResetEmail("");
      setResetCode("");
      setNewPassword("");
      setConfirmPassword("");
      setCountdown(0);
    }
  }, [resetStep]);

  return (
    <div className="ws-sign-in">
      <img className="background" alt="" src="/bg1.png" />
      <div className="main-boxSI" />
      <div className="back-button-container" onClick={onSIGNUPSIGNINClick}>
        <div className="back-bgSI" />
        <img className="back-iconSI" alt="Back" src="/back.png" />
      </div>
      <img className="main-bgSI" alt="" src="/main-bg.png" />
      <img className="main-titleSI" alt="" src="/TITLE.png" />
      <i className="welcomeSI">WELCOME!</i>
      <i className="sub-title2">Sign in to your Account</i>
      <div className="id-number-in">ID Number</div>
      <input
        className="id-number-b"
        type="text"
        value={idNumberValue}
        onChange={handleIdNumberChange}
      />
      <div className="P-name">Password</div>
      <input
        className="P-box"
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
      />
      <div className="forgot-password" onClick={handleForgotPasswordClick}>
        Forgot Password?
      </div>
      <div className="SIContainer" onClick={onSignInButtonClick}>
        <div className="SIButton" />
        <div className="SIName">SIGN IN</div>
      </div>
      <div className="q4">Don't have an account?</div>
      <div className="q5" onClick={onSIGNUPClick}>
        Sign Up
      </div>

      {resetStep > 0 && (
        <div className="password-reset-overlay">
          {resetStep === 1 && (
            <div className="password-reset-step">
              <div className="reset-back-button" onClick={handleResetBack}>
                <div className="reset-back-bg" />
                <img className="reset-back-icon" alt="Back" src="/back.png" />
              </div>
              <h2>Enter email address</h2>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button onClick={handleSendCode}>SEND CODE</button>
            </div>
          )}
          {resetStep === 2 && (
            <div className="password-reset-step">
              <div className="reset-back-button" onClick={handleResetBack}>
              <div className="reset-back-bg" />
              <img className="reset-back-icon" alt="Back" src="/back.png" />
            </div>
              <h2>Enter verification code</h2>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
              <button onClick={handleVerifyCode}>VERIFY</button>
              <div className="resend-code-container">
                <span 
                  className={`resend-code ${countdown > 0 ? 'disabled' : ''}`} 
                  onClick={handleResendCode}
                >
                  Resend code
                </span>
                {countdown > 0 && <span className="countdown">({countdown}s)</span>}
              </div>
            </div>
          )}
          {resetStep === 3 && (
            <div className="password-reset-step">
              <h2>Enter New Password</h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <h2>Confirm Password</h2>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handleResetPassword}>RESET PASSWORD</button>
            </div>
          )}
          {resetStep === 4 && (
            <div className="password-reset-step">
              <h2>Password reset successfully!</h2>
              <button onClick={handleGoBack}>GO BACK</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignIn;