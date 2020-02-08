import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import List from "./List/List";
import AddItem from "./AddItem/AddItem";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Item from "./Item";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);

  const selectListHandler = () => {
    setIsListSelected(true);
    setIsAddSelected(false);
  };

  const selectAddHandler = () => {
    setIsListSelected(false);
    setIsAddSelected(true);
  };

  return (
    <BrowserRouter>
      <Header isAddSelected={isAddSelected} onListSelect={selectListHandler} />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route exact path="/add">
            <AddItem />
          </Route>
        </Switch>
      </div>
      <Footer
        onListSelect={selectListHandler}
        onAddSelect={selectAddHandler}
        isAddSelected={isAddSelected}
        isListSelected={isListSelected}
      />
    </BrowserRouter>
  );
}

export default App;
