import React from "react";
import "./AdSignInForm.css"
export default function AdSignInForm() {
  return (
    <form>
      <label>
        Email <br/>
        <input type="text" />
      </label>
      <label>Password <br/>
        <input type="text" />
      </label>
      <button>SIGN IN</button>
    </form>
  );
}
