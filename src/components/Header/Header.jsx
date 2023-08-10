import React from "react";
import BackButton from "../BackButton/BackButton";
import SafePointLogo from "../SafePointLogo/SafePointLogo";
import "./Header.css";

function Header() {
  // the header is comprised of the back button and the SafePoint logo
  return (
    <div className="headerContainer">
      <div className="backButtonContainer ">
        <BackButton />
      </div>

      <div className="logoContainer">
        {"     "} <SafePointLogo />
      </div>
    </div>
  );
}

export default Header;
