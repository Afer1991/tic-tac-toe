const gameBoard = {
  board: [["","",""], ["","",""], ["","",""]]
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