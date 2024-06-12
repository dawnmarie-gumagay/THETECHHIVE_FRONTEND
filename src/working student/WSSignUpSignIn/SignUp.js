import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const onSignUpButtonClick = async () => {
    if (!emailValue || !passwordValue || !usernameValue || !confirmPasswordValue) {
      alert("All fields are required.");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      alert("Password and confirm password do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(passwordValue);

    if (!isPasswordValid) {
      alert("Password must have a minimum of 8 characters, a combination of uppercase and lowercase letters, with special character/s.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to sign up?");
  
    if (confirmed) {
      try {
        const response = await axios.post("http://localhost:8080/user/insertUser", {
          username: usernameValue,
          password: passwordValue,
          email: emailValue,
          isAdmin: false
        });
    
        if (response.status === 200) {
          navigate("/successfullyregistered");
        }
      } catch (error) {
        console.error("Signup Error:", error);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsernameValue(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordValue(event.target.value);
  };

  const onSIGNINClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const onSIGNUPSIGNINClick = useCallback(() => {
    navigate("/wssignupsignin");
  }, [navigate]);

  return (
    <div className="ws-sign-up">
      <img className="background" alt="" src="/bg1.png" />

      <div className="main-box" />
      <div className="back-bg" onClick={onSIGNUPSIGNINClick} />
      <img className="back-icon" alt="" src="/back.png" onClick={onSIGNUPSIGNINClick} />

      <img className="main-bg" alt="" src="/main-bg.png" />
      <img className="main-title" alt="" src="/TITLE.png" />

      <i className="welcome2">WELCOME!</i>
      <i className="sub-title">Create your Account</i>

      <div className="username-name">Username</div>
      <input
        className="username-box"
        type="text"
        value={usernameValue}
        onChange={handleUsernameChange}
      />

      <div className="email-name">Email</div>
      <input
        className="email-box"
        type="email"
        value={emailValue}
        onChange={handleEmailChange}
      />

      <div className="pass-name">Password</div>
      <input
        className="pass-box"
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
      />

      <div className="cpass-name">Confirm Password</div>
      <input
        className="cpass-box"
        type="password"
        value={confirmPasswordValue}
        onChange={handleConfirmPasswordChange}
      />

      <div className="signupContainer" onClick={onSignUpButtonClick}>
        <div className="s-button" />
        <div className="s-name">SIGN UP</div>
      </div>

      <div className="q1">Already have an account?</div>
      <div className="q2" onClick={onSIGNINClick}>
        Sign In
      </div>
    </div>
  );
};

export default SignUp;
