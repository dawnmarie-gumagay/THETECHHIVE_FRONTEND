import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpSuccess.css";

const PopUpSuccess = () => {
  const navigate = useNavigate();

  const onGOBACKTextClick = useCallback(() => {
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
      <div className="pop-up-inner" />
      <div className="go-back" onClick={onGOBACKTextClick}>
        GO BACK
      </div>
      
    </div>
  );
};

export default PopUpSuccess;
