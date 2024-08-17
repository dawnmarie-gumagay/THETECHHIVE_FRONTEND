import { useCallback } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpGR.css";

const PopUpGR = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    navigate("/pop-upcategory1");
  }, [navigate]);

  return (
    <div className="pop-up-general-report2">
      <div className="pop-up-general-report2-child" />
      <div className="group-container">
        <div className="ellipse-parent3">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <div className="equipment-related-accidents">Physical Accidents</div>
          <img className="group-child9" alt="" src="/rectangle-22.svg" />
        </div>
        <div className="ellipse-parent4">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <div className="vehicle-accidents">Vehicle Accidents</div>
        </div>
        <div className="ellipse-parent5">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <FormControlLabel
            className="group-child12"
            label=""
            control={<Radio color="success" />}
          />
          <FormControlLabel
            className="group-child13"
            label=""
            control={<Radio color="success" />}
          />
          <div className="facility-related-accidents1">
            Facility-Related Accidents
          </div>
          <div className="environmental-accidents1">
            Environmental Accidents
          </div>
          <div className="health-related-accidents1">
            Health-Related Accidents
          </div>
        </div>
        <div className="ellipse-parent6">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <div className="laboratory-accidents1">Laboratory Accidents</div>
        </div>
        <div className="ellipse-parent7">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <div className="equipment-related-accidents">
            Equipment-Related Accidents
          </div>
        </div>
        <div className="general-report1">General Report</div>
      </div>
      <div className="rectangle-parent7" onClick={onGroupContainerClick}>
        <div className="group-child16" />
        <div className="next1">NEXT</div>
      </div>
      <img
        className="pop-up-general-report2-item"
        alt=""
        src="/group-56.svg"
        onClick={onGroupIconClick}
      />
    </div>
  );
};

export default PopUpGR;
