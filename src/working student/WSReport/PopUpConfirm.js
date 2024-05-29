import React from "react";
import "./PopUpConfirm.css";

const PopUpConfirm = ({ onClose, onConfirm }) => {
  return (
    <div className="pop-up-confirm">
      <div className="PUConfirm" />
      <div className="PUQuestion">
        Are you sure you want to confirm the report?
      </div>
      <img className="PUConfirmPic" alt="" src="/wreport-icon.png" />

      <div className="PUCReportConainer" onClick={onConfirm}>
        <div className="PUCReportButton" />
        <div className="PUCReportName">REPORT</div>
      </div>

      <div className="PUCCancelContainer" onClick={onClose}>
        <div className="PUCReportButton" />
        <div className="PUCCancelName">CANCEL</div>
      </div>
    </div>
  );
};

export default PopUpConfirm;
