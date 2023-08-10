import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import "./Nav.css";
import SafePointLogo from "../SafePointLogo/SafePointLogo";
import "../SafePointLogo/SafePointLogo.css";
import Header from "../Header/Header";

function Nav() {
  // This component is not currently being used but is used in other locations for styling and placement purposes
  // also leaving this available if it is needed in the future

  //This boolean will determine if the links are visible or not
  const [isOpen, setIsOpen] = useState(false);
  //This toggle will change the boolean to show the links
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //These consts contain the links for each table data
  const loginLinks = [
    { id: 1, title: "Welcome", url: "/Welcome" },
    { id: 2, title: "Purpose", url: "/Purpose" },
    { id: 3, title: "Justification", url: "/Justification" },
    { id: 4, title: "Selection", url: "/Selection" },
    { id: 5, title: "Login", url: "/Login" },
    { id: 6, title: "Register", url: "/Register" },
  ];

  const attendeeLinks = [
    { id: 1, title: "SOS", url: "/SOS" },
    { id: 1, title: "Injury", url: "/Injury" },
    { id: 1, title: "Location", url: "/Location" },
    { id: 1, title: "Confirmation", url: "/Confirmation" },
    { id: 1, title: "FirstAid", url: "/FirstAid" },
    { id: 1, title: "Survey", url: "/Survey" },
  ];

  const adminLinks = [
    { id: 1, title: "EventList", url: "/EventList" },
    { id: 2, title: "CreateEvent", url: "/CreateEvent" },
    { id: 3, title: "Alerts", url: "/Alerts" },
    { id: 4, title: "Survey Results", url: "/SurveyResults" },
  ];
  //this const contains the categories so the lists can be separated out in the mapping below
  const menuItems = [loginLinks, attendeeLinks, adminLinks];

  return (
    <div className>
      {/* <Header/> */}
      <div className="dropdown">
        {/* Click on Nav text to show links */}
        <div onClick={toggleDropdown} className="dropdown-toggle">
          Nav
        </div>
        {/* Conditionally render only when isOpen is true */}
        {isOpen && (
          <table>
            <tbody>
              <tr>
                {/* Map the 3 categories */}
                {menuItems.map((items, i) => (
                  <td key={i + 100}>
                    <ul className="dropdown-menu">
                      {/* Map the items in each of those categories */}
                      {items.map((item, i) => (
                        <li key={i + 200}>
                          <Link to={item.url}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Nav;
