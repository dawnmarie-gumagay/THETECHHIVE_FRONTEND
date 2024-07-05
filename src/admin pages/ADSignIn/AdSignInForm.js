import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdSignInForm.css";

export default function AdSignInForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    // If authentication is successful:
    navigate("/adhome");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email <br />
        <input type="text" />
      </label>
      <label>
        Password <br />
        <input type="text" />
      </label>
      <button type="submit">SIGN IN</button>
    </form>
  );
}
