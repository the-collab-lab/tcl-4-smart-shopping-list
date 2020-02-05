import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import List from "./List/List";
import AddItem from "./AddItem/AddItem";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Items from "./Item.js";
import getToken from "./lib/token";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [token, setToken] = useState("");

  const selectListHandler = () => {
    setIsListSelected(true);
    setIsAddSelected(false);
  };

  const selectAddHandler = () => {
    setIsListSelected(false);
    setIsAddSelected(true);
  };

  const generateTokenHandler = () => {
    let newToken = getToken();
    setToken(newToken);
    localStorage.setItem(newToken, newToken);
  };

  return (
    <BrowserRouter>
      <Header isAddSelected={isAddSelected} onListSelect={selectListHandler} />
      <div className="App">
        <Items />
        <Switch>
          <Route exact path="/">
            <List token={token} onGenerateToken={generateTokenHandler} />
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
