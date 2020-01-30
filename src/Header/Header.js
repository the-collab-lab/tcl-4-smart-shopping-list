import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = ({ onListSelect, isAddSelected }) => {
  const arrow = "<";
  let homeButton = isAddSelected && (
    <NavLink to="/" exact>
      <button onClick={onListSelect} className={classes.buttonStyle}>
        <h1>{arrow}</h1>
      </button>
    </NavLink>
  );

  return <div className={classes.header}>{homeButton}</div>;
};

export default Header;
