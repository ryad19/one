const PLAYER_NONE = 0;
const PLAYER_RED = 1;
const PLAYER_YELLOW = 2;
const ROWS = 6;
const COLUMNS = 7;

let board = [];
let currentPlayer = PLAYER_RED;
let gameover = false;
let message = '';

let modeSelect = document.getElementById('mode');
let newGameButton = document.getElementById('new-game');
let messageElement = document.getElementById('message');

// initialize the board
function initBoard() {
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLUMNS; j++) {
      board[i][j] = PLAYER_NONE;
    }
  }
}

// render the board
function renderBoard() {
  let table = document.getElementById('board');
  table.innerHTML = '';
  for (let i = 0; i < ROWS; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < COLUMNS; j++) {
      let cell = document.createElement('td');
      if (board[i][j] === PLAYER_RED) {
        cell.classList.add('red');
      } else if (board[i][j] === PLAYER_YELLOW) {
        cell.classList.add('yellow');
      }
      if (!gameover) {
        cell.addEventListener('click', () => makeMove(j));
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// check if the given player has won
function checkWin(player) {
  // check horizontal
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j <= COLUMNS - 4; j++) {
      if (board[i][j] === player && board[i][j+1] === player &&
          board[i][j+2] === player && board[i][j+3] === player) {
        return true;
      }
    }
  }
  // check vertical
  for (let i = 0; i <= ROWS - 4; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (board[i][j] === player && board[i+1][j] === player &&
          board[i+2][j] === player && board[i+3][j] === player) {
        return true;
      }
    }
  }
  // check diagonal
  for (let i = 0; i <= ROWS - 4; i++) {
    for (let j = 0; j <= COLUMNS - 4; j++) {
      if (board[i][j] === player && board[i+1][j+1] === player &&
          board[i+2][j+2] === player && board[i+3][j+3] === player) {
        return true;
      }
      if (board[i][j+3] === player && board[i+1][j+2] === player &&
          board[i+2][j+1] === player && board[i+3][j] === player) {
        return true;
      }
    }
  }
  return false;
}

// check if the game is a tie
function checkTie() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (board[i][j=== PLAYER_NONE) { 
        return false;
      }
    }
  }
  return true;
}


// make a move for the current player at the given column
function makeMove(column) {
if (gameover) {
return;
}
for (let i = ROWS - 1; i >= 0; i--) {
if (board[i][column] === PLAYER_NONE) {
board[i][column] = currentPlayer;
renderBoard();
if (checkWin(currentPlayer)) {
message = currentPlayer === PLAYER_RED ? 'Red wins!' : 'Yellow wins!';
gameover = true;
} else if (checkTie()) {
message = 'Tie game!';
gameover = true;
} else {
currentPlayer = currentPlayer === PLAYER_RED ? PLAYER_YELLOW : PLAYER_RED;
if (currentPlayer === PLAYER_YELLOW && modeSelect.value === 'computer') {
makeComputerMove();
}
}
messageElement.innerHTML = message;
break;
}
}
}

// make a move for the computer player
function makeComputerMove() {
let column = Math.floor(Math.random() * COLUMNS);
makeMove(column);
}

// start a new game
function newGame() {
initBoard();
renderBoard();
currentPlayer = PLAYER_RED;
gameover = false;
message = '';
messageElement.innerHTML = '';
if (modeSelect.value === 'computer' && currentPlayer === PLAYER_YELLOW) {
makeComputerMove();
}
}

newGameButton.addEventListener('click', newGame);
modeSelect.addEventListener('change', newGame);

// initialize the board and start a new game
initBoard();
newGame();
