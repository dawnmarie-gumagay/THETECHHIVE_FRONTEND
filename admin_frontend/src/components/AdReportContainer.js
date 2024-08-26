import React from "react";
import "./AdEntryContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ExampleImage from "../assets/image/ex.png";
import RespondDialog from "./RespondDialog";


export default function AdReportContainer() {
  return (
    <div className="entrypost-card">
      <div className="entrycard-container">
        <div className="entryname-container">
          <img src={CitLogo} alt="Cit Logo" />
          <h5>Richard Molina</h5>
        </div>
        <div className="entrycard-contents">
          <div className="entrytext-designs">
            <h5>
              Incident Type: <span>Medical Emergency</span>
            </h5>
            <h5>
              Incident Location: <span>NGE Building</span>
            </h5>
          </div>
          <img src={ExampleImage} />
        </div>
        <div className="footer-line" />
        <div className="footer-actions">
          <RespondDialog/>
        </div>
      </div>
    </div>
  );
}