import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";

const PopUpReportFinal = ({ onBack }) => { // Accept onBack prop
  const navigate = useNavigate();

  const onPopUpReportClick = useCallback(() => {
    navigate("/pop-upcritical-emergency");
  }, [navigate]);

  const handleBack = () => {
    if (onBack) {
      onBack(); // Call the back handler
    } else {
      navigate("/wsreport"); // Default navigation if onBack is not provided
    }
  };

  return (
    <div className="PopUpReportFinalPage">
      <div className="Description-Container">
        <div className="Description-Input" />
        <b className="t-name">Description</b>
        <div className="type-here">Type here</div>
      </div>

      <div className="Location-Container">
        <div className="Description-Input" />
        <b className="t-name">Location</b>
        <div className="type-here">Type here</div>
      </div>
      <img className="Choose-Location" alt="" src="/r-location.png" />

      <div className="Upload-Photo-Container">
        <b>Upload photo</b>
        <span className="for-evidence"> (For evidence, max 5MB)</span>
      </div>

      <div className="Camera-Container">
        <div className="bg-container" />
        <div className="n-camera">Camera</div>
        <img className="bicamera-icon" alt="" src="/rcam.png" />
      </div>

      <div className="Upload-Container">
        <div className="bg-container" />
        <div className="n-upload">Upload file</div>
        <img className="symbolupload-icon" alt="" src="/rupload.png" />
      </div>

      <Button
        className="ReportFinal-next-button"
        variant="contained"
        sx={{
          borderRadius: "10px",
          width: 165,
          height: 40,
          backgroundColor: "#8A252C",
          transition: "all 0.3s ease",
          "&:hover, &:active": {
            backgroundColor: "#A91D3A",
            transform: "scale(1.05)",
          },
          "@media (max-width: 500px)": {
            width: 140,
            height: 36,
          },
        }}
        onClick={onPopUpReportClick}
      >
        <span style={{ fontSize: "15px" }}>NEXT</span>
      </Button>
      
      <div className="back-button-containerFR" onClick={handleBack}>
        <div className="back-bgFR" />
        <img className="back-iconFR" alt="Back" src="/back.png" />
      </div>
    </div>
  );
};

export default PopUpReportFinal;
