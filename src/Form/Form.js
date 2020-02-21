import React, { useState } from "react";
import classes from "./Form.module.css";
import * as firebase from "../lib/firebase";

const Form = props => {
  const { setdbItems, dbItems, token, onEnterToken } = props;
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let db = firebase.fb.firestore();
    let newName = name
      .toUpperCase()
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");
    const existingItem = dbItems.find(element => {
      let newElement;
      //adding items to the list auto adds one empty item which causes everything to crash when checking for its name without this condition
      if (element.name !== undefined) {
        newElement = element.name
          .toUpperCase()
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ");
      }
      return newElement === newName;
    });

    if (!existingItem) {
      let data = {
        name,
        frequency,
        date
      };

      //setting the doc id to match the item name so it's easier to find a match
      db.collection(token)
        .doc(name)
        .set(data)
        .then(function() {
          alert("Item added!");
        })
        .catch(function(error) {
          alert("Something went wrong!");
          console.error("Error writing document: ", error);
        })
        .then(
          db
            .collection(token)
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
              setdbItems(data);
            })
        );
    } else {
      alert("Item already in list.");
    }
  };

  return (
    <form className={classes.form} onSubmit={e => handleSubmit(e)}>
      <h3 className={classes.formTitle}>Add New Item</h3>
      <input
        className={classes.inputName}
        type="text"
        name="token"
        placeholder="List Token"
        value={token}
        onChange={e => {
          onEnterToken(e);
        }}
        required
      />
      <input
        className={classes.inputName}
        type="text"
        name="name"
        placeholder="Item Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <div>
        <label className={classes.inputLabel}>
          <input
            className={classes.inputFrequency}
            type="radio"
            name="frequency"
            value="7"
            onChange={e => setFrequency(e.target.value)}
          />{" "}
          Soon
        </label>
        <label className={classes.inputLabel}>
          <input
            className={classes.inputFrequency}
            type="radio"
            name="frequency"
            value="14"
            onChange={e => setFrequency(e.target.value)}
          />{" "}
          Kind of Soon
        </label>
        <label className={classes.inputLabel}>
          <input
            className={classes.inputFrequency}
            type="radio"
            name="frequency"
            value="30"
            onChange={e => setFrequency(e.target.value)}
          />{" "}
          Not Soon
        </label>
      </div>
      <input
        className={classes.inputDate}
        type="date"
        name="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};

export default Form;
