import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./SignIn.css";
import WildCatText from "../../assets/image/TITLE.png";
import WildAdmin from "../../assets/image/wildcat-admin.png";
import SignInForm from "./AdSignInForm";
import AdHome from "../ADHome/AdHome"; // Adjust the import path accordingly

const AdSignIn = () => {
  return (
    <div className="bg-main">
      <div className="container">
        <div className="icon">
          <img className="img1" src={WildCatText} alt="WildCat Text" />
          <img className="img2" src={WildAdmin} alt="Wild Admin" />
        </div>
        <div className="login-container">
          <div className="login-design">
            <span>WELCOME!</span>
            <span style={{ fontWeight: "300" }}>
              Sign in to your Account
            </span>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default AdSignIn;
