
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignIn.css";
const SignIn = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [idNumberValue, setIdNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
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
    // Forgot password logic
    console.log("Forgot Password Clicked"); 
  }, [navigate]);
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
      <div className="q4">Don’t have an account?</div>
      <div className="q5" onClick={onSIGNUPClick}>
        Sign Up
      </div>
    </div>
  );
};
export default SignIn;
