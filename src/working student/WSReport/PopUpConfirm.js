import React, { useCallback, useState } from "react";
import Loadable from 'react-loadable';
import { Button } from "@mui/material";
import "./PopUpConfirm.css";

const PopUpSuccess = Loadable({
  loader: () => import('./PopUpSuccess'),
  loading: () => <div>Loading...</div>,
});

const PopUpConfirm = ({ onClose, onSubmit }) => {
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const onConfirm = useCallback(() => {
    onSubmit();
    setConfirmVisible(true);
  }, [onSubmit]);

  const closeSuccessPopup = useCallback(() => {
    setConfirmVisible(false);
    onClose(); // Close the confirmation popup as well
  }, [onClose]);

  return (
    <div className="pop-up-confirm">
      <div className="PUConfirm" />
      <div className="PUQuestion">
        Are you sure you want to confirm the report?
      </div>
      <img className="PUConfirmPic" alt="" src="/wreport-icon.png" />

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
        onClick={onConfirm}
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
        onClick={onClose}
      >
        CANCEL
      </Button>

      {isConfirmVisible && (
        <div className="overlay" onClick={closeSuccessPopup}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <PopUpSuccess onClose={closeSuccessPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpConfirm;
