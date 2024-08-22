import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./PopUpPermissionLoc.css";

const PopUpPermissionLoc = (onClose) => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  const handleCancel = useCallback(() => {
    console.log("Cancel button clicked"); // Add this line for debugging
    onClose();
  }, [onClose]);

  return (
    <div className="PermissionPage2">
      <div className="allow-location">
      Tap Allow to let the application use Location Services
      </div>

      <Button
        className="permission-cancel-button2"
        variant="contained"
        sx={{
          borderRadius: "10px",
          width: 115,
          height: 40,
          backgroundColor: "#8A252C",
          "&:hover": { backgroundColor: "#A91D3A" }
        }}
        onClick={handleCancel} // Changed to handleCancel
      >
        CANCEL
      </Button>

      <Button
        className="permission-allow-button2"
        variant="contained"
        sx={{
          borderRadius: "10px",
          width: 115,
          height: 40,
          backgroundColor: "#8A252C",
          "&:hover": { backgroundColor: "#A91D3A" }
        }}
      >
        ALLOW
      </Button>

      <img className="permission-location" alt="" src="/location2.png" />
    </div>
  );
};

export default PopUpPermissionLoc;
