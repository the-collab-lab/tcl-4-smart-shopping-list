import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import List from "./List/List";
import AddItem from "./AddItem/AddItem";
import Footer from "./Footer/Footer";

function App() {
  const [isListSelected, setIsListSelected] = useState(true);
  const [isAddSelected, setIsAddSelected] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <List />} />
          <Route path="/add" exact render={() => <AddItem />} />
        </Switch>
      </div>
      <Footer
        isListSelected={isListSelected}
        setIsListSelected={setIsListSelected}
        isAddSelected={isAddSelected}
        setIsAddSelected={setIsAddSelected}
      />
    </BrowserRouter>
  );
}

export default App;
