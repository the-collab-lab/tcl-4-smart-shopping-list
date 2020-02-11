import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ItemList from "./List/ItemList";
import getToken from "./lib/token";
import Form from "./Form/Form";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [token, setToken] = useState("");
  const [dbItems, setdbItems] = useState([]);

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

  const enterTokenHandler = e => {
    setToken(e.target.value);
  };

  return (
    <BrowserRouter>
      <Header isAddSelected={isAddSelected} onListSelect={selectListHandler} />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <button onClick={generateTokenHandler}>Get your list token!</button>
            <p>{token}</p>
            <p>Or enter an existing token to see your list below.</p>
            <ItemList
              token={token}
              onEnterToken={enterTokenHandler}
              dbItems={dbItems}
              setdbItems={setdbItems}
            />
          </Route>
          <Route exact path="/add">
            <Form token={token} onEnterToken={enterTokenHandler} />
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
