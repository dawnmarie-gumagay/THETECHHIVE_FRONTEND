import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./AdminProfile.css";

const AdminProfile = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleUpdateClick = () => {
    
    console.log('Update button clicked');
  };

  const onGroupButtonClick = useCallback(() => {
    // Please sync "Succesfully Reg" to the project
  }, []);

  return (
    <div className="admin-profile">
      <div className="navbar" />
      <img className="navbar-icon" alt="" src="/TITLE.png" />
      <Link to="/homepage" className="nav-link">
        <div className="home">Home</div>
      </Link>
      <Link to="/reports" className="nav-link">
        <div className="reports">Reports</div>
      </Link>
      <Link to="/adminprofile" className="nav-link">
        <b className="profile">Profile</b>
      </Link>

      <div className="admin-profile-container" />
      <div className="institutional-email-container">
        <p className="institutional-email-name">Institutional email</p>
      </div>
      <div className="old-password">Old Password</div>
      <div className="new-password">New Password</div>
      <TextField
        className="e-input1"
        color="warning"
        variant="outlined"
        type="email"
        sx={{ "& .MuiInputBase-root": { height: "47px" }, width: "470px" }}
      />
      <TextField
        className="e-input2"
        color="warning"
        variant="outlined"
        type={showPassword1 ? 'text' : 'password'}
        sx={{ "& .MuiInputBase-root": { height: "47px" }, width: "470px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword1}
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className="e-input3"
        color="warning"
        variant="outlined"
        type={showPassword2 ? 'text' : 'password'}
        sx={{ "& .MuiInputBase-root": { height: "47px" }, width: "470px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="update-container" onClick={handleUpdateClick}>
        <div className="update-box" />
        <div className="update">Update</div>
      </div>

      <img className="dp-bg" alt="" src="/bg2.png" />
      <img className="admin-dp" alt="" src="/ex-dp.png" />

      <div className="admin-name">Richard Molina</div>
      <div className="role-name">Clinic Admin</div>
      <div className="admin-edu">richard.molina@cit.edu</div>

      <div className="logout-container">
        <Button
          className="logout-button"
          color="error"
          variant="contained"
          href="/logout"
          sx={{ borderRadius: "10px", 
                width: 120, 
                height: 40,  
                backgroundColor: "#8A252C",
                "&:hover": { backgroundColor: "#A91D3A" }
              }}
          onClick={onGroupButtonClick}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;
