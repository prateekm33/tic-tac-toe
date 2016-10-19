const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let matrix = [[0,0,0], [0,0,0], [0,0,0]]

function newMatrix() {
  matrix = [[0,0,0], [0,0,0], [0,0,0]];
}

function genBoard() {
  matrix.forEach(row => {
    console.log(row)
  })
}
function startGame() {
  newMatrix();
  genBoard();
  makeMove();
}

startGame();


/*------ HELPER FUNCTIONS DEFINED BELOW -----------*/



let turn = 1;
let currPlayer = 'One'

function makeMove() {
  rl.question('Move to where (Format answer as: row,col)? ', (ans) => {
    const [row,col] = [...ans.split(',')];

    matrix[row][col] = turn;
    turn = turn === 1 ? 2 : 1;

    genBoard()
    if (checkWin(row,col)) {
      console.log('Player ' + currPlayer + ' has won!');
      restart();
    }
    makeMove()
  })
}

function restart() {
  rl.question('Restart? (y/n)', (ans) => {
    ans = ans.toLowerCase();
    if (ans === 'y') {
      console.log('\n\n\------RESTARTING ------- \n\n\n');
      return startGame();
    } else {
      rl.close();
      return;
    }
  })
}


/* --------- check wins ------------*/

function checkWin(row, col) {
  return checkRows(row) || checkCols(col) || checkDiags(row, col)
}

function checkRows(row) {
  row = matrix[row];

  for (let i = 1; i < row.length; i++) {
    if (row[i] === 0) { return; }
    if (row[i] !== row[i - 1]) {
      return false;
    }
  }

  return true;
}

function checkCols(col) {

  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][col] === 0) { return; }
    if (matrix[i][col] !==  matrix[i - 1][col]) {
      return false;
    }
  }
  return true
}

function checkDiags(row, col) {
  let win = false;

  if (row === 1 && col !== 1) {
    return false;
  }

  for (let i = 1, j = 1; i < matrix.length; i++) {
    if (matrix[i][j] === 0) { return; }
    if (matrix[i - 1][j - 1] !== matrix[i][j++]) {
      win = false;
      break;
    }
    win = true;
  }

  if (win) { return win; }

  for (let i = 1, j = 2; i < matrix.length; i++) {
    if (matrix[i][j] === 0) { return; }
    if (matrix[i - 1][j] !== matrix[i][--j]) {
      return false;
    }
  }

  return true;
}