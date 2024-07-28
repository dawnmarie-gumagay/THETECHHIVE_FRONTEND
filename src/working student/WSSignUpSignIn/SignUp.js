import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullNameValue, setFullNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [idNumberValue, setIdNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [idError, setIdError] = useState("");

  const onSignUpButtonClick = async () => {
    if (!fullNameValue || !emailValue || !usernameValue || !idNumberValue || !passwordValue || !confirmPasswordValue) {
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

    const idPattern = /^[0-9]{2}-[0-9]{4}-[0-9]{3}$/;
    if (!idPattern.test(idNumberValue)) {
      alert("ID Number format should be YY-NNNN-NNN");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to sign up?");
  
    if (confirmed) {
      try {
        const response = await axios.post("http://localhost:8080/user/insertUser", {
          fullName: fullNameValue,
          email: emailValue,
          username: usernameValue,
          idNumber: idNumberValue,
          password: passwordValue,
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

  const handleFullNameChange = (event) => {
    setFullNameValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsernameValue(event.target.value);
  };

  const handleIdNumberChange = (event) => {
    const value = event.target.value;
    const idPattern = /^[0-9]{2}-[0-9]{4}-[0-9]{3}$/;

    if (idPattern.test(value)) {
      setIdError("");
    } else {
      setIdError("ID Number format should be YY-NNNN-NNN");
    }

    setIdNumberValue(value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
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

      <div className="main-boxSU" />
      <div className="back-button-container" onClick={onSIGNUPSIGNINClick}>
        <div className="back-bgSU" />
        <img className="back-iconSU" alt="Back" src="/back.png" />
      </div>

      <img className="main-bgSU" alt="" src="/main-bg.png" />
      <img className="main-titleSU" alt="" src="/TITLE.png" />

      <i className="welcome2">WELCOME!</i>
      <i className="sub-title">Create your Account</i>

      <div className="full-name">Full Name</div>
      <input
        className="full-name-box"
        type="text"
        value={fullNameValue}
        onChange={handleFullNameChange}
      />

      <div className="email-name">Email</div>
      <input
        className="email-box"
        type="email"
        value={emailValue}
        onChange={handleEmailChange}
      />

      <div className="username-name">Username</div>
      <input
        className="username-box"
        type="text"
        value={usernameValue}
        onChange={handleUsernameChange}
      />

      <div className="id-number-name">ID Number</div>
      <input
        className="id-number-box"
        type="text"
        value={idNumberValue}
        onChange={handleIdNumberChange}
        
      />
      {idError && <p className="error-message">{idError}</p>}

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
