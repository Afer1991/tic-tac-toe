const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const plyr1 = document.getElementById("player-one");
const plyr2 = document.getElementById("player-two");

function gameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const addToken = (slot, token) => {
    board[slot] = token;
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
      if (arr[i] === token ) {
        resultsStr = resultsStr.concat("1");
      } else {
        resultsStr = resultsStr.concat("0");
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
      if (arr[i] !== "") {
        tieStr++;
      }
    }
    return tieStr;
  }

  const playRound = (slot) => {
    board.addToken(slot, getCurrentPlayer().token);
    board.displayBoard();
  };

  return { playRound, players, getCurrentPlayer, getBoard: board.getBoard, ckForWin, ckForTie, switchTurns };
};

function screenController() {
  const game = gameController(plyr1.value, plyr2.value);
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");

  turnDiv.innerText = `${game.getCurrentPlayer().name}'s turn`;

  const board = game.getBoard();

  const playRound = (slot) => {
    if (board[slot] === "") {
      game.playRound(slot);

      const cell = document.getElementById(slot);
      cell.innerText = board[slot];
      
      if (game.ckForWin(board, game.getCurrentPlayer().token)) {
        turnDiv.innerText = `${game.getCurrentPlayer().name} has won!`;

        while (boardDiv.hasChildNodes()) {
          boardDiv.removeChild(boardDiv.firstChild);
        }

        for (let i = 0; i < board.length; i++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.setAttribute("id", `${i}`);
          boardDiv.appendChild(cell);
          cell.innerText = board[i];
        }

      } else if (game.ckForTie(board) === 9) {
        turnDiv.innerText = "It's a tie";

        while (boardDiv.hasChildNodes()) {
          boardDiv.removeChild(boardDiv.firstChild);
        }

        for (let i = 0; i < board.length; i++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.setAttribute("id", `${i}`);
          boardDiv.appendChild(cell);
          cell.innerText = board[i];
        }

      } else {
        turnDiv.innerText = `${game.getCurrentPlayer() === game.players[0] ? game.players[1].name : game.players[0].name}'s turn`;
      }
      
      game.switchTurns();
    }
  };

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", `${i}`);
    boardDiv.appendChild(cell);
    cell.addEventListener("click", () => {
      playRound(`${i}`);
    });
  }

  
};

dialog.showModal();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  screenController();
  dialog.close();
});

/**if (ckForWin(board.getBoard(), getCurrentPlayer().token)) {
      console.log(`${getCurrentPlayer().name} has won!`);
    } else if (ckForTie(board.getBoard()) === 9) {
      console.log("It's a tie");
    } else {
      switchTurns();
    } **/