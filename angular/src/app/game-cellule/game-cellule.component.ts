import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-cellule',
  templateUrl: './game-cellule.component.html',
  styleUrls: ['./game-cellule.component.css']
})
export class GameCelluleComponent implements OnInit {

  celluleClass: string;

  constructor() { }

  ngOnInit() {
  }

  toggleState() {
    this.celluleClass = 'black';
  }
}
