import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";
import PopUpConfirm from "./PopUpConfirm";

const IPSTACK_API_KEY = '0c8e5f05b9540853d776dd42254ca091';

const PopUpReportFinal = ({ onBack, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    location: { address: "", latitude: null, longitude: null },
    images: []
  });
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [showImageLimitWarning, setShowImageLimitWarning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const fileInputRef = useRef(null);

  const hidePopUpReportFinal = useCallback(() => {
    setIsVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    hidePopUpReportFinal();
    navigate("/wsreport");
  }, [hidePopUpReportFinal, navigate]);

  const validateInputs = () => {
    const errors = {};
    const descriptionEmpty = formData.description.trim() === "";
    const locationEmpty = formData.location.address.trim() === "";
    const imagesEmpty = formData.images.length === 0;
    
    const emptyFieldsCount = [descriptionEmpty, locationEmpty, imagesEmpty].filter(Boolean).length;
  
    if (emptyFieldsCount === 3) {
      errors.general = "Missing: description, location, image. Please provide to continue";
    } else if (emptyFieldsCount === 2 || emptyFieldsCount === 1) {
      if (emptyFieldsCount === 2) {
        errors.general = "Error: Incomplete Information Provided";
      } else {
        if (descriptionEmpty) errors.description = "It seems you're missing: Description. Please provide it to continue";
        if (locationEmpty) errors.location = "It seems you're missing: Location. Please provide it to continue";
        if (imagesEmpty) errors.images = "It seems you're missing: Image. Please provide it to continue";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onPopUpReportClick = useCallback(() => {
    if (validateInputs()) {
      setShowPopUpConfirm(true);
    }
  }, [formData]);

  const handleBack = useCallback(() => {
    setIsVisible(false);
    navigate("/wsreport");
  }, [navigate]);

  const getUserLocation = async () => {
    try {
      const response = await fetch(`http://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`);
      const data = await response.json();
      if (data.success !== false) {
        const { latitude, longitude, city, region_name, country_name } = data;
        const address = `${city}, ${region_name}, ${country_name}`;
        setFormData(prev => ({ ...prev, location: { address, latitude, longitude } }));
      } else {
        throw new Error("Geolocation failed: " + data.error.info);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setFormData(prev => ({ ...prev, location: { address: "Error getting location", latitude: null, longitude: null } }));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 3 - formData.images.length;
    
    if (files.length > remainingSlots) {
      setShowImageLimitWarning(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
  
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
  
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(image => image.id !== id) }));
  };

  const handleCameraClick = () => {
    if (formData.images.length >= 3) {
      setShowImageLimitWarning(true);
    } else {
      setShowCameraPermission(true);
    }
  };

  const handleCameraPermission = async (allow) => {
    setShowCameraPermission(false);
    if (allow) {
      setShowCamera(true);
    }
  };

  const handleCaptureImage = (image) => {
    if (formData.images.length >= 3) {
      setShowImageLimitWarning(true);
      setShowCamera(false);
      return;
    }

    const newImage = {
      file: dataURLtoFile(image, 'capture.png'),
      preview: image,
      id: Date.now() + Math.random()
    };
    setFormData(prev => ({ ...prev, images: [...prev.images, newImage] }));
    setShowCamera(false);
  };

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  if (!isVisible) return null;

  return (
    <>
      <div className="PopUpReportFinalPage">
        <div className="Description-Container">
          <b className="t-name">Description</b>
          <textarea
            className={`Description-Input ${validationErrors.description ? 'error' : ''}`}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="What happened?"
            rows="5"
          />
        </div>
        <div className="Location-Container">
          <b className="t-name">Location</b>
          <input
            className={`Location-Input ${validationErrors.location ? 'error' : ''}`}
            value={formData.location.address}
            onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, address: e.target.value } }))}
            placeholder="Where it happened?"
          />
        </div>
        <img
          className="Choose-Location"
          alt=""
          src="/r-location.png"
          onClick={getUserLocation}
        />
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
          {formData.images.map((image) => (
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
            position: 'absolute',
            top: '580px',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: "10px",
            width: 165,
            height: 40,
            backgroundColor: "#8A252C",
            transition: "all 0.3s ease",
            "&:hover, &:active": {
              backgroundColor: "#A91D3A",
              transform: "translateX(-50%) scale(1.05)",
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
        {Object.keys(validationErrors).length > 0 && (
          <div className="validation-errors-container">
            {validationErrors.general ? (
              <div className="error-message">{validationErrors.general}</div>
            ) : (
              <>
                {validationErrors.description && (
                  <div className="error-message">{validationErrors.description}</div>
                )}
                {validationErrors.location && (
                  <div className="error-message">{validationErrors.location}</div>
                )}
                {validationErrors.images && (
                  <div className="error-message">{validationErrors.images}</div>
                )}
              </>
            )}
          </div>
        )}
        <div className="back-button-containerFR" onClick={handleBack}>
          <div className="back-bgFR" />
          <img className="back-iconFR" alt="Back" src="/back.png" />
        </div>
      </div>
      {showCameraPermission && (
        <CameraPermissionModal onAllow={handleCameraPermission} />
      )}
      {showImageLimitWarning && (
        <ImageLimitWarningModal onClose={() => setShowImageLimitWarning(false)} />
      )}
      {showCamera && (
        <CameraModal
          onCapture={handleCaptureImage}
          onClose={() => setShowCamera(false)}
        />
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

const CameraPermissionModal = ({ onAllow }) => (
  <div className="modal-overlay">
    <div className="modal-content camera-permission">
      <h2>Please allow access to your camera</h2>
      <img src="/camera.png" alt="Camera" className="camera-icon" />
      <div className="button-container">
        <button onClick={() => onAllow(false)} className="cancel-button">DENY</button>
        <button onClick={() => onAllow(true)} className="allow-button">ALLOW</button>
      </div>
    </div>
  </div>
);

const ImageLimitWarningModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content image-limit-warning">
      <h3>You may add only up to 3 images</h3>
      <button onClick={onClose} className="ok-button">OK</button>
    </div>
  </div>
);

const CameraModal = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Ensure camera is stopped when component unmounts
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access the camera. Please check your permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      context.translate(canvasRef.current.width, 0);
      context.scale(-1, 1);
      
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      context.setTransform(1, 0, 0, 1, 0, 0);
      
      const image = canvasRef.current.toDataURL('image/png');
      stopCamera(); // Stop camera before closing
      onCapture(image);
    }
  };

  const handleClose = () => {
    stopCamera(); // Stop camera before closing
    onClose();
  };

  return (
    <div className="camera-modal">
      <button onClick={handleClose} className="camera-close-button">X</button>
      <div className="camera-feed-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
          />
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="camera-controls">
        <button onClick={handleCapture} className="camera-capture-button">
          <div className="camera-capture-circle">
            <img src="/cam2.png" alt="Capture" className="camera-capture-icon" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PopUpReportFinal;