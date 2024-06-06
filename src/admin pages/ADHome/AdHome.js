import React from "react";
import AdNavBar from "../../components/AdNavBar";
import "./AdHome.css";
import AdPost from "../../components/AdPost";
import AdPostContainer from "../../components/AdPostContainer";

const AdHome = () => {
  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="sub-container">
        <span>WILDCAT</span>
        <AdPost/>
        <AdPostContainer/>
      </main>
    </div>
  );
};

export default AdHome;
