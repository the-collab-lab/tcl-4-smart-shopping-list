import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ItemList from "./List/ItemList";
import getToken from "./lib/token";
import Form from "./Form/Form";
import * as firebase from "./lib/firebase";
import { ArchivalNoticeModal } from "@the-collab-lab/shopping-list-utils";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [token, setToken] = useState("");
  const [showNewToken, setShowNewToken] = useState(false);
  const [showExistingToken, setShowExistingToken] = useState(false);
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
    setShowExistingToken(false);
    setShowNewToken(true);
  };

  const enterTokenHandler = e => {
    setToken(e.target.value);
  };

  const handleExistingToken = () => {
    setShowNewToken(false);
    setShowExistingToken(true);
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
      <div className="App">
        <Switch>
          <Route exact path="/">
            <ArchivalNoticeModal />
            <button onClick={generateTokenHandler}>Get New Token</button>
            <button onClick={handleExistingToken}>Existing Token?</button>

            {showNewToken && (
              <div>
                <p>{token}</p>
                <button onClick={e => handleSubmit((e, token))}>Submit</button>
              </div>
            )}

            {showExistingToken && (
              <div>
                <ItemList
                  token={token}
                  onEnterToken={enterTokenHandler}
                  dbItems={dbItems}
                  setdbItems={setdbItems}
                />
              </div>
            )}
          </Route>
          <Route exact path="/add">
            <Form
              token={token}
              onEnterToken={enterTokenHandler}
              dbItems={dbItems}
              setdbItems={setdbItems}
            />
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
