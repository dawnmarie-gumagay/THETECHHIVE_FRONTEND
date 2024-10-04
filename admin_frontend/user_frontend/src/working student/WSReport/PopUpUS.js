import { useCallback, useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpUS.css";

const PopUpUS = () => {
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
    <div className="PopUpUSPage">
      <div className="US-Container">
      <div className="Urgent-Situation-Name">Urgent Situation</div>

        {/* RadioGroup ensures only one radio button can be selected */}
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
        <div className="PA-Container2">
          <FormControlLabel
            className="radio-container2"
            label=""
            value="PhysicalAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
          <div className="Physical-Accidents-US">Physical Accidents</div>
        </div>

        <div className="LA-Container2">
          <FormControlLabel
            className="radio-container2"
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
          <div className="Laboratory-Accidents-US">Laboratory Accidents</div>
        </div>

        <div className="VA-Container">
          <FormControlLabel
            className="radio-container2"
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
          <div className="Vehicle-Accidents-US">Vehicle Accidents</div>
        </div>

        <div className="ER-Container">
          <FormControlLabel
            className="radio-container2"
            label=""
            value="EquipmentRelatedAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
          <div className="Equipment-Related-Accidents-US">Equipment-Related Accidents</div>
        </div>

        <div className="FR-Container2">
          <FormControlLabel
            className="radio-container2"
            label=""
            value="FacilityRelatedAccidents"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
          <div className="Facility-Related-Accidents-US">Facility-Related Accidents</div>
      </div>
      </RadioGroup>

      <Button
          className="US-next-button"
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

      <div className="back-button-containerUS" onClick={onWSReportClick}>
          <div className="back-bgUS" />
          <img className="back-iconUS" alt="Back" src="/back.png" />
        </div>
      </div>
    </div>
  );
};

export default PopUpUS;
