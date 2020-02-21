import React, { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";

const Items = props => {
  const {
    setdbItems,
    token,
    dbItems,
    onEnterToken,
    isPurchased,
    setIsPurchased
  } = props;

  const day = 86400; //24 hours in seconds

  useEffect(() => {
    if (token) {
      let newDay = new Date();
      let db = firebase.fb.firestore();
      db.collection(token)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return doc.data();
          });

          //here we are trying to update the purchased item, kind of working too well
          // for (let i = 0; i < data.length; i++) {
          //   if (data[i].isPurchased) {
          //     if ((newDay.getTime() - data[i].datePurchased.seconds) > 10 ) {
          //       db.collection(token)
          //         .doc(data[i].name)
          //         .update({ isPurchased: false, datePurchased: newDay });
          //     }
          //   }
          // }
          setdbItems(data);
        });
    }
  }, [token, setdbItems, dbItems, props]);

  const handleChange = e => {
    let datePurchased = new Date();
    let db = firebase.fb.firestore();
    db.collection(token)
      .doc(e.target.value)
      .update({ isPurchased: true, datePurchased: datePurchased });
    console.log(dbItems);
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
                    checked={item.isPurchased}
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
