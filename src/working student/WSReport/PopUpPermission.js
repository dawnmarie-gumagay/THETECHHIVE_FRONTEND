import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpPermission.css";

const PopUpPermission = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upreport");
  }, [navigate]);

  return (
    <div className="pop-up-permission1">
      <div className="pop-up-permission-item" />
      <div className="please-allow-access1">
        Please allow access to your camera
      </div>
      <div className="rectangle-parent17">
        <div className="group-child39" />
        <div className="allow2">ALLOW</div>
      </div>
      <div className="rectangle-parent18" onClick={onGroupContainerClick}>
        <div className="group-child39" />
        <div className="allow2">CANCEL</div>
      </div>
      <img className="camera-icon2" alt="" src="/camera@2x.png" />
    </div>
  );
};

export default PopUpPermission;
