import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";
import PopUpConfirm from "./PopUpConfirm";

const PopUpReportFinal = ({ onBack, onClose }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({
    address: "",
    latitude: null,
    longitude: null
  });
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [showImageLimitWarning, setShowImageLimitWarning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
            const data = await response.json();
            if (data.status === "OK") {
              const address = data.results[0].formatted_address;
              setLocation({ address, latitude, longitude });
            } else {
              console.error("Geocoding failed:", data.status);
              setLocation({ address: "Location not found", latitude, longitude });
            }
          } catch (error) {
            console.error("Error getting location:", error);
            setLocation({ address: "Error getting location", latitude, longitude });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ address: "Error getting location", latitude: null, longitude: null });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation({ address: "Geolocation not supported", latitude: null, longitude: null });
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 3) {
      setShowImageLimitWarning(true);
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
    
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

  const handleCameraPermission = async (allow) => {
    setShowCameraPermission(false);
    if (allow) {
      try {
        console.log("Attempting to access camera...");
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (err) {
          console.log("Failed with default constraints, trying fallback...");
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user"
            }
          });
        }
        console.log("Camera access granted:", stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Video element source set");
          await videoRef.current.play();
          console.log("Video playback initiated");
        }
        setShowCamera(true);
        setCameraError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError(`Camera error: ${err.name} - ${err.message}`);
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.videoWidth > 0) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob((blob) => {
        const newImage = {
          file: blob,
          preview: URL.createObjectURL(blob),
          id: Date.now() + Math.random()
        };
        setImages(prevImages => [...prevImages, newImage]);
      }, 'image/jpeg');
      setShowCamera(false);
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    } else {
      setCameraError("Failed to capture image. Please try again.");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        console.log("Video stream is ready");
      };
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

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
              value={location.address}
              onChange={(e) => setLocation({ ...location, address: e.target.value })}
              placeholder="Type here or click to get location"
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
      {showCamera && (
        <div className="camera-modal">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ background: 'black', width: '100%', maxWidth: '640px' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button onClick={captureImage}>Capture</button>
          <button onClick={() => {
            setShowCamera(false);
            if (videoRef.current && videoRef.current.srcObject) {
              videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
          }}>Close</button>
          {cameraError && <p className="error-message">{cameraError}</p>}
          <div className="debug-info">
            <p>Video Ready: {videoRef.current && videoRef.current.readyState === 4 ? 'Yes' : 'No'}</p>
            <p>Video Size: {videoRef.current ? `${videoRef.current.videoWidth}x${videoRef.current.videoHeight}` : 'Unknown'}</p>
            <p>Stream Active: {videoRef.current && videoRef.current.srcObject ? 'Yes' : 'No'}</p>
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