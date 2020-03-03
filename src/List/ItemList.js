import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";
import classes from "./List.module.css";
import calculateEstimate from "../estimates";

const Items = props => {
  const { setdbItems, token, dbItems, onEnterToken } = props;
  const [filterInput, setFilterInput] = useState("");
  const HOURS24 = 86400; //24 hours in seconds

  useEffect(() => {
    if (token) {
      let db = firebase.fb.firestore();
      db.collection(token)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return doc.data();
          });
          setdbItems(data);
        });
    }
  }, [token, setdbItems, dbItems, props]);

  // Checks if a purchase date already exists - if not, creates a purchased date and increments # of purchases - if so, also sets the most recent purchase estimate, the most recent purchase interval and the calculated date of the next purchase
  const handleChange = (e, item) => {
    if (item.datePurchased) {
      let lastEstimate;
      item.nextPurchaseDate
        ? (lastEstimate = item.nextPurchaseDate)
        : (lastEstimate = item.frequency);
      let lastDatePurchased = item.datePurchased;
      let datePurchased = new Date();
      let datePurchasedInSeconds = Math.floor(datePurchased.getTime() / 1000);
      let latestInterval = Math.floor(
        (datePurchasedInSeconds - lastDatePurchased.seconds) / HOURS24
      );
      let db = firebase.fb.firestore();
      let nextPurchaseDate = calculateEstimate(
        item.lastEstimate,
        latestInterval,
        item.numOfPurchases
      );
      db.collection(token)
        .doc(e.target.value)
        .update({
          datePurchased,
          numOfPurchases: item.numOfPurchases + 1,
          latestInterval,
          lastEstimate,
          nextPurchaseDate
        });
    } else {
      let datePurchased = new Date();
      let db = firebase.fb.firestore();
      db.collection(token)
        .doc(e.target.value)
        .update({ datePurchased, numOfPurchases: item.numOfPurchases + 1 });
    }
  };

  //A checked box will remain true for 24 hours
  const is24Hours = item => {
    let newDay = new Date();
    if (item.datePurchased) {
      return newDay.getTime() / 1000 - item.datePurchased.seconds < HOURS24;
    } else {
      return false;
    }
  };

  const handleFilterChange = e => {
    setFilterInput(e.target.value);
  };

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
        onChange={handleFilterChange}
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
          {dbItems
            .filter(item =>
              item.name.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((item, index) => {
              return (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      name="isPurchased"
                      checked={is24Hours(item)}
                      onChange={e => handleChange(e, item)}
                      value={item.name}
                    />
                    {item.name}
                  </label>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Items;
