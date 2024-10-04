import React from "react";
import AdNavBar from "../../components/AdNavBar";
import IncomingReportText from "../../assets/image/reportsTitle.png";
import AdReportContainer from "../../components/AdReportContainer";
import "./AdEntry.css";

const AdEntry = () => {
  return (
    <div className="entrymain-container">
      <header>
        <AdNavBar />
      </header>
      <main className="entrysub-container">
        <img src={IncomingReportText} alt="Incoming Reports" className="report-header-image" />
        <AdReportContainer />
      </main>
    </div>
  );
};

export default AdEntry;
