import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./PopUpSuccess.css";

const PopUpSuccess = ({ onClose }) => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    // First, close the current popup
    if (onClose) {
      onClose();
    }

    // Then, navigate to the wsreport page
    navigate("/wsreport", { replace: true });
  }, [navigate, onClose]);

  return (
    <>
      <div className="overlay" />
      <div className="PopUpSuccess">
        <div className="PopUpSuccess-Box" />
        <div className="SuccessReportName-Container">
          <p className="incident">Report Successfully</p>
          <p className="incident">submitted!</p>
        </div>
        <img className="WildcatSuccess-icon" alt="Success Icon" src="/wreport-icon.png" />
        <Button
          className="pop-up-inner"
          variant="contained"
          sx={{
            borderRadius: "10px",
            width: 105,
            height: 35,
            backgroundColor: "#8A252C",
            "&:hover": { backgroundColor: "#A91D3A" }
          }}
          onClick={onBack}
        >
          GO BACK
        </Button>
      </div>
    </>
  );
};

export default PopUpSuccess;