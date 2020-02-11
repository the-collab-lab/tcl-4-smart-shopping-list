import React, { useState } from "react";
import classes from "./Form.module.css";
import * as firebase from "../lib/firebase";

const Form = props => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let db = firebase.fb.firestore();
    let data = {
      name,
      frequency,
      date
    };
    db.collection(props.token)
      .add(data)
      .then(function() {
        alert("Item added!");
      })
      .catch(function(error) {
        alert("Something went wrong!");
        console.error("Error writing document: ", error);
      });
  };

  return (
    <form className={classes.form} onSubmit={e => handleSubmit(e)}>
      <h3 className={classes.formTitle}>Add New Item</h3>
      <input
        className={classes.inputName}
        type="text"
        name="token"
        placeholder="List Token"
        value={props.token}
        onChange={e => {
          props.onEnterToken(e);
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
