import React from 'react'

import Row from './row';
import Winner from './winner'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      matrix: [[0,0,0], [0,0,0], [0,0,0]],
      turn: 1,
      winner: ''
    }
  }

  squareClickHandler(...args) {
    const [row,col] = [...args];
    const currentPlayer = this.state.turn;

    // if first player, then change that square in matrix to 1, else to 2
    const temp = this.state.matrix.map(el => el);
    temp[row][col] = currentPlayer === 1 ? 1 : 2

    this.setState({
      matrix: temp,
      turn: currentPlayer === 1 ? 2 : 1
    });

    this.checkWin(row, col);
  }

  checkRow(_row) {
    for (let i = 1; i < _row.length; i++) {
        if (_row[i] === 0) { return; }
        if (_row[i] !== _row[i - 1]) {
          return false;
        }
      }
      
      return true;
  }

  checkCol(_matrix, col) {
    for (let i = 1; i < _matrix.length; i++) {
        if (_matrix[i][col] === 0) { return; }
        if (_matrix[i][col] !==  _matrix[i - 1][col]) {
          return false;
        }
      }
      return true
  }

  checkDiagonals(_matrix, row, col) {
    let win = false;

    if (row === 1 && col !== 1) {
      console.log('NOPE!', row, col)
      return false;
    }

    for (let i = 1, j = 1; i < _matrix.length; i++) {
      if (_matrix[i][j] === 0) { return; }
      if (_matrix[i - 1][j - 1] !== _matrix[i][j++]) {
        win = false;
        break;
      }
      win = true;
    }

    if (win) { return win; }

    for (let i = 1, j = 2; i < _matrix.length; i++) {
      if (_matrix[i][j] === 0) { return; }
      if (_matrix[i - 1][j] !== _matrix[i][--j]) {
        return false;
      }
    }

    return true;
  }

  checkWin(row, col) {
    const _row = this.state.matrix[row]  
    const _matrix = this.state.matrix;

    let win = false;

    // check row
    win = (this.checkRow(_row) || this.checkCol(_matrix, col) || this.checkDiagonals(_matrix, row, col))

    if (win) { 
      const winner = this.state.turn === 1 ? 'One' : 'Two'

      console.log(`Player ${winner} WINS!`)

      this.setState({ winner: `Player ${winner}` });
      return;
    }

  }

  reset() {
    this.setState({
      matrix: [[0,0,0], [0,0,0], [0,0,0]],
      turn: 1,
      winner: ''
    })
  }


  render() {
    return (
      <div id='board-component'>
        { this.state.winner ? <Winner winner={this.state.winner} /> : null }
        {
          this.state.matrix.map((row, idx) => 
            {
              return <Row row={row} rowIdx={idx} key={idx} squareClickHandler={this.squareClickHandler.bind(this)} />
            }
          )
        }
        <div id='reset' onClick={this.reset.bind(this)}>  RESET </div>
      </div>
    )
  }
}