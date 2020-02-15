import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ItemList from "./List/ItemList";
import getToken from "./lib/token";
import Form from "./Form/Form";
import * as firebase from "./lib/firebase";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [token, setToken] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showExisting, setShowExisting] = useState(false);

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
    setShowExisting(false);
    setShowNew(true);
  };

  const enterTokenHandler = e => {
    setToken(e.target.value);
  };

  const existingToken = () => {
    setShowNew(false);
    setShowExisting(true);
  };

  // creates new collection with a blank document
  const handleSubmit = token => {
    let db = firebase.fb.firestore();
    let data = {};
    db.collection(token)
      .add(data)
      .then(function() {
        alert("New List Created!");
      })
      .catch(function(error) {
        alert("Something went wrong!");
        console.error("Error writing document: ", error);
      });
  };

  return (
    <BrowserRouter>
      <Header isAddSelected={isAddSelected} onListSelect={selectListHandler} />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <button onClick={generateTokenHandler}>Get New Token</button>
            <button onClick={existingToken}>Existing Token?</button>

            {/* To be displayed when "Get New Token" is clicked */}
            {showNew && (
              <div>
                <p>{token}</p>
                <button onClick={e => handleSubmit((e, token))}>Submit</button>
              </div>
            )}

            {/* To be displayed when "Existing Token" is clicked */}
            {showExisting && (
              <div>
                <ItemList token={token} onEnterToken={enterTokenHandler} />
              </div>
            )}
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
