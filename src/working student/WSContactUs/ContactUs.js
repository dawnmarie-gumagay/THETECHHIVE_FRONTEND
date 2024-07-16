import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();

  const onGETSTARTEDTextClick = useCallback(() => {
    navigate("/wslandingpage");
  }, [navigate]);

  return (
    <div className="ws-contact-us">
      <img className="background" alt="" src="/bg1.png" />

      <div className="main-box" />
      <img className="wildcat-cuteC" alt="" src="/wildcat-icon.png" />
      <div className="get-started" onClick={onGETSTARTEDTextClick}>
        GET STARTED
      </div>

      <b className="ContactUs-title">CONTACT US</b>
      <i className="cinfo">We’re here to help you</i>

      <div className="phone">PHONE</div>
      <div className="phone-num">+63 920 1988</div>
      <div className="phone-bg" />
      <img className="phone-icon" alt="" src="/phone.png" />

      <div className="email">EMAIL</div>
      <div className="email-mail">onetap@gmail.com</div>
      <div className="email-bg" />
      <img className="email-icon" alt="" src="/email.png" />

      <div className="location">LOCATION</div>
      <div className="location-name">Cebu Institute of Technology - University</div>
      <div className="location-bg" />
      <img className="location-icon" alt="" src="/location.png" />
      
      <b className="Lets-title">LET’S TALK</b>
      <i className="feel-free-to">Feel free to drop us a line below</i>

      <input className="ynInput" type="text" placeholder="Your name" />
      <input className="eInput" type="email" placeholder="Email" />
      <input className="pnInput" type="tel" placeholder="Phone number" />
      <textarea className="mInput" placeholder="Message"></textarea>

      <Button
        className="submit-button"
        variant="contained"
        href="/WSLandingPage"
        sx={{ borderRadius: "10px", 
              width: 90, 
              height: 30,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" } }}
      >
        SUBMIT
      </Button>
    </div>
  );
};

export default ContactUs;
