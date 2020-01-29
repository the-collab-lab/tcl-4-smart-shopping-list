import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";
import PropTypes from "prop-types";

const Footer = ({
  isListSelected,
  setIsListSelected,
  isAddSelected,
  setIsAddSelected
}) => {
  return (
    <footer>
      <NavLink to="/" exact>
        <button
          onClick={() => setIsListSelected(!isListSelected)}
          className={isListSelected ? classes.active : classes.nonactive}
        >
          Item List
        </button>
      </NavLink>
      <NavLink to="/add" exact>
        <button
          onClick={() => setIsAddSelected(!isAddSelected)}
          className={isAddSelected ? classes.active : classes.nonactive}
        >
          Add Items
        </button>
      </NavLink>
    </footer>
  );
};

Footer.propTypes = {
  isListSelected: PropTypes.bool.isRequired,
  setIsListSelected: PropTypes.func.isRequired,
  isAddSelected: PropTypes.bool.isRequired,
  setIsAddSelected: PropTypes.func.isRequired
};

export default Footer;
