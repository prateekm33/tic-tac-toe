import React from 'react'

import Row from './row';

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      matrix: [[0,0,0], [0,0,0], [0,0,0]],
      turn: 1
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
    }, () => {
      console.log('state updated to:', this.state.matrix)
    });

    this.checkWin(row, col);
  }

  checkWin(row, col) {
    const _row = this.state.matrix[row]  

    let win = false;

    // check row
    (() => {
      for (let i = 1; i < _row.length; i++) {
        if (_row[i] === 0) { return; }
        if (_row[i] !== _row[i - 1]) {
          return;
        }
      }
      win = true;
    })()

    if (win) { 
      console.log('WIN by row!')
      return;
    }


    // check col
    const _matrix = this.state.matrix;

    (() => {
      for (let i = 1; i < _matrix.length; i++) {
        if (_matrix[i][col] === 0) { return; }
        if (_matrix[i][col] !==  _matrix[i - 1][col]) {
          return;
        }
      }
      win = true;
    })()

    if (win) {
      console.log('WIN by col!')
      return;
    }

    // check diags
    // 0,0    0,2    2,0    2,2
    if ((row !== 0 || row !== 2) && (col !== 0 || col !== 2)) {
      return;
    }

    if (col === 0) {
      if (row === 0) {
        for (let i = 1; i < _matrix.length; i++) {
          if (_matrix[i][col + 1] !== _matrix[i - 1][col++]) {
            
          }
        }
      }
    }



  }


  render() {
    return (
      <div id='board-component'>
        {
          this.state.matrix.map((row, idx) => 
            {
              console.log('rendering?')
              return <Row row={row} rowIdx={idx} key={idx} squareClickHandler={this.squareClickHandler.bind(this)} />
            }
          )
        }
      </div>
    )
  }
}