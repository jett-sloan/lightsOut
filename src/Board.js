import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
//import { getTreeDiff } from "@testing-library/user-event/dist/cjs/utils/index.js";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = []

      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)

      }
      initialBoard.push.row()
    }


    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    if (board.every(row => row.every(cell => !cell)))
      return true
    else
      return false
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y, x - 1, boardCopy)
      flipCell(y, x + 1, boardCopy)
      flipCell(y - 1, x, boardCopy)
      flipCell(y + 2, x, boardCopy)
      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  //if (hasWon()) {
  //  alert('You Won')
  //}
  // TODO

  // make table board
  const makeTable = () => {
    return (
      <table className="game">
        <tbody>
          {board.map((row, y) =>
            <tr key={y}>
              {row.map((cell, x) =>
                <td>{Cell(flipCellsAround,cell)}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (<div>{makeTable()}</div>)
  // TODO
}

export default Board;
