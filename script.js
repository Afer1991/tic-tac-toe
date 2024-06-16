const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const plyr1 = document.getElementById("player-one");
const plyr2 = document.getElementById("player-two");

function gameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;

  const addToken = (row, column, token) => {
    board[row][column] = token;
  };

  const displayBoard = () => console.log(board);

  return { getBoard, displayBoard, addToken };
};

function gameController(playerOne = "Player One", playerTwo = "Player Two") {
  const board = gameBoard();

  const players = [
    {
     name: playerOne,
     token: "X"
    },
    {
      name: playerTwo,
      token: "O"
    }
  ];
  
  let currentPlayer = players[0];
  
  const switchTurns = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  
  const getCurrentPlayer = () => currentPlayer;

  const ckForWin = (arr, token) => {
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

  const ckForTie = (arr) => {
    let tieStr = 0;
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== "") {
          tieStr++;
        }
      }
    }
    return tieStr;
  }

  const playRound = (row, column) => {
    board.addToken(row, column, getCurrentPlayer().token);
    board.displayBoard();
    if (ckForWin(board.getBoard(), getCurrentPlayer().token)) {
      console.log(`${getCurrentPlayer().name} has won!`);
    } else if (ckForTie(board.getBoard()) === 9) {
      console.log("It's a tie");
    } else {
      switchTurns();
    }
  };

  return { playRound, players, getBoard: board.getBoard };
};

function screenController() {
  const game = gameController(plyr1.value, plyr2.value);
  const playerOneDiv = document.querySelector(".player-one-data");
  const playerTwoDiv = document.querySelector(".player-two-data");
  const boardDiv = document.querySelector(".board");

  playerOneDiv.innerText = `${game.players[0].name} ${game.players[0].token}`;
  playerTwoDiv.innerText = `${game.players[1].name} ${game.players[1].token}`;

  const board = game.getBoard();
  for (let i = 0; i < board.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    boardDiv.appendChild(row);
    for (let j = 0; j < board[i].length; j++) {
      const cell = document.createElement("div");
      row.appendChild(cell);
      cell.classList.add("cell");
    }
  }
  console.log(board);
};

dialog.showModal();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  screenController();
  dialog.close();
});