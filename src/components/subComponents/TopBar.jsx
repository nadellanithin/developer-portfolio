import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/subComponents.css";
import Toggle from "./Toggle";

function TopBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigateToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    setMenuOpen(false);
  };

  return (
    <div className="TopBar">
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <a className="Title" onClick={() => handleNavigateToSection("Home")}>
          <img src="favicon.ico" alt="Website logo" className="Logo" />
          <strong>Nithin Subhash Nadella</strong>
        </a>
        <Toggle />
      </div>

      <div className="HamburgerIcon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`NavLinkBlock ${menuOpen ? "Open" : "Closed"}`}>
        <a className="NavLink" onClick={() => handleNavigateToSection("About")}>
          About
        </a>
        <a
          className="NavLink"
          onClick={() => handleNavigateToSection("Skills")}
        >
          Skills
        </a>
        <a
          className="NavLink"
          onClick={() => handleNavigateToSection("Experience")}
        >
          Experience
        </a>
        <Link
          to="/explore"
          className="NavLink"
          onClick={() => setMenuOpen(false)}
        >
          Explore
        </Link>
        <a
          className="NavLink"
          onClick={() => handleNavigateToSection("Contact")}
        >
          Contact
        </a>
      </div>
    </div>
  );
}

export default TopBar;
