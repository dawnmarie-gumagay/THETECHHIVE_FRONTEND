import React from "react";
import AdNavBar from "../../components/AdNavBar";
import IncomingReportText from "../../assets/image/reportsTitle.png";
import AdReportContainer from "../../components/AdReportContainer";

const AdEntry = () => {
  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="sub-container">
        <img src={IncomingReportText} />
        <AdReportContainer />
      </main>
    </div>
  );
};

export default AdEntry;