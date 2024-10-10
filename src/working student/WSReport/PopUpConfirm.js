import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Loadable from 'react-loadable';
import "./PopUpConfirm.css";

// Loadable to lazy-load PopUpSuccess
const PopUpSuccess = Loadable({
  loader: () => import('./PopUpSuccess'),
  loading: () => <div>Loading...</div>,
});

const PopUpConfirm = ({ onClose, onSubmit }) => {
  const [isSuccessVisible, setSuccessVisible] = useState(false); // Track success popup visibility

  // Handle the Confirm button click
  const handleConfirm = useCallback(() => {
    if (onSubmit) {
      onSubmit(); 
    }
    setSuccessVisible(true); 
  }, [onSubmit]);

  // Close the success popup and the main pop-up
  const closeSuccessPopup = useCallback(() => {
    setSuccessVisible(false); 
    onClose(); 
  }, [onClose]);

  return (
    <>
      {!isSuccessVisible && (
        <>
          <div className="overlay" /> {/* Overlay */}
          <div className="pop-up-confirm">
            <div className="PUConfirm" />
            <div className="PUQuestion">
              Are you sure you want to confirm the report?
            </div>
            <img className="PUConfirmPic" alt="Confirmation Icon" src="/wreport-icon.png" />
            <Button
              className="PUCReportButton"
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: 115,
                height: 40,
                backgroundColor: "#8A252C",
                "&:hover": { backgroundColor: "#A91D3A" }
              }}
              onClick={handleConfirm} // Call handleConfirm on click
            >
              CONFIRM
            </Button>
            <Button
              className="PUCCancelButton"
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: 115,
                height: 40,
                backgroundColor: "#8A252C",
                "&:hover": { backgroundColor: "#A91D3A" }
              }}
              onClick={onClose} // Handle cancel click
            >
              CANCEL
            </Button>
          </div>
        </>
      )}

      {isSuccessVisible && (
        <PopUpSuccess onClose={closeSuccessPopup} /> // Show the success popup without overlay
      )}
    </>
  );
};

export default PopUpConfirm;