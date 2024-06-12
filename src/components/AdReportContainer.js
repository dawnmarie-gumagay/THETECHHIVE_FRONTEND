import React from "react";
import "./AdContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ExampleImage from "../assets/image/ex.png";
import RespondDialog from "./RespondDialog";


export default function AdReportContainer() {
  return (
    <div className="post-card">
      <div className="card-container">
        <div className="name-container">
          <img src={CitLogo} alt="Cit Logo" />
          <h5>Richard Molina</h5>
        </div>
        <div className="card-contents">
          <div className="text-designs">
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