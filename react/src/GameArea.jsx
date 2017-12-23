import React, { Component } from 'react';
import GameOfLife from './GameOfLife';
import GameButtons from './GameButtons';

class GameArea extends Component {

  constructor(props) {
    super(props);
    this.changeGameState = this.changeGameState.bind(this);
    this.state = { gameState: 'stop' };
  }

  changeGameState(e) {
    this.setState({ gameState: e.target.value });
  }

  render () {
    return (
      <section className="Game-area">
        <GameOfLife cellulesWidth={50} cellulesHeight={40} gameState={this.state.gameState} />
        <GameButtons changeGameState={this.changeGameState} />
      </section>
    );
  }

}
export default GameArea;
