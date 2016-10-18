import React from 'react'

import Board from './board'

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='content'>
        <Board />
      </div>
    )
  }
}