import { useCallback, useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpCE.css";

const PopUpCE = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(""); // State to control the selected value

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
    <div className="PopUpCEPage">
      <div className="CE-Container">
        <div className="CriticalEmergency-Name">Critical Emergency</div>

        {/* RadioGroup ensures only one radio button can be selected */}
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          <div className="PA-Container">
            <FormControlLabel
              className="radio-container"
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
            <div className="Physical-Accidents-CE">Physical Accidents</div>
          </div>

          <div className="LA-Container">
            <FormControlLabel
              className="radio-container"
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
            <div className="Laboratory-Accidents-CE">Laboratory Accidents</div>
          </div>

          <div className="FR-Container">
            <FormControlLabel
              className="radio-container"
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
            <div className="Facility-Related-CE">Facility-Related Accidents</div>
          </div>

          <div className="EA-Container">
            <FormControlLabel
              className="radio-container"
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
            <div className="Environmental-Accidents-CE">Environmental Accidents</div>
          </div>

          <div className="FR-HR-Container">
            <FormControlLabel
              className="radio-container"
              label=""
              value="FireRelated"
              control={<Radio sx={{
                color: "#000000", // Default unchecked color
                "&.Mui-checked": {
                  color: "#8A252C", // Checked color
                },
              }}
            />
          }
        />
            <FormControlLabel
              className="radio-container2"
              label=""
              value="HealthRelated"
              control={<Radio sx={{
                color: "#000000", // Default unchecked color
                "&.Mui-checked": {
                  color: "#8A252C", // Checked color
                },
              }}
            />
          }
        />
            <div className="Fire-Related-Accidents-CE">Fire-Related Accidents</div>
            <div className="Health-Related-Accidents-CE">Health-Related Accidents</div>
          </div>
        </RadioGroup>

        <Button
          className="CE-next-button"
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

        <div className="back-button-container2" onClick={onWSReportClick}>
          <div className="back-bgCE" />
          <img className="back-iconCE" alt="Back" src="/back.png" />
        </div>
      </div>
    </div>
  );
};

export default PopUpCE;
