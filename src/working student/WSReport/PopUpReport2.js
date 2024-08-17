import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpReport2.css";

const PopUpReport2 = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    navigate("/wsreport1");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/pop-upcritical-emergency");
  }, [navigate]);

  return (
    <div className="pop-up-category1">
      <div className="pop-up-category1-child" />
      <img
        className="pop-up-category1-item"
        loading="lazy"
        alt=""
        src="/group-56.svg"
        onClick={onGroupIconClick}
      />
      <section className="container">
        <div className="frame-parent">
          <div className="radio-buttons-wrapper">
            <div className="radio-buttons">
              <div className="status">
                <img
                  className="radio-button-1"
                  loading="lazy"
                  alt=""
                  src="/radio-button-1.svg"
                />
                <div className="indicator" />
              </div>
              <input className="radio-button-11" type="radio" />
              <input className="radio-button-11" type="radio" />
            </div>
          </div>
          <div className="report-type">
            <div className="definitions">
              <div className="critical-emergency">Critical Emergency</div>
              <div className="critical-emergency-critical">
                Critical Emergency Critical Emergencies are life-threatening
                situations or immediate dangers to safety on campus that require
                instant response from emergency services and security.
              </div>
            </div>
            <div className="definitions1">
              <div className="critical-emergency">Urgent Situation</div>
              <div className="critical-emergency-critical">
                Urgent Situation Urgent Situations are serious,
                non-life-threatening issues that need same-day attention from
                relevant campus departments.
              </div>
            </div>
            <div className="definitions2">
              <div className="general-report">General Report</div>
              <div className="critical-emergency-critical">
                General Report General Reports cover all non-urgent campus
                matters, from maintenance requests to event scheduling, that
                will be addressed during regular business hours.
              </div>
            </div>
            <div className="button-container">
              <div className="rectangle-parent" onClick={onGroupContainerClick}>
                <div className="frame-child" />
                <div className="proceed">PROCEED</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopUpReport2;
