import React, { useEffect, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "../lib/firebase";

import calculateEstimate from "../estimates";
import Modal from "../Modal/Modal";

//this will be used to pass a promise around
let resolve;

const Items = props => {
  const { setdbItems, token, dbItems, onEnterToken } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
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

  const handleMarkPurchased = (e, item) => {
    let datePurchased = new Date();
    let db = firebase.fb.firestore();
    db.collection(token)
      .doc(e.target.value)
      .update({ datePurchased, numOfPurchases: item.numOfPurchases + 1 });
    if (item.datePurchased) {
      handleNextPurchaseEstimate(e, item);
    }
  };

  const handleNextPurchaseEstimate = (e, item) => {
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

  //comparison method for sorting by purchase date.
  const comparison = (itemA, itemB) => {
    return itemB.nextPurchaseDate - itemA.nextPurchaseDate;
  };

  const filterAndSort = dbItems
    .filter(item => {
      if (item.name !== undefined) {
        return item.name.toLowerCase().includes(filterInput.toLowerCase());
      }
    })
    .sort(comparison);

  function listItem(item, index) {
    return (
      <li key={index}>
        <label>
          <input
            type="checkbox"
            name="isPurchased"
            checked={is24Hours(item)}
            onChange={e => handleMarkPurchased(e, item)}
            value={item.name}
          />
          {item.name}
          <button onClick={e => handleDelete(e)} value={item.name}>
            Delete Item{" "}
          </button>
        </label>
      </li>
    );
  }

  const buySoonRender = filterAndSort.map((item, index) => {
    const buySoon = (item.nextPurchaseDate || item.frequency) < 7;
    return buySoon ? listItem(item, index) : null;
  });

  const buyKindaSoonRender = filterAndSort.map((item, index) => {
    const buyKindaSoon =
      (item.nextPurchaseDate || item.frequency) >= 7 &&
      (item.nextPurchaseDate || item.frequency) < 30;
    return buyKindaSoon ? listItem(item, index) : null;
  });

  const buyNotSoSoonRender = filterAndSort.map((item, index) => {
    const buyNotSoSoon = (item.nextPurchaseDate || item.frequency) >= 30;
    return buyNotSoSoon ? listItem(item, index) : null;
  });

  //if the item doesn't exist, should the list not appear?
  const inactiveRender = filterAndSort.map((item, index) => {
    let today = new Date();
    let todayInSec = today.getTime() / 1000;
    const inactive =
      item &&
      todayInSec >
        (item.nextPurchaseDate * HOURS24 + item.datePurchased.seconds) * 2;
    return inactive ? listItem(item, index) : null;
  });

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

  const handleFilterChange = e => {
    setFilterInput(e.target.value);
  };

  const clearValues = e => {
    setFilterInput("");
  };

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
        <div>
          <h1> Buy Soon </h1>
          {buySoonRender}

          <h1> Buy Kind Soon </h1>
          {buyKindaSoonRender}

          <h1> Buy Not So Soon</h1>
          {buyNotSoSoonRender}

          <h1> Inactive</h1>
          {inactiveRender}
        </div>
      )}
    </div>
  );
};

export default Items;
