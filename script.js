function gameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
      board[i].push("");
    }
  }

  const addToken = (row, column, token) => {
    board[row][column] = token;
  };

  const displayBoard = () => console.log(board);

  return { displayBoard, addToken };
};

function gameController() {
  const board = gameBoard();

  const players = [
    {
     name: "Player One",
     token: "X"
    },
    {
      name: "Player Two",
      token: "O"
    }
  ];
  
  let currentPlayer = players[0];
  
  const switchTurns = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  
  const getCurrentPlayer = () => currentPlayer;

  const playRound = (row, column) => {
    board.addToken(row, column, getCurrentPlayer().token);
    board.displayBoard();
    switchTurns();
  };

  return { playRound };
};

const newGame = gameController();

function ckForWin(arr, token) {
  let resultsStr = "";

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === token ) {
        resultsStr = resultsStr.concat("1");
      } else {
        resultsStr = resultsStr.concat("0");
      }
    }
  }
  
  const winRegex1 = /^1{3}\d{6}$/;
  const winRegex2 = /^\d{3}1{3}\d{3}$/;
  const winRegex3 = /^\d{6}1{3}$/;
  const winRegex4 = /^1\d{2}1\d{2}1\d{2}$/;
  const winRegex5 = /^\d1\d{2}1\d{2}1\d$/;
  const winRegex6 = /^\d{2}1\d{2}1\d{2}1$/;
  const winRegex7 = /^1\d{3}1\d{3}1$/;
  const winRegex8 = /^\d{2}1\d1\d1\d{2}$/;

  const winCombosArr = [winRegex1, winRegex2, winRegex3, winRegex4, winRegex5, winRegex6, winRegex7, winRegex8];
  
  const hasPlayerWon = winCombosArr.some(regex => regex.test(resultsStr));

  return hasPlayerWon;
};

