import { useCallback, useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReportFinal.css";

const PopUpReportFinal = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const onWSReportClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onPopUpReportClick = useCallback(() => {
    navigate("/pop-upcritical-emergency");
  }, [navigate]);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected radio button
  };

  return (
    <div className="PopUpReportFinalPage">

      <b className="Severity-Name">Severity of the issue</b>

      <div className="Severity-Issue-Container">
        <span className="SeverityName">Low</span>
        <span className="Category">{` - General Report  `}</span>

        <span className="SeverityName">Medium</span>
        <span className="Category">{` - Urgent Situation  `}</span>

        <span className="SeverityName">High</span>
        <span className="Category"> - Critical Emergency</span>
      </div>

    {/* RadioGroup ensures only one radio button can be selected */}
    <RadioGroup value={selectedValue} onChange={handleRadioChange}>
      <div className="Severity-Radio-Button-Container">
        <div className="RadioButton-Low">
          <FormControlLabel
            className="radio-container6"
            label=""
            value="Low"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
        </div>
        <div className="RadioButton-Medium">
          <FormControlLabel
            className="radio-container6"
            label=""
             value="Medium"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
        </div>
        <div className="RadioButton-High">
          <FormControlLabel
            className="radio-container6"
            label=""
             value="High"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
        </div>
        <div className="Low">Low</div>
        <div className="Medium">Medium</div>
        <div className="High">High</div>
      </div>
      </RadioGroup>

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
      <img
        className="Choose-Location"
        alt=""
        src="/r-location.png"
      />

      <div className="Upload-Photo-Container">
        <b>Upload photo</b>
        <span className="for-evidence"> (For evidence, max 5MB)</span>
      </div>

      <div className="Camera-Container" >
        <div className="bg-container" />
        <div className="n-camera">Camera</div>
        <img className="bicamera-icon" alt="" src="/rcam.png" />
      </div>

      <div className="Upload-Container">
        <div className="bg-container" />
        <div className="n-upload">Upload file</div>
        <img
          className="symbolupload-icon"
          alt=""
          src="/rupload.png"
        />
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
      
      <div className="back-button-containerFR" onClick={onWSReportClick}>
          <div className="back-bgFR" />
          <img className="back-iconFR" alt="Back" src="/back.png" />
        </div>
    </div>
  );
};

export default PopUpReportFinal;
