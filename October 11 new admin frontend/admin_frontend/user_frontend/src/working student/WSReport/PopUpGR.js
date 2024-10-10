import { useCallback, useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpGR.css";

const PopUpGR = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const onWSReportClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onPopUpReportClick = useCallback(() => {
    navigate("/popupfinal");
  }, [navigate]);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected radio button
  };

  return (
    <div className="PopUpGRPage">
      <div className="GR-Container">
      <div className="General-Report-Name">General Report</div>

      {/* RadioGroup ensures only one radio button can be selected */}
      <RadioGroup value={selectedValue} onChange={handleRadioChange}>
        <div className="PA-Container3">
          <FormControlLabel
            className="radio-container3"
            label=""
            value="PhysicalAccidents"
            control={<Radio color="success" sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Physical-Accidents-GR">Physical Accidents</div>
      </div>

        <div className="LA-Container3">
          <FormControlLabel
            className="radio-container3"
            label=""
            value="LaboratoryAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Laboratory-Accidents-GR">Laboratory Accidents</div>
      </div>

        <div className="VA-Container2">
          <FormControlLabel
            className="radio-container3"
            label=""
            value="VehicleAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Vehicle-Accidents-GR">Vehicle Accidents</div>
      </div>

        <div className="ER-Container2">
          <FormControlLabel
            className="radio-container3"
            label=""
            value="EquipmentRelated"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Equipment-Related-Accidents-GR">Equipment-Related Accidents</div>
      </div>

        <div className="FR-Container3">
          <FormControlLabel
            className="radio-container3"
            label=""
            value="FacilityRelated"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Facility-Related-Accidents-GR">Facility-Related Accident</div>
          
          <FormControlLabel
            className="radio-container4"
            label=""
            value="EnvironmentalAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Environmental-Accidents-GR">Environmental Accidents</div>

          <FormControlLabel
            className="radio-container5"
            label=""
            value="HealthAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
      <div className="Health-Related-Accidents-GR">Health-Related Accidents</div>
      </div>
      </RadioGroup>
      
      <Button
          className="GR-next-button"
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

      <div className="back-button-containerGR" onClick={onWSReportClick}>
          <div className="back-bgGR" />
          <img className="back-iconGR" alt="Back" src="/back.png" />
        </div>
      </div>
    </div>
  );
};

export default PopUpGR;
