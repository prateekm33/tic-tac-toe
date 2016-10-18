import React from 'react'


export default class Winner extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='winner-display'>
        {this.props.winner} wins!
      </div>
    )
  }
}