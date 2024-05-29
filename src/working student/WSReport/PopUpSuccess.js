import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Import Button component from Material-UI
import "./PopUpSuccess.css";

const PopUpSuccess = () => {
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate("/wsreport");
  }, [navigate]);

  return (
    <div className="PopUpSuccess">
      <div className="PopUpSuccess-Box" />
      <div className="SuccessReportName-Container">
        <p className="incident">Incident</p>
        <p className="incident">Successfully Reported</p>
      </div>
      <img
        className="WildcatSuccess-icon"
        alt=""
        src="/success-icon.png"
      />

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
  );
};

export default PopUpSuccess;
