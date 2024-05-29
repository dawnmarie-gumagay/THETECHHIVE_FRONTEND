import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const onLANDINGPAGEClick = useCallback(() => {
    navigate("/wslandingpage");
  }, [navigate]);

  const onHOMEPAGEClick = useCallback(() => {
    navigate("/wshomepage");
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
      <input className="E-box" type="email"  />
      
      <div className="P-name">Password</div>
      <input className="P-box" type="password" />
      
      <div className="SIContainer" onClick={onHOMEPAGEClick}>
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
