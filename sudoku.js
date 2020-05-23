const sectionToTopLeftMap = {
  1: [0,0],
  2: [0,3],
  3: [0,6],
  4: [3,0],
  5: [3,3],
  6: [3,6],
  7: [6,0],
  8: [6,3],
  9: [6,6]
}

function countInRow(board, row, value) {
  return board[row-1].reduce((n, x) => n + (x === value), 0);
}

function countInSection(board, section, value) {
  var startCoordinates = sectionToTopLeftMap[section];
  var row = startCoordinates[0];
  var column = startCoordinates[1];

  var count = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[row][column] === value) {
        count += 1;
      }
      column += 1;
    }
    column = startCoordinates[1];
    row += 1;
  }
  return count;
}

function countInColumn(board, column, value) {
  var countNum = 0;
  board.forEach((row) => {
    if (row[column-1] === value) {
      countNum += 1;
    }
  });
  return countNum;
}

function checkColumn(board, column) {
  for (var i = 1; i < 10; i++) {
    if (countInColumn(board, column, i) > 1) {
      return false;
    }
  }
  return true;
}

function checkSection(board, section) {
  for (var i = 1; i < 10; i++) {
    if (countInSection(board, section, i) > 1) {
      return false;
    }
  }
  return true;
}

function checkRow(board, row) {
  for (var i = 1; i < 10; i++) {
    if (countInRow(board, row, i) > 1) {
      return false;
    }
  }
  return true;
}

function calculateSection(row, column) {
  var majorRow = Math.floor((row - 1) / 3);
  var majorColumn = Math.floor((column - 1) / 3);
  return majorCol + majorRow * 3 + 1;
}

function legalBoard(board) {
  for (var i = 1; i < 10; i ++) {
    if (!(checkRow(board, i) && checkColumn(board, i) && checkSection(board, i))) {
      return false;
    }
  }
  return true;
}

function solved(board) {
  if (!legalBoard(board)) {
    return false;
  }

  for (var i = 1; i < 10; i++) {
    if (countInRow(board, i, "blank") > 0) {
      return false;
    }
  }
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
          if (legalBoard(board) && solved(board)) {
            return;
          } else if (!legalBoard(board)) {
              row[index] = 'blank';
          } else {
            solve(board);
          }
        }
      }
    })
  });
}

var board = makeBoard();
printBoard(board);
//console.log(legalBoard(board));
//console.log(solved(board));
solve(board);
