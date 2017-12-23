import React, { Component } from 'react';
import LifeState from './GameLifeState';

class GameCellule extends Component {

  constructor(props) {
    super(props);
    this.state = { bgColor: 'white', lifeState: LifeState.Dead };
    this.temp_state = { bgColor: 'white', lifeState: LifeState.Dead };
    this.toggleState = this.toggleState.bind(this);
  }

  is_alive() {
    return this.state.lifeState === LifeState.Live;
  }

  temp_is_alive() {
    return this.temp_state.lifeState === LifeState.Live;
  }

  update_temp_state() {
    this.temp_state.lifeState = this.state.lifeState;
  }

  static count_live_neighbor(neighbors) {
    let count_live = 0;
    for (let neighbor of neighbors) {
      if (neighbor.temp_is_alive()) {
        count_live++;
      }
    }
    return count_live;
  }

  static is_loneliness(neighbors) {
    return GameCellule.count_live_neighbor(neighbors) < 2;
  }

  static is_overpopulation(neighbors) {
    return GameCellule.count_live_neighbor(neighbors) > 3;
  }

  static revive(neighbors) {
    return GameCellule.count_live_neighbor(neighbors) === 3;
  }

  changeState(life_state) {
    let bgColor = '';
    if (life_state === LifeState.Live) {
      bgColor = 'black';
    } else {
      bgColor = 'white';
    }
    this.setState({
      bgColor: bgColor,
      lifeState: life_state
    });
  }

  toggleState() {
    if (this.is_alive()) {
      this.changeState(LifeState.Dead);
    } else {
      this.changeState(LifeState.Live);
    }
  }

  render() {
    return (
      <div className="Game-cellule" style={{ backgroundColor: this.state.bgColor }} onClick={this.toggleState}> </div>
    )
  }
}

export default GameCellule;