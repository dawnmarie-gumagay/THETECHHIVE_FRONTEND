import { useCallback } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";

const PopUpReportFinal = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upconfirmation");
  }, [navigate]);

  const onMingcutelocationLineIconClick = useCallback(() => {
    navigate("/pop-uppermission-loc");
  }, [navigate]);

  const onGroupContainerClick1 = useCallback(() => {
    navigate("/pop-uppermission");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    navigate("/pop-upcritical-emergency");
  }, [navigate]);

  return (
    <div className="pop-up-report1">
      <div className="pop-up-report-item" />
      <div className="rectangle-parent9" onClick={onGroupContainerClick}>
        <div className="group-child24" />
        <div className="report3">REPORT</div>
      </div>
      <div className="rectangle-parent10">
        <div className="group-child25" />
        <b className="location">Description</b>
        <div className="type-here1">Type here</div>
      </div>
      <div className="upload-photo-for-container1">
        <b>Upload photo</b>
        <span className="for-evidence-max1"> (For evidence, max 5MB)</span>
      </div>
      <div className="rectangle-parent11">
        <div className="group-child26" />
        <div className="upload-file">Upload file</div>
        <img
          className="material-symbolsupload-icon"
          alt=""
          src="/materialsymbolsupload.svg"
        />
      </div>
      <div className="rectangle-parent12">
        <div className="group-child25" />
        <b className="location">Location</b>
        <div className="type-here1">Type here</div>
      </div>
      <img
        className="mingcutelocation-line-icon"
        alt=""
        src="/mingcutelocationline.svg"
        onClick={onMingcutelocationLineIconClick}
      />
      <div className="rectangle-parent13" onClick={onGroupContainerClick1}>
        <div className="group-child26" />
        <div className="camera">Camera</div>
        <img className="bicamera-icon" alt="" src="/bicamera.svg" />
      </div>
      <b className="severity-of-the">Severity of the issue</b>
      <div className="group-parent2">
        <div className="ellipse-wrapper">
          <FormControlLabel
            className="group-child29"
            label=""
            control={<Radio color="success" />}
          />
        </div>
        <div className="ellipse-frame">
          <FormControlLabel
            className="group-child29"
            label=""
            control={<Radio color="success" />}
          />
        </div>
        <div className="ellipse-wrapper1">
          <FormControlLabel
            className="group-child29"
            label=""
            control={<Radio color="success" />}
          />
        </div>
        <div className="medium">Medium</div>
        <div className="low">Low</div>
      </div>
      <div className="low-general-container">
        <span className="high">Low</span>
        <span className="general-report2">{` - General Report  `}</span>
        <span className="high">Medium</span>
        <span className="general-report2">{` - Urgent Situation  `}</span>
        <span className="high">High</span>
        <span className="critical-emergency2"> - Critical Emergency</span>
      </div>
      <img
        className="pop-up-report-child1"
        alt=""
        src="/group-56.svg"
        onClick={onGroupIconClick}
      />
      <div className="high1">High</div>
    </div>
  );
};

export default PopUpReportFinal;
