import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";


const ADLogout = ({ className = "" }) => {
  const onGroupButtonClick = useCallback(() => {
    // Please sync "AD-Sign In" to the project
  }, []);

  return (
    <div className={`frame-parent ${className}`}>
      <div className="d81143-7f60-4974-9949-4dc6fba5-wrapper">
        <img
          className="d81143-7f60-4974-9949-4dc6fba5-icon"
          loading="lazy"
          alt=""
          src="/-71d811437f60497499494dc6fba54a28removebgpreview-1@2x.png"
        />
      </div>
      <div className="wildcat-on-the-prowl-wrapper">
        <h3 className="wildcat-on-the">Wildcat on the prowl!</h3>
      </div>
      <button className="rectangle-group" onClick={onGroupButtonClick}>
        <div className="frame-item" />
        <b className="return-home">RETURN HOME</b>
      </button>
    </div>
  );
};

ADLogout.propTypes = {
  className: PropTypes.string,
};

export default ADLogout;