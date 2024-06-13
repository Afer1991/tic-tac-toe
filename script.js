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

  const printBoard = () => console.log(board);

  return { getBoard, printBoard, addToken };
};

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

let activePlayer = players[0];

const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
};

const playRound = (row, column) => {
  gameBoard.board[row][column] = activePlayer.token;
  console.log(gameBoard.board);
  switchPlayerTurn();
};

const newGameBoard = gameBoard();