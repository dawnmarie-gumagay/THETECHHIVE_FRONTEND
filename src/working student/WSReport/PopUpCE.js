import { useCallback } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PopUpCE.css";

const PopUpCE = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    navigate("/pop-upcategory1");
  }, [navigate]);

  return (
    <div className="pop-up-critical-emergency2">
      <div className="pop-up-critical-emergency2-child" />
      <div className="group-parent">
        <div className="ellipse-parent">
          <FormControlLabel
            className="group-child1"
            label=""
            control={<Radio color="success" />}
          />
          <div className="physical-accidents">Physical Accidents</div>
          <img className="rectangle-icon" alt="" src="/rectangle-22.svg" />
        </div>
        <div className="ellipse-group">
          <FormControlLabel
            className="group-child1"
            label=""
            control={<Radio color="success" />}
          />
          <div className="facility-related-accidents">
            Facility-Related Accidents
          </div>
        </div>
        <div className="ellipse-container">
          <FormControlLabel
            className="group-child1"
            label=""
            control={<Radio color="success" />}
          />
          <FormControlLabel
            className="group-child4"
            label=""
            control={<Radio color="success" />}
          />
          <div className="fire-related-accidents">Fire-Related Accidents</div>
          <div className="health-related-accidents">
            Health-Related Accidents
          </div>
        </div>
        <div className="ellipse-parent1">
          <FormControlLabel
            className="group-child1"
            label=""
            control={<Radio color="success" />}
          />
          <div className="laboratory-accidents">Laboratory Accidents</div>
        </div>
        <div className="ellipse-parent2">
          <FormControlLabel
            className="group-child1"
            label=""
            control={<Radio color="success" />}
          />
          <div className="physical-accidents">Environmental Accidents</div>
        </div>
        <div className="critical-emergency1">Critical Emergency</div>
      </div>
      <div className="rectangle-parent6" onClick={onGroupContainerClick}>
        <div className="group-child7" />
        <div className="next">NEXT</div>
      </div>
      <img
        className="pop-up-critical-emergency2-item"
        alt=""
        src="/group-56.svg"
        onClick={onGroupIconClick}
      />
    </div>
  );
};

export default PopUpCE;
