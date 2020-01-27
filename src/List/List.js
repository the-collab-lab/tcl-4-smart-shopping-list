import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import AddItem from "../AddItem/AddItem";

function List() {
  const listContent = (
    <div>
      List!!!
      <NavLink to="/add" exact>
        <button>Add Items</button>
      </NavLink>
    </div>
  );
  return (
    <Switch>
      <Route path="/" exact render={() => <div>{listContent}</div>} />
      <Route path="/add" exact render={() => <AddItem />} />
    </Switch>
  );
}

export default List;
