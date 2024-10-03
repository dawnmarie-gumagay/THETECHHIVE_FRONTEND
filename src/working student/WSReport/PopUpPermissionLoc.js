import { useCallback, useState } from "react";
import { Button } from "@mui/material";
import PopUpReportFinal from "./PopUpReportFinal"; // Import PopUpReportFinal component
import "./PopUpPermissionLoc.css";

const PopUpPermissionLoc = () => { 
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(true);

  const handleDeny = useCallback(() => {
    console.log("Deny button clicked");
    // Close the permission popup and show the final report popup
    setShowPermissionPopup(false);
    setShowFinalPopup(true);
  }, []);

  const handleAllow = useCallback(() => {
    console.log("Allow button clicked");
    setShowPermissionPopup(false);
    setShowFinalPopup(true);
  }, []);

  // Prevent background clicks by stopping event propagation
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="overlay"> {/* Add an overlay that prevents background interactions */}
      {showPermissionPopup && (
        <div className="PermissionPage2" onClick={stopPropagation}> {/* Stop clicks from passing to the overlay */}
          <div className="allow-location">
            Allow location access to report incidents accurately in your area
          </div>

          <Button
            className="permission-deny-button2"
            variant="contained"
            sx={{
              borderRadius: "10px",
              width: 115,
              height: 40,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" }
            }}
            onClick={handleDeny} // Update DENY button action
          >
            DENY
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
            onClick={handleAllow}
          >
            ALLOW
          </Button>

          <img className="permission-location" alt="Location" src="/location2.png" />
        </div>
      )}

      {showFinalPopup && <PopUpReportFinal />} {/* Show PopUpReportFinal */}
    </div>
  );
};

export default PopUpPermissionLoc;
