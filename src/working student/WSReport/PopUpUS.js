import { useCallback } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpUS.css";

const PopUpUS = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    navigate("/pop-upcategory1");
  }, [navigate]);

  return (
    <div className="pop-up-urgent-situation2">
      <div className="pop-up-urgent-situation2-child" />
      <div className="group-container">
        <div className="ellipse-parent3">
          <FormControlLabel
            className="group-child8"
            label=""
            control={<Radio color="success" />}
          />
          <div className="physical-accidents1">Physical Accidents</div>
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
          <div className="facility-related-accidents1">
            Facility-Related Accidents
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
        <div className="urgent-situation1">Urgent Situation</div>
      </div>
      <div className="rectangle-parent7" onClick={onGroupContainerClick}>
        <div className="group-child14" />
        <div className="next1">NEXT</div>
      </div>
      <img
        className="pop-up-urgent-situation2-item"
        alt=""
        src="/group-56.svg"
        onClick={onGroupIconClick}
      />
    </div>
  );
};

export default PopUpUS;
