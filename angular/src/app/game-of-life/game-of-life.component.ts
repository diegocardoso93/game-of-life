import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { GameCelluleComponent } from "../game-cellule/game-cellule.component";

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {

  @Input() cellulesWidth : number;
  @Input() cellulesHeight: number;

  @ViewChildren(GameCelluleComponent) cellulesRef: Array<Array<GameCelluleComponent>>;

  cellulesGenerator: Array<Array<GameCelluleComponent>>;

  constructor() { }

  ngOnInit() {
    this.cellulesGenerator = Array.from(new Array(this.cellulesHeight),(v,i) => Array.from(new Array(this.cellulesWidth),(val,index) => null));
  }

}
