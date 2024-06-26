const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const boardContainer = document.querySelector(".board-container");
const plyr1 = document.getElementById("player-one");
const plyr2 = document.getElementById("player-two");

function gameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const addToken = (slot, token) => {
    board[slot] = token;
  };

  return { getBoard, addToken };
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
  };

  return { playRound, players, getCurrentPlayer, getBoard: board.getBoard, ckForWin, ckForTie, switchTurns };
};

function screenController() {
  const game = gameController(plyr1.value, plyr2.value);
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn");
  const btnDiv = document.querySelector(".button-container");

  turnDiv.innerText = `${game.getCurrentPlayer().name}'s turn`;

  const btn = document.createElement("button");
  btnDiv.appendChild(btn);
  btn.innerText = "Restart";

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

  const restart = () => {
    while (boardContainer.hasChildNodes()) {
      boardContainer.removeChild(boardContainer.firstChild);
    }

    const turnDiv = document.createElement("div");
    turnDiv.classList.add("turn");
    boardContainer.appendChild(turnDiv);

    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardContainer.appendChild(boardDiv);

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("button-container");
    boardContainer.appendChild(btnDiv);

    dialog.showModal();
  };

  btn.onclick = restart;
};

dialog.showModal();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  screenController();
  dialog.close();
});
