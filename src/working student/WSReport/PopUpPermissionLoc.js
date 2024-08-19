import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpPermissionLoc.css";

const PopUpPermissionLoc = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  return (
    <div className="pop-up-permission-loc1">
      <div className="pop-up-permission-loc-item" />
      <div className="tap-allow-to-let-the1">{`Tap Allow to let the application use Location Services `}</div>
      <div className="rectangle-parent19" onClick={onGroupContainerClick}>
        <div className="group-child41" />
        <div className="cancel6">CANCEL</div>
      </div>
      <div className="rectangle-parent20" onClick={onGroupContainerClick}>
        <div className="group-child41" />
        <div className="cancel6">ALLOW</div>
      </div>
      <img className="zondiconslocation1" alt="" src="/zondiconslocation.svg" />
    </div>
  );
};

export default PopUpPermissionLoc;
