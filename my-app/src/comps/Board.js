import React from "react";

export default function Board({onSelect,boards}) {

  return (
    <ol id="game-board">
      {boards.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((pSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelect(rowIndex,colIndex)}disabled={pSymbol!=null}>{pSymbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
