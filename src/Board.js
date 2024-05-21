import React, { useState } from "react";
import Cell from "./Cell";
//import "./Board.css";

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log(coord)
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row => [...row]);
      const flipCell = (y, x) => {
        console.log(x,y,boardCopy)
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      flipCell(y, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      return boardCopy;
    });
  }

  if (hasWon()) {
    alert("You Won");
  }

  const makeTable = () => {
    return (
      <table className="game">
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <td key={`${y}-${x}`}>
                  <Cell
                    key={`${y}-${x}`}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} // Ensure the function is properly bound
                    isLit={cell}
                    coord={`${y}-${x}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  return <div>{makeTable()}</div>;
}

export default Board;
