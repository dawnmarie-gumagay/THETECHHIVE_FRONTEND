import { useCallback } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./ConfirmLogout.css";

const ConfirmLogout = ({ onClose }) => {
  const navigate = useNavigate();

  const onLOGOUTTextClick = useCallback(() => {
    // Perform any logout logic here
    navigate("/wslogout");
  }, [navigate]);

  const onCANCELTextClick = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.warn('onClose prop is not a function or not provided');
      // You might want to add a fallback behavior here
    }
  }, [onClose]);

  return (
    <div className="logout-popup">
      <div className="logout-popup-content">
        <div className="Confirmation">Are you sure you want to log out?</div>

        <img
          className="ConfirmLogoutIcon"
          alt=""
          src="wildcat-crying.png"
        />

        <div className="LogoutPopUpContainer">
          <Button
            className="LogoutButton"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 110,
              height: 35,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" },
              fontSize: "15px",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={onLOGOUTTextClick}
          >
            LOG OUT
          </Button>
        </div>

        <div className="CancelButtonContainer">
          <Button
            className="CancelButton"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 110,
              height: 35,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" },
              fontSize: "15px",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={onCANCELTextClick}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;