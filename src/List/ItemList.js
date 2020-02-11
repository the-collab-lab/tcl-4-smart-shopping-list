import React, { useState, useEffect } from "react";
import "firebase/firestore";
import * as firebase from "../lib/firebase";

const Items = props => {
  const [dbItems, setdbItems] = useState([]);

  useEffect(() => {
    if (props.token) {
      let db = firebase.fb.firestore();
      db.collection(props.token)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          setdbItems(data);
        });
    }
  }, [props.token]);

  return (
    <div>
      <input
        type="text"
        name="token"
        placeholder="enter token"
        onChange={e => {
          props.onEnterToken(e);
        }}
        value={props.token}
      />
      <ul>
        {dbItems.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Items;
