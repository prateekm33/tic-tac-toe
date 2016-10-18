import React from 'react'

export default class Square extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.displayItem + ' col'} onClick={this.props.squareClickHandler.bind(this, this.props.rowIdx, this.props.colIdx)}/>
    )
  }
}