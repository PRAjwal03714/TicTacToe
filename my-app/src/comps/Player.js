import React from "react";
export default function Player({ name, symbol, isActivePlay, onChangeName }) {
  const [val, setVal] = React.useState(false);
  const [pName, setpName] = React.useState(name);

  function handleClick() {
    setVal((prevVal) => !prevVal);
    if (setVal) onChangeName(symbol, pName);
  }
  function handleChange(evt) {
    setpName(evt.target.value);
  }

  return (
    <li className={isActivePlay ? "active" : null}>
      <span className="player">
        {val && (
          <input
            type="text"
            required
            value={pName}
            onChange={handleChange}
          ></input>
        )}
        {!val && <span className="player-name">{pName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{val ? "save" : "Edit"}</button>
    </li>
  );
}
