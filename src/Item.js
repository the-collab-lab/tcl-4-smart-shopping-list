import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import fb from "./lib/firebase.js";

class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      dbItems: []
    };
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addItem = e => {
    e.preventDefault();
    let db = firebase.firestore();
    db.collection("items").add({
      itemName: this.state.itemName
    });
    this.setState({
      itemName: ""
    });
  };

  componentDidMount() {
    let db = firebase.firestore();
    db.collection("userThree")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({
          dbItems: data
        });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            name="itemName"
            placeholder="items"
            onChange={this.captureInput}
            value={this.state.itemName}
          />
          <button type="submit">Submit</button>
        </form>

        {/* render items here */}
        <ul>
          {this.state.dbItems.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Items;
