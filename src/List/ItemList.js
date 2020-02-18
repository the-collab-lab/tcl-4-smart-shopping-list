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

  const handleChange = () => {
    setIsPurchased(prevState => !prevState);
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
                    checked={isPurchased}
                    onChange={handleChange}
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
