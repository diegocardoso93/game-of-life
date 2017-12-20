import React, { Component } from 'react';

const LifeState = {
  Live: 1,
  Dead: 0
};

class Cellule extends Component {

  constructor(props) {
    super(props);
    this.state = { bgColor: 'white' };
  }

  life_state;

  set_alive() {
    this.life_state = LifeState.Live;
  }

  set_dead() {
    this.life_state = LifeState.Dead;
  }

  is_alive() {
    return this.life_state == LifeState.Live;
  }

  count_live_neighbor(neighbors) {
    let count_live = 0;
    for (let neighbor of neighbors) {
      if (neighbor.is_alive()) {
        count_live++;
      }
    }
    return count_live;
  }

  is_loneliness(neighbors) {
    return this.count_live_neighbor(neighbors)<2;
  }

  is_overpopulation(neighbors) {
    return this.count_live_neighbor(neighbors)>3;
  }

  revive(neighbors) {
    return this.count_live_neighbor(neighbors)==3;
  }

  changeState(life_state) {
    let bgColor = '';
    if (life_state == LifeState.Live) {
      bgColor = 'black';
    } else {
      bgColor = 'white';
    }
    this.setState(prevState => ({
      bgColor: bgColor
    }));
  }

  render() {
    return (
      <div className="Game-cellule" style={{backgroundColor: this.state.bgColor}}> </div>
    )
  }

}

class GameOfLife extends Component {

  cellules;
  size;
  cellulesRef;

  constructor(props) {
    super(props);
    this.cellules = Array.from(new Array(props.size),(v,i) => Array.from(new Array(props.size),(val,index) => new Cellule(LifeState.Dead)));
    this.size = props.size;
    this.cellulesRef = Array.from(new Array(props.size),(v,i) => Array.from(new Array(props.size),(val,index) => 0));
  }

  random_mutate() {
    for (let x=0;x<this.size;x++) {
      for (let y=0;y<this.size;y++) {
        this.cellules[x][y].life_state = Math.round(Math.random());
      }
    }
  }

  commute() {
    let not_commited = this.cellules.slice();
    for (let row=0;row<this.size;row++) {
      for (let col=0;col<this.size;col++) {
        let neighbors = [];
        if (row>0 && col>0) {
          neighbors.push(not_commited[row-1][col-1]);
          neighbors.push(not_commited[row][col-1]);
          neighbors.push(not_commited[row-1][col]);
        }
        if (row<this.size-1 && col<this.size-1) {
          neighbors.push(not_commited[row+1][col+1]);
          neighbors.push(not_commited[row][col+1]);
          neighbors.push(not_commited[row+1][col]);
        }
        if (row>0 && col<this.size-1) {
          neighbors.push(not_commited[row-1][col+1]);
        }
        if (row>this.size-1 && col>0) {
          neighbors.push(not_commited[row+1][col-1]);
        }
        if (not_commited[row][col].is_alive(neighbors) &&
           (not_commited[row][col].is_loneliness(neighbors) ||
            not_commited[row][col].is_overpopulation(neighbors))) {

          this.cellules[row][col].set_dead();
        } else if (not_commited[row][col].revive(neighbors)) {
          this.cellules[row][col].set_alive();
        }
      }
    }
  }

  updateChildCellules() {
    for (let row=0;row<this.size;row++) {
      for (let col=0;col<this.size;col++) {
        this.cellulesRef[row][col].changeState(this.cellules[row][col].life_state);
      }
    }
  }

  play() {
    this.updateRate = setInterval(() => {
      this.commute();
      this.updateChildCellules();
    }, 500);
  }

  componentDidMount() {
    this.random_mutate();
    this.updateChildCellules();
    this.play();
  }

  componentWillUnmount() {
    clearInterval(this.updateRate);
  }

  render() {
    return (
      <div>
        {
          this.cellules.map((cellVec, i) => {
            return cellVec.map((cell, j) => {
              return (<Cellule key={i+j} ref={cellule => this.cellulesRef[i][j] = cellule} />)
            })
          })
        }
      </div>
    );
  }

}

export default GameOfLife;
