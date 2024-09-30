import React, { useCallback, useState, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";
import PopUpConfirm from "./PopUpConfirm";

const PopUpReportFinal = ({ onBack, onClose }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [showImageLimitWarning, setShowImageLimitWarning] = useState(false);
  const fileInputRef = useRef(null);

  const hidePopUpReportFinal = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    hidePopUpReportFinal();
    navigate("/wsreport");
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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 3) {
      setShowImageLimitWarning(true);
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random() // Add a unique id
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
    
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id) => {
    setImages(prevImages => prevImages.filter(image => image.id !== id));
  };

  const handleCameraClick = () => {
    setShowCameraPermission(true);
  };

  const handleCameraPermission = (allow) => {
    setShowCameraPermission(false);
    if (allow) {
      // Implement camera access logic here
      console.log("Camera access granted");
    } else {
      console.log("Camera access denied");
    }
  };

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
            <b className="t-name">Location</b>
            <input
              className="Location-Input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Type here"
            />
          </div>
          <img className="Choose-Location" alt="" src="/r-location.png" />

          <div className="Upload-Photo-Container">
            <b>Upload photo</b>
            <span className="for-evidence"> (For evidence, max 5MB)</span>
          </div>

          <div className="Camera-Container" onClick={handleCameraClick}>
            <div className="bg-container" />
            <div className="n-camera">Camera</div>
            <img className="bicamera-icon" alt="" src="/cam2.png" />
          </div>

          <div className="Upload-Container">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <label htmlFor="file-upload" className="bg-container">
              <div className="n-upload">Upload file</div>
              <img className="symbolupload-icon" alt="" src="/rupload.png" />
            </label>
          </div>

          <div className="Image-Preview-Container">
            {images.map((image) => (
              <div key={image.id} className="Image-Preview">
                <img src={image.preview} alt={`Preview ${image.id}`} />
                <button onClick={() => removeImage(image.id)} className="remove-image-button">X</button>
              </div>
            ))}
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

      {showCameraPermission && (
        <div className="modal-overlay">
          <div className="modal-content camera-permission">
            <h2>Please allow access to your camera</h2>
            <img src="/camera.png" alt="Camera" className="camera-icon" />
            <div className="button-container">
              <button onClick={() => handleCameraPermission(false)} className="cancel-button">CANCEL</button>
              <button onClick={() => handleCameraPermission(true)} className="allow-button">ALLOW</button>
            </div>
          </div>
        </div>
      )}

      {showImageLimitWarning && (
        <div className="modal-overlay">
          <div className="modal-content image-limit-warning">
            <h3>You may add only up to 3 images</h3>
            <button onClick={() => setShowImageLimitWarning(false)} className="ok-button">OK</button>
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