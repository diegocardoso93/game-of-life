import {Component, OnInit, ViewChild} from '@angular/core';
import {GameOfLifeComponent} from "../game-of-life/game-of-life.component";

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {

  @ViewChild(GameOfLifeComponent) gameOfLife: GameOfLifeComponent;

  constructor() { }

  ngOnInit() {
  }

  gameButtonClicked(msg) {
    this.gameOfLife.triggerState(msg);
  }

}
