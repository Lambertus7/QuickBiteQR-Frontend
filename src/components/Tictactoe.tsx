import React, { useState } from "react";
import Cell from "./Cell";

const TicTacToe: React.FC = () => {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [start, setStart] = useState<string>("circle");
  const [winner, setWinner] = useState<string>("");

  const checkWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleMove = (id: number) => {
    if (cells[id] !== "" || winner) return; // Prevent overwriting or moves after game end

    const newCells = [...cells];
    newCells[id] = start;
    setCells(newCells);

    const gameWinner = checkWinner(newCells);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setStart(start === "circle" ? "cross" : "circle");
    }
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setStart("circle");
    setWinner("");
  };

  return (
    <div className="game-container">
      <h1>TicTacToe!</h1>
      <div className="game-board">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            start={start}
            handleMove={handleMove}
          />
        ))}
      </div>
      {winner ? (
        <p>{winner} wins!</p>
      ) : cells.every((cell) => cell !== "") ? (
        <p>It's a draw!</p>
      ) : (
        <p>It is now {start}'s go</p>
      )}
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
