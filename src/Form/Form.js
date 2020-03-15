import React, { useState } from "react";
import classes from "./Form.module.css";
import * as firebase from "../lib/firebase";
import grocery from "../img/greenGrocery.jpg";

const Form = props => {
  const { setdbItems, dbItems, token, onEnterToken } = props;
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [date, setDate] = useState("");
  const [numOfPurchases] = useState(0);
  const [lastEstimate] = useState(null);

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
        date,
        numOfPurchases,
        lastEstimate
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
      <div>
        <img
          className={classes.groceryImg}
          src={grocery}
          alt="A green grocery bag full of groceries with a recycling symbol on the front. "
        />
      </div>

      <div className="input-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <label for="name">Item Name</label>
      </div>
      <div>
        <h5>How soon do you want to buy this again?</h5>
      </div>
      <div className={classes.radioContainer}>
        <label>
          <input
            required
            className="with-gap"
            type="radio"
            name="frequency"
            value="7"
            onChange={e => setFrequency(e.target.value)}
          />
          <span className={classes.frequencySoon}>Soon</span>
        </label>
        <label>
          <input
            required
            className="with-gap"
            type="radio"
            name="frequency"
            value="14"
            onChange={e => setFrequency(e.target.value)}
          />
          <span className={classes.frequencyKindOfSoon}>Kind of Soon</span>
        </label>
        <label>
          <input
            required
            className="with-gap"
            type="radio"
            name="frequency"
            value="30"
            onChange={e => setFrequency(e.target.value)}
          />
          <span className={classes.frequencyNotSoon}>Not Soon</span>
        </label>
      </div>

      <button
        id={classes.addButtonWidth}
        className="btn waves-effect light-green darken-2"
      >
        ADD
        <i class="material-icons left">add</i>
      </button>
    </form>
  );
};

export default Form;
