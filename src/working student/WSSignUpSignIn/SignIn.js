import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [emailValue, setEmailValue] = useState("");
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
        (u) => u.email === emailValue && u.password === passwordValue
      );

      if (user) {
        navigate("/wshomepage", { state: { loggedInUser: user } });
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
    }
  }, [navigate, users, emailValue, passwordValue]);

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const onLANDINGPAGEClick = useCallback(() => {
    navigate("/wslandingpage");
  }, [navigate]);

  const onSIGNUPClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="ws-sign-in">
      <img className="background" alt="" src="/bg1.png" />

      <div className="main-box" />
      <div className="back-bg" onClick={onLANDINGPAGEClick} />
      <img className="back-icon" alt="" src="/back.png" onClick={onLANDINGPAGEClick} />

      <img className="main-bg" alt="" src="/main-bg.png" />
      <img className="main-title" alt="" src="/TITLE.png" />

      <i className="welcome">WELCOME!</i>
      <i className="sub-title2">Sign in to your Account</i>

      <div className="E-name">Email</div>
      <input
        className="E-box"
        type="email"
        value={emailValue}
        onChange={handleEmailChange}
      />

      <div className="P-name">Password</div>
      <input
        className="P-box"
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
      />

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
