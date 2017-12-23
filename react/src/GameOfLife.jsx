import React, { Component } from 'react';

const LifeState = {
  Live: 1,
  Dead: 0
};

class Cellule extends Component {

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
    return Cellule.count_live_neighbor(neighbors) < 2;
  }

  static is_overpopulation(neighbors) {
    return Cellule.count_live_neighbor(neighbors) > 3;
  }

  static revive(neighbors) {
    return Cellule.count_live_neighbor(neighbors) === 3;
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
      <div className="Game-cellule" style={{backgroundColor: this.state.bgColor}} onClick={this.toggleState}> </div>
    )
  }

}

class GameOfLife extends Component {

  cellulesWidth;
  cellulesHeight;
  cellulesRef;

  constructor(props) {
    super(props);
    this.cellulesWidth = props.cellulesWidth;
    this.cellulesHeight = props.cellulesHeight;
    this.cellulesRef = Array.from(new Array(this.cellulesHeight),(v,i) => Array.from(new Array(this.cellulesWidth),(val,index) => 0));
  }

  random_mutate() {
    this.fill_cellules('random');
  }

  trigger_reset() {
    this.fill_cellules(LifeState.Dead);
  }

  fill_cellules(generator) {
    for (let x=0;x<this.cellulesHeight;x++) {
      for (let y=0;y<this.cellulesWidth;y++) {
        this.cellulesRef[x][y].changeState(generator === 'random' ? Math.round(Math.random()) : generator);
      }
    }
  }

  commute() {
    for (let row=0;row<this.cellulesHeight;row++) {
      for (let col=0;col<this.cellulesWidth;col++) {
        this.cellulesRef[row][col].update_temp_state();
      }
    }
    for (let row=0;row<this.cellulesHeight;row++) {
      for (let col=0;col<this.cellulesWidth;col++) {
        let neighbors = [];
        if (row>0 && col>0) {
          neighbors.push(this.cellulesRef[row-1][col-1]);
          neighbors.push(this.cellulesRef[row][col-1]);
          neighbors.push(this.cellulesRef[row-1][col]);
        }
        if (row<this.cellulesHeight-1 && col<this.cellulesWidth-1) {
          neighbors.push(this.cellulesRef[row+1][col+1]);
          neighbors.push(this.cellulesRef[row][col+1]);
          neighbors.push(this.cellulesRef[row+1][col]);
        }
        if (row>0 && col<this.cellulesWidth-1) {
          neighbors.push(this.cellulesRef[row-1][col+1]);
        }
        if (row<this.cellulesHeight-1 && col>0) {
          neighbors.push(this.cellulesRef[row+1][col-1]);
        }
        if (this.cellulesRef[row][col].is_alive()) {
          if (Cellule.is_loneliness(neighbors) || Cellule.is_overpopulation(neighbors)) {
            this.cellulesRef[row][col].changeState(LifeState.Dead);
          }
        } else if (Cellule.revive(neighbors)) {
          this.cellulesRef[row][col].changeState(LifeState.Live);
        }
      }
    }
  }

  play() {
    this.updateRate = setInterval(() => {
      this.commute();
    }, 50);
  }

  stop() {
    clearInterval(this.updateRate);
  }

  componentWillUnmount() {
    this.stop();
  }

  componentWillUpdate(nextProps) {
    switch (nextProps.gameState) {
      case 'random': this.random_mutate(); break;
      case 'start' : this.play(); break;
      case 'stop'  : this.stop(); break;
      case 'reset' : this.trigger_reset(); break;
      default:
    }
  }

  render() {
    return (
      <div className="Game-of-life">
        {
          this.cellulesRef.map((cellVec, i) => {
            return cellVec.map((cell, j) => {
              return (<Cellule key={i+"_"+j} ref={cellule => this.cellulesRef[i][j] = cellule} />)
            })
          })
        }
      </div>
    );
  }

}

export default GameOfLife;
