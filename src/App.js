import {useState} from "react";
import './App.css';

function Square({value, onSquareClick}){

  return (
  <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board(){
  // first index is the current state
  // second index is the function to let you update it
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function resetButton() {
    for(let index = 0; index < squares.length; index++) {
      squares[index] = null
    }
    setSquares(squares)
    setXIsNext("X")
    return
  }

  return (
    // fragments are used to let you group a list of children without adding extra nodes to the dom
    <>
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* an arrow function is used to negate handleClick() from being called immediately */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <br/>
      <div>
        <button onClick={resetButton}>Reset</button>
      </div>
    </>
  );
}
