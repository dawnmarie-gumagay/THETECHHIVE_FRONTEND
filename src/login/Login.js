import { Button, TextField } from "@mui/material";
import "./Login.css";

const Login = () => {
  return (
    <div className="a-login">
      <img className="bg-1-icon" alt="" src="/bg1.png" />
      <img className="bg-2-icon" alt="" src="/bg2.png" />
      <img className="title-icon" alt="" src="/TITLE.png" />

      <div className="loginbox" />
      <div className="loginT">Log in</div>
      <div className="emailinput">
        <TextField
          color="primary"
          variant="outlined"
          label="Institutional Email"
          sx={{ width: "100%" }}
        />
      </div>
      <div className="institutional-email">Institutional Email</div>

      <div className="passinput">
        <TextField
          color="primary"
          type="password"
          label="Password"
          sx={{ width: "100%" }}
        />
      </div>
      <div className="passN">Password</div>

      <Button
        className="login-button"
        color="error"
        variant="contained"
        href="/homepage"
        sx={{ borderRadius: "10px", 
              width: 145, 
              height: 50,
              backgroundColor: "#8A252C",
              "&:hover": { backgroundColor: "#A91D3A" }
             }}
      >
        LOGIN
      </Button>
  
    </div>
  );
};

export default Login;
