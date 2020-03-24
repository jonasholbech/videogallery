//TODO: not used
import React, { useState } from "react";
const useInput = (label, defaultState, options = { type: "text" }) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-input-${label.replace(/ /gi, "").toLowerCase()}`;
  const Input = (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        key={id}
        name={id}
        {...options}
        value={state}
        onChange={e => {
          if (e.target.value === "") {
            updateState("");
          } else if (e.target.checkValidity()) {
            updateState(e.target.value);
          }
        }}
      />
    </label>
  );
  return [state, Input, updateState];
};

export default useInput;
