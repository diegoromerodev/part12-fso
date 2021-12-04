import React from "react";

export default (props) => {
  const { person, handleDelete } = props;

  return (
    <div
      style={{
        border: "2px solid #333",
        padding: "10px",
        margin: "10px",
        marginRight: "50%",
      }}
    >
      <p>
        {person.name} - {person.number}
      </p>
      <button
        type="button"
        style={{ backgroundColor: "lightcoral", color: "#fafafa" }}
        onClick={handleDelete}
      >
        delete?
      </button>
    </div>
  );
};
