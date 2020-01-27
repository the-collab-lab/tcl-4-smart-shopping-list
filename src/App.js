import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import List from "./List/List";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <List />
      </div>
    </BrowserRouter>
  );
}

export default App;
