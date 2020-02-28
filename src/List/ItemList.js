import React, { useEffect, Fragment } from "react";
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
          const data = querySnapshot.docs.map(doc => {
            return doc.data();
          });
          setdbItems(data);
        });
    }
  }, [token, setdbItems, dbItems, props]);

  //This will update an item to include a purchase date
  const handleChange = e => {
    let datePurchased = new Date();
    let db = firebase.fb.firestore();
    db.collection(token)
      .doc(e.target.value)
      .update({ datePurchased });
    console.log(dbItems);
  };

  const hours24 = 86400; //24 hours in seconds
  //A checked box will remain true for 24 hours
  const is24Hours = item => {
    let newDay = new Date();
    if (item.datePurchased) {
      return newDay.getTime() / 1000 - item.datePurchased.seconds < hours24;
    } else {
      return false;
    }
  };

  const handleChange = e => {
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
  
          {dbItems.
           filter(item => 
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
                    onChange={e => handleChange(e)}
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
