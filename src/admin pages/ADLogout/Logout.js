import React from "react";
import "./Logout.css";
import WildText from "../../assets/image/TITLE.png";
import CatRunning from "../../assets/image/CatRunning.png";

const AdLogout = () => {
  return (
    <div className="bg-main">
      <div className="logout-container">
        <div className="wildcat-container">
          <div className="wildtap-container">
            <img src={WildText} alt="title" />
          </div>
        </div>
        <div className="return-container">
          <img src={CatRunning} alt="Cat Running" />
          <h1>Wildcat on the prowl!</h1>
          <button>RETURN HOME</button>
        </div>
      </div>
    </div>
  );
};

export default AdLogout;
