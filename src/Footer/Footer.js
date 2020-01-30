import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";
import PropTypes from "prop-types";

const Footer = ({
  onListSelect,
  onAddSelect,
  isAddSelected,
  isListSelected
}) => {
  return (
    <footer className={classes.footer}>
      <NavLink to="/" exact>
        <button
          onClick={onListSelect}
          className={isListSelected ? classes.active : classes.nonactive}
          id={classes.footerButton}
        >
          Item List
        </button>
      </NavLink>
      <NavLink to="/add" exact>
        <button
          id={classes.footerButton}
          onClick={onAddSelect}
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
  onListSelect: PropTypes.func.isRequired,
  isAddSelected: PropTypes.bool.isRequired,
  onAddSelect: PropTypes.func.isRequired
};

export default Footer;
