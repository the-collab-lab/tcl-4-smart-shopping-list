import React from "react";
import PropTypes from "prop-types";

function List(props) {
  return (
    <div>
      <button onClick={props.onGenerateToken}>Get your list token!</button>
      <p>{props.token}</p>
    </div>
  );
}

List.propTypes = {
  onGenerateToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default List;
