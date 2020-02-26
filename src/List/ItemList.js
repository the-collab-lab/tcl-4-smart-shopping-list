import React, { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";

const Items = props => {
  const { setdbItems, token, dbItems, onEnterToken } = props;

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

  // delete list item
  const handleDelete = e => {
    let db = firebase.fb.firestore();
    db.collection(token)
      .doc(e.target.value)
      .delete();
  };

  return (
    <div>
      <input
        type="text"
        name="token"
        placeholder="enter token"
        onChange={e => {
          onEnterToken(e);
        }}
        value={token}
      />
      {dbItems.length === 0 ? (
        <Fragment>
          <p>No List Found</p>
          <NavLink to="/add" exact>
            <button>Add 1st Item</button>
          </NavLink>
        </Fragment>
      ) : (
        <ul>
          {dbItems.map((item, index) => {
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
                  <button onClick={e => handleDelete(e)} value={item.name}>
                    X{" "}
                  </button>
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
