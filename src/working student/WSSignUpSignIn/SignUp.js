import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const onSUCCESSFULLYREGISTEREDClick = useCallback(() => {
    navigate("/successfullyregistered");
  }, [navigate]);

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
      
      <div className="username-box" />
      <div className="username-name">Username</div>

      <div className="email-box" />
      <div className="email-name">Email</div>

      <div className="pass-box" />
      <div className="pass-name">Password</div>

      <div className="cpass-box" />
      <div className="cpass-name">Confirm Password</div>

      <div className="signupContainer" onClick={onSUCCESSFULLYREGISTEREDClick}>
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
