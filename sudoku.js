function countInRow(row, value) {
  return row.reduce((n, x) => n + (x === value), 0);
}

function checkColumn(board, column) {
  for (var i = 0; i < 10; i++) {
    countNum = 0;
    board.forEach((row) => {
      if (row[column] === i) {
        countNum += 1;
      }
    });
    if (countNum > 1) {
      return false;
    }
  }
  return true;
}

function checkSection(board, section) {
  
}

function calculateSection(row, column) {
  var majorRow = Math.floor((row - 1) / 3);
  var majorColumn = Math.floor((column - 1) / 3);
  return majorCol + majorRow * 3 + 1;
}

function legalBoard(board) {
  board.forEach((row) => {
    for (var i = 1, i < 10; i++) {
      if (countInRow(row, i) > 0) {
        return false;
      }
    }
  });
  return true;
}

function makeBoard() {
  var board;
  var row1 = [8,'blank',6,'blank',4,7,'blank','blank',3];
  var row2 = [9,'blank',1,'blank',8,3,5,4,7];
  var row3 = [3,'blank','blank',9,'blank','blank',6,'blank','blank'];
  var row4 = [6,8,'blank','blank',9,'blank',3,'blank','blank'];
  var row5 = ['blank',1,2,3,7,6,'blank',8,4];
  var row6 = ['blank','blank',9,8,'blank','blank',7,'blank',6];
  var row7 = [2,9,'blank',7,6,'blank','blank',3,1];
  var row8 = ['blank','blank',3,5,'blank',2,'blank',6,'blank'];
  var row9 = [1,'blank',8,4,'blank','blank',2,7,'blank'];

  board = [row1,row2,row3,row4,row5,row6,row7,row8,row9];
  return board;
}

function printBoard(board) {
  var boardString = '';
  board.forEach((row, index) => {
    boardString = boardString + "|";
    row.forEach((square) => {
      if (square === "blank") {
        boardString = boardString + " "
      } else {
        boardString = boardString + square
      }
      boardString = boardString + "|"
    });
    boardString = boardString + "\n";
    if ((index+1)%3 === 0) {
      boardString = boardString + "------|-----|-----|" + "\n";
    } else {
      boardString = boardString + " - - -|- - -|- - -|" + "\n";
    }
  });
  console.log(boardString);
}

function solve(board) {
  board.forEach((row) => {
    row.forEach((square, index) => {
      if (square === "blank") {
        for (var i = 1; i < 10; i++) {
          row[index] = i;
          if (legalBoard(board)) {
            if (solved(board)) {
              break;
            } else {
              solve(board);
            }
          }
        }
      }
    })
  });
}
