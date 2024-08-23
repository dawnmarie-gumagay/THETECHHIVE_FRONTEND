import { useCallback, useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpReport2.css";

const PopUpReport2 = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const onWSReportClick = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  const onPopUpReportClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected radio button
  };

  return (
    <div className="PopUpCategoryPage">
      
      {/* RadioGroup ensures only one radio button can be selected */}
      <RadioGroup value={selectedValue} onChange={handleRadioChange}>
      <div className="Category-Container">
      <div className="Critical-Emergency-Container">
          <FormControlLabel
            className="radio-container7"
            label=""
            value="CriticalEmergency"
            control={<Radio sx={{
              color: "#000000", // Default unchecked color
              "&.Mui-checked": {
                color: "#8A252C", // Checked color
              },
            }}
          />
        }
      />
          <div className="CE-Category">Critical Emergency</div>

          <div className="CE-Category-Info">
            Accidents that require immediate intervention to prevent
            life-threatening situations or severe harm, prompting urgent action
            and the mobilization of emergency services to protect lives and
            prevent further damage.
          </div>
        </div>

        <div className="Laboratory-Accidents-Container">
          <FormControlLabel
            className="radio-container7"
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
          <div className="LA-Category">Urgent Situation</div>
          <div className="LA-Category-Info">
            Accidents that require prompt attention but do not pose an immediate
            threat to life, ensuring timely response and care to prevent the
            situation from escalating into something more serious.
          </div>
        </div>

        <div className="Facility-Related-Container">
          <FormControlLabel
            className="radio-container7"
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
          <div className="FR-Category">
            General Report
          </div>
          <div className="FR-Category-Info">
            Accidents that are minor and do not require immediate action but
            should be documented for safety records, helping to monitor trends,
            improve safety measures, and prevent future incidents.
          </div>
      </div>
      </div>
    </RadioGroup>

      <Button
          className="PopUpCategory-next-button"
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

        <div className="back-button-containerCategory" onClick={onWSReportClick}>
          <div className="back-bgFR" />
          <img className="back-iconFR" alt="Back" src="/back.png" />
        </div>
      </div>
  );
};

export default PopUpReport2;