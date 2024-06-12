import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import PropTypes from "prop-types";
import "./UpdatedPopUp.css";

const UpdatedPopUp = ({ className = "", onClose }) => {
  const navigate = useNavigate();

  const onOKTextClick = useCallback(() => {
    navigate("/wsprofile");
    onClose(); // Call onClose to hide the popup
  }, [navigate, onClose]);

  return (
    <div className="updated-popup">
      <div className="UpdatedPopUpBox" />
      <div className="your-password-has">Your password has been updated</div>
      <img className="SIcon" alt="" src="/success-icon.png" />
      <div className="updated-popup-item">
        <Button
          className="OKButton"
          variant="contained"
          sx={{
            borderRadius: "10px",
            width: 90,
            height: 40,
            backgroundColor: "#8A252C",
            "&:hover": { backgroundColor: "#A91D3A" }
          }}
          onClick={onOKTextClick}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

UpdatedPopUp.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default UpdatedPopUp;
