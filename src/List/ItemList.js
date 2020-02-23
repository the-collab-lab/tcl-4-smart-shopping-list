import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";
import classes from "./List.module.css";

const Items = props => {
  const { setdbItems, token, dbItems, onEnterToken } = props;
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    if (token) {
      let db = firebase.fb.firestore();
      db.collection(token)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          setdbItems(data);
        });
    }
  }, [token, setdbItems, props]);

  const handleChange = e => {
    setFilterInput(e.target.value);
  };

  useEffect(() => {
    // mapping through the dbItems to extract the item names
    const filteredArray = dbItems.map(item => {
      return item.name;
    });
    // filtered through the array of names to match with user input
    const filteredDbItems = filteredArray.filter(item => {
      console.log(filteredArray);
      return item.includes(filterInput);
    });
    //updating the dbItems state to the newly filtered array
    setdbItems(filteredDbItems);
  }, [filterInput]);

  const clearValues = e => {
    setFilterInput("");
  };

  return (
    <div className={classes.listInput}>
      <input
        type="text"
        name="token"
        placeholder="enter token"
        onChange={e => {
          onEnterToken(e);
        }}
        value={token}
      />

      <input
        type="text"
        name="filter"
        placeholder="search items"
        onChange={handleChange}
        value={filterInput}
      />
      <button onClick={clearValues}>X</button>

      {dbItems.length === 0 ? (
        <Fragment>
          <p>No List Found</p>
          <NavLink to="/add" exact>
            <button>Add 1st Item</button>
          </NavLink>
        </Fragment>
      ) : (
        <ul>
          {/* Currently renders items from the initial mount. The goal is to display the filtered list onChange */}
          {dbItems.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default Items;
