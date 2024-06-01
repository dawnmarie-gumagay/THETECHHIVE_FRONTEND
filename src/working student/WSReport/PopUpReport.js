import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Loadable from 'react-loadable';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "./PopUpReport.css";

// Loadable component for PopUpConfirm
const PopUpConfirm = Loadable({
  loader: () => import('./PopUpConfirm'),
  loading: () => <div>Loading...</div>,
});

const PopUpReport = () => {
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleConfirm = useCallback(() => {
    setConfirmVisible(!isConfirmVisible);
  }, [isConfirmVisible]);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pop-up-report">
      <div className="PopUpReport-Box" />

      <div className="LevelIncident-Container">
        <div className="LevelIncident-Dropdown" />
        <div className="level-of-incident">Level of Incident</div>
        <div className="Incident-Input">
          <Select
            value={selectedLevel}
            onChange={handleLevelChange}
            displayEmpty
            className="SelectInput"
            style={{ width: "200px", color: "#8A252C" }}
          >
            <MenuItem value="" disabled>
              Choose here
            </MenuItem>
            <MenuItem value="Minor">Minor</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Major">Major</MenuItem>
          </Select>
        </div>
      </div>

      <div className="IncidentType-Container">
        <div className="IncidentType-Dropdown" />
        <div className="IncidentType-Name">Incident Type</div>
        <div className="Incident-Input">
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            displayEmpty
            className="SelectInput"
            style={{ width: "200px", color: "#8A252C" }}
          >
            <MenuItem value="" disabled>
              Choose here
            </MenuItem>
            <MenuItem value="Natural Incident">Natural Incident</MenuItem>
            <MenuItem value="Health-Related Incidents">Health-Related Incidents</MenuItem>
            <MenuItem value="Environmental Incidents">Environmental Incidents</MenuItem>
          </Select>
        </div>
      </div>

      <div className="UploadPhoto-Container">
        <div className="Upload-Button">
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }} 
            id="file-input" 
            onChange={handleImageUpload} 
          />
          <label htmlFor="file-input" className="upload-label">
            <img className="upload-icon" alt="Upload Icon" src="/upload-icon.png" />
          </label>
        </div>
        <div className="UP-Name1">Upload photo (For evidence)</div>
        {uploadedImage && <img className="uploaded-image" src={uploadedImage} alt="Uploaded" />}
      </div>

      <div className="ReportContainer">
        <Button
          className="ReportButton"
          variant="contained"
          sx={{
            borderRadius: "10px",
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
