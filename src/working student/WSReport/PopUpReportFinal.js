import { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";
import PopUpConfirm from "./PopUpConfirm";

const PopUpReportFinal = ({ onBack, onClose }) => { 
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const hidePopUpReportFinal = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose(); // Call onClose prop if provided
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    hidePopUpReportFinal();
    navigate("/wsreport"); // Navigate to wsreport page after confirming
  }, [hidePopUpReportFinal, navigate]);

  const onPopUpReportClick = useCallback(() => {
    setShowPopUpConfirm(true);
  }, []);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate("/wsreport");
    }
  }, [onBack, navigate]);

  return (
    <>
      {isVisible && (
        <div className="PopUpReportFinalPage">
          <div className="Description-Container">
            <b className="t-name">Description</b>
            <textarea
              className="Description-Input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here"
              rows="5"
            />
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
      )}

      {showPopUpConfirm && (
        <PopUpConfirm
          onClose={() => setShowPopUpConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default PopUpReportFinal;