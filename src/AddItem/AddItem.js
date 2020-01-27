import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import List from "../List/List";

function AddItem() {
  return (
    <div>
      <NavLink to="/" exact>
        <button>Go Back to List</button>
      </NavLink>
      <h1>Add an item!</h1>
    </div>
  );
}

export default AddItem;
