"use client";

import { useState, useEffect } from "react";

const ThemeBtn = () => {
  const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  return (
    <button className="btn-container cursor-pointer" onClick={toggleTheme}>
      <label className="switch btn-color-mode-switch">
        <input
          type="checkbox"
          id="color_mode"
          name="color_mode"
          checked={theme === "dark-theme"}
          readOnly
        />
        <label
          className="btn-color-mode-switch-inner"
          data-off="Light"
          data-on="Dark"
          htmlFor="color_mode"
        ></label>
      </label>
    </button>
  );
};

export default ThemeBtn;
