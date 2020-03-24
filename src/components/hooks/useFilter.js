import React, { useState } from "react";
const useFilter = items => {
  const [state, updateState] = useState([]);

  function toggle(e) {
    const id = Number(e.target.value);
    let nextState = [...state];
    if (nextState.includes(id)) {
      nextState = nextState.filter(it => it !== id);
    } else {
      nextState.push(id);
    }
    updateState(nextState);
  }
  const Filter = (
    <nav>
      <h2>Filters</h2>
      <fieldset>
        <legend>Show only</legend>
        {items.map(item => {
          return (
            <label key={item.id}>
              <input
                type="checkbox"
                name={item.header}
                value={item.id}
                onChange={toggle}
                checked={state.includes(item.id)}
              />
              {item.header}
            </label>
          );
        })}
      </fieldset>
    </nav>
  );
  return [state, Filter, updateState];
};

export default useFilter;
