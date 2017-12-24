import {Component, Input, OnInit} from '@angular/core';
import {LifeState} from "../life-state.enum";

@Component({
  selector: 'app-game-cellule',
  templateUrl: './game-cellule.component.html',
  styleUrls: ['./game-cellule.component.css']
})
export class GameCelluleComponent implements OnInit {

  @Input() row;
  @Input() col;

  celluleColor: string;
  life_state: LifeState;
  temp_life_state: any;

  is_alive(): boolean {
    return this.life_state === LifeState.Live;
  }

  is_dead(): boolean {
    return this.life_state === LifeState.Dead;
  }

  temp_is_alive(): boolean{
    return this.temp_life_state == LifeState.Live;
  }

  update_temp_state() {
    this.temp_life_state = this.life_state;
  }

  static count_live_neighbor(neighbors): number {
    let count_live = 0;
    for (let cellule of neighbors) {
      if (cellule.temp_is_alive()) {
        count_live++;
      }
    }
    return count_live;
  }

  static is_loneliness(neighbors): boolean {
    return GameCelluleComponent.count_live_neighbor(neighbors) < 2;
  }

  static is_overpopulation(neighbors): boolean {
    return GameCelluleComponent.count_live_neighbor(neighbors) > 3;
  }

  static revive(neighbors): boolean {
    return GameCelluleComponent.count_live_neighbor(neighbors) === 3;
  }

  changeState(life_state) {
    if (life_state === LifeState.Live) {
      this.life_state = LifeState.Live;
      this.celluleColor = 'black';
    } else {
      this.life_state = LifeState.Dead;
      this.celluleColor = 'white';
    }
  }

  toggleState() {
    if (this.is_alive()) {
      this.changeState(LifeState.Dead);
    } else {
      this.changeState(LifeState.Live);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
