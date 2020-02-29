import React, { useEffect, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";
import Modal from "../Modal/Modal";

//this will be used to pass a promise around
let resolve;

const Items = props => {
  const { setdbItems, token, dbItems, onEnterToken } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

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
  const handleMarkPurchased = e => {
    let datePurchased = new Date();
    let db = firebase.fb.firestore();
    db.collection(token)
      .doc(e.target.value)
      .update({ datePurchased });
  };

  const hours24 = 86400; //24 hours in seconds
  //A checked box will remain true for 24 hours
  const is24Hours = item => {
    let newDay = new Date();
    if (item.datePurchased) {
      return newDay.getTime() / 1000 - item.datePurchased.seconds < hours24;
    }
    return false;
  };

  //handling the confirmation for deleting an item
  const handleCancel = () => {
    setIsOpen(false);
    resolve(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolve(true);
  };

  const show = () => {
    setIsOpen(true);
    return new Promise(res => {
      resolve = res;
    });
  };

  // delete list item
  async function handleDelete(e) {
    setItemToDelete(e.target.value);
    e.persist();
    const result = await show();
    if (result) {
      let db = firebase.fb.firestore();
      db.collection(token)
        .doc(e.target.value)
        .delete();
    }
  }

  const deleteConfirmation = (
    <Modal>
      <p>Delete {itemToDelete}?</p>
      <button onClick={() => handleConfirm()}>OK</button>
      <button onClick={handleCancel}>Cancel</button>
    </Modal>
  );

  return (
    <div>
      {isOpen && deleteConfirmation}
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
                    onChange={e => handleMarkPurchased(e)}
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
