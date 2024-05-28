import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./PopUpReport.css";

const PopUpReport = () => {
  const navigate = useNavigate();

  const onCONFIRMClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);
  return (
    <div className="pop-up-report">
      <div className="PopUpReport-Box" />

      <div className="LevelIncident-Container">
        <div className="LevelIncident-Dropdown" />
        <div className="level-of-incident">Level of Incident</div>
        <div className="Incident-Input">Type here</div>
      </div>

      <div className="IncidentType-Container">
        <div className="IncidentType-Dropdown" />
        <div className="IncidentType-Name">Incident Type</div>
        <div className="Incident-Input">Type here</div>
      </div>
      
      <div className="UploadPhoto-Container">
        <div className="Upload-Button" />
        <div className="UP-Name1">Upload photo (For evidence)</div>
        <div className="UP-Name2">Upload file</div>
        <img
          className="upload-icon"
          alt=""
          src="/upload-icon.png"
        />
      </div>
      <div className="ReportContainer">
      <Button
        className="ReportButton"
        variant="contained"
        sx={{ borderRadius: "10px", 
              width: 165, 
              height: 40,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" } 
            }}
        onClick={onCONFIRMClick}
      >
        REPORT
      </Button> 
      </div>
    </div>
  );
};




export default PopUpReport;
