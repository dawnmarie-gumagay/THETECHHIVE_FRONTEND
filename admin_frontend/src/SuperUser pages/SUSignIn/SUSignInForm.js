import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SUSignInForm.css";

export default function SUSignInForm() {
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const superidNumber = event.target.superidNumber.value;
        const superpassword = event.target.superpassword.value;

        try {
            const response = await fetch('http://localhost:8000/superuse/susignin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ superidNumber, superpassword }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('superuserToken', data.token);
                localStorage.setItem('loggedInSuperUser', JSON.stringify({
                    superuserID: data.superuserID,
                    superusername: data.superusername,
                    fullName: data.fullName,
                    email: data.email,
                    superuseridNumber: data.superuseridNumber,
                    profilePicture: data.profilePicture,
                }));
                navigate("/SUhome");
            } else {
                const message = await response.text();
                alert(`Login failed: ${message}`);
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          }
        };
        const handleForgotPasswordClick = () => {
            setShowForgotPassword(true);
          };
        
          const handleCloseForgotPassword = () => {
            setShowForgotPassword(false);
          };
        
          const handleSendCodeClick = () => {
            setShowForgotPassword(false);
            setShowVerificationPopup(true);
          };
        
          const handleCloseVerificationPopup = () => {
            setShowVerificationPopup(false);
          };
        
          const handleVerifyClick = () => {
            setShowVerificationPopup(false);
            setShowResetPasswordPopup(true);
          };
        
          const handleCloseResetPasswordPopup = () => {
            setShowResetPasswordPopup(false);
          };
        
          return (
            <>
              <form onSubmit={handleSubmit} className="SUsignin-form">
                <label>
                  ID Number <br />
                  <input type="text" name="superuseridNumber" required />
                </label>
                <br />
                <label>
                  Password <br />
                  <input type="password" name="superuserpassword" required />
                </label>
                <br />
                <button type="submit">SIGN IN</button>
                <br />
                <button type="button" onClick={handleForgotPasswordClick}>
                  Forgot Password?
                </button>
              </form>
        
              {showForgotPassword && (
                <div className="forgot-password-popup">
                  <div className="popup-content">
                    <button className="close-button" onClick={handleCloseForgotPassword}>
                      &times;
                    </button>
                    <h2>Forgot Password</h2>
                    <label>
                      Enter email address
                      <input type="email" name="email" required />
                    </label>
                    <br />
                    <button onClick={handleSendCodeClick}>Send Code</button>
                  </div>
                </div>
              )}
        
              {showVerificationPopup && (
                <div className="verification-popup">
                  <div className="popup-content">
                    <button className="close-button" onClick={handleCloseVerificationPopup}>
                      &times;
                    </button>
                    <h2>Enter Verification Code</h2>
                    <label>
                      Verification Code
                      <input type="text" name="verificationCode" required />
                    </label>
                    <br />
                    <button className="small-button">Resend Code</button>
                    <br />
                    <button onClick={handleVerifyClick}>Verify</button>
                  </div>
                </div>
              )}
        
              {showResetPasswordPopup && (
                <div className="reset-password-popup">
                  <div className="popup-content">
                    <button className="close-button" onClick={handleCloseResetPasswordPopup}>
                      &times;
                    </button>
                    <h2>Enter New Password</h2>
                    <label>
                      New Password
                      <input type="password" name="newPassword" required />
                    </label>
                    <br />
                    <h2>Confirm Password</h2>
                    <label>
                      Confirm Password
                      <input type="password" name="confirmPassword" required />
                    </label>
                    <br />
                    <button onClick={handleCloseResetPasswordPopup}>Reset Password</button>
                  </div>
                </div>
              )}
            </>
          );
        }
        