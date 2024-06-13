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