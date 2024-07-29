import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdSignInForm.css";

export default function AdSignInForm() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('loggedInAdmin', JSON.stringify({
          adminId: data.adminId,
          adminname: data.adminname,
          fullName: data.fullName,
          email: data.email,
          idNumber: data.idNumber,
        }));
        navigate("/adhome");
      } else {
        const message = await response.text();
        alert(`Login failed: ${message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <label>
        Email <br />
        <input type="email" name="email" required />
      </label>
      <br />
      <label>
        Password <br />
        <input type="password" name="password" required />
      </label>
      <br />
      <button type="submit">SIGN IN</button>
    </form>
  );
}
