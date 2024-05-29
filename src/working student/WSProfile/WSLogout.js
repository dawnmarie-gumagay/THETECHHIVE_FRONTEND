import { useCallback } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./WSLogout.css";

const WSLogout = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  return (
    <div className="logged-out">
      <img className="background" alt="" src="/bg1.png" />

      <div className="main-box" />
      <img className="main-bg" alt="" src="/main-bg.png" />
      <img className="main-title" alt="" src="/TITLE.png" />

      <img
        className="wildcatbye"
        alt=""
        src="/wildcat-bye.png"
      />

      <div className="OnProwl">Wildcat on the prowl!</div>

      <div className="ReturnHomeContainer">
      <Button
        className="ReturnHomeButton"
        variant="contained"
        sx={{
          borderRadius: "30px",
          width: 350,
          height: 40,
          backgroundColor: "#8A252C",
          "&:hover": { backgroundColor: "#A91D3A" },
          fontSize: "20px",
          fontWeight: "500"
        }}
        onClick={onGroupContainerClick}
      >
        RETURN HOME
      </Button>
    </div>
      
    </div>
  );
};

export default WSLogout;
