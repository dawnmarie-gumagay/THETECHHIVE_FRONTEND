import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Loadable from 'react-loadable';
import "./PopUpReport.css";

// Loadable component for PopUpConfirm
const PopUpConfirm = Loadable({
  loader: () => import('./PopUpConfirm'),
  loading: () => <div>Loading...</div>,
});

const PopUpReport = () => {
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const toggleConfirm = useCallback(() => {
    setConfirmVisible(!isConfirmVisible);
  }, [isConfirmVisible]);

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
        <img className="upload-icon" alt="" src="/upload-icon.png" />
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
          onClick={toggleConfirm}
        >
          REPORT
        </Button> 
      </div>

      {isConfirmVisible && (
        <div className="overlay" onClick={toggleConfirm}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PopUpConfirm onClose={toggleConfirm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpReport;
