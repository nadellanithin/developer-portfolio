import React, { useState } from "react";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

function Toggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const styles = {
    toggleContainer: {
      width: "40px",
      height: "18px",
      borderRadius: "12px",
      alignSelf: "center",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2px",
      background: isDarkMode
        ? "linear-gradient(135deg, #d00000, #8b0000)"
        : "linear-gradient(135deg, #ffc300, #ffaa00)",
      boxShadow: isDarkMode
        ? "0 0 4px rgba(253, 0, 0)"
        : "0 0 4px rgba(255, 221, 0)",
      cursor: "pointer",
      position: "relative",
      transition: "background 0.5s ease, box-shadow 0.5s ease",
    },
    switchCircle: {
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: "white",
      boxShadow: "0 0 2px rgba(0, 0, 0, 0.8)",
      transform: isDarkMode ? "translateX(22px)" : "translateX(0)",
      transition: "transform 0.5s ease",
    },
  };

  return (
    <div style={styles.toggleContainer} onClick={toggleTheme}>
      <div style={styles.switchCircle}></div>
    </div>
  );
}

export default Toggle;
