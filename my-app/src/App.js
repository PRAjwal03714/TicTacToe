import React from "react";
import Player from "./comps/Player.js";
import Board from "./comps/Board.js";
import Log from "./comps/Log.js";
import { WINNING } from "./comps/Winning.js";
import Gameover from "./comps/Game-Over.js";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [isActive, setisActive] = React.useState("X");
  const [turns, setTurns] = React.useState([]);
  const[players,setPlayers]=React.useState({
    'X':'Player1',
    'O':'Player2'
  })
  let winner;
  let draw = turns.length === 9 && !winner;
  const state = [...board.map(item=>[...item])];
  for (const item of turns) {
    const { square, player } = item;
    const { row, col } = square;
    state[row][col] = player;
  }
  for (const comb of WINNING) {
    const firstSquare = state[comb[0].row][comb[0].column];
    const secondSquare = state[comb[1].row][comb[1].column];
    const thirdSquare = state[comb[2].row][comb[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  function handlePlayer(symbol,newName)
  {
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,[symbol]:newName
      }})
  }
  function handleSquare(rowIndex, colIndex) {
    setisActive((curActive) => (curActive === "X" ? "O" : "X"));
    setTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRematch() {
    setTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActivePlay={isActive === "X"} onChangeName={handlePlayer} />
          <Player name="Player 2" symbol="O" isActivePlay={isActive === "O"} onChangeName={handlePlayer}/>
        </ol>
        {(winner || draw) && (
          <Gameover winner={winner} onRematch={handleRematch} />
        )}
        <Board onSelect={handleSquare} boards={state} />
      </div>
      <Log turn={turns} />
    </main>
  );
}

export default App;
