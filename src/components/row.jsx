import React from 'react'

import Square from './square';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: this.props.row
    }

    console.log('hello')
  }

  render() {
    return (
      <div className='row'>
        {
          this.state.cols.map( (col,idx) => 
            <Square displayItem={col === 1 ? 'player-one' : col === 2 ? 'player-two' : 'none'} key={idx} rowIdx={this.props.rowIdx} colIdx={idx} squareClickHandler={this.props.squareClickHandler} />
          )
        }
      </div>

    )
  }
}