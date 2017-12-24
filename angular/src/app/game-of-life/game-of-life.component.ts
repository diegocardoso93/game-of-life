import {
  Component, Input, OnDestroy, OnInit, QueryList,
  ViewChildren
} from '@angular/core';
import { GameCelluleComponent } from "../game-cellule/game-cellule.component";
import {LifeState} from "../life-state.enum";

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit, OnDestroy {

  @Input() cellulesWidth : number;
  @Input() cellulesHeight: number;

  @ViewChildren('cellulesRef') cellulesRef: QueryList<any>;

  cellulesGenerator: Array<Array<GameCelluleComponent>>;
  updateRate: any;

  constructor() { }

  random_mutate(): void {
    this.fill_cellules('random');
  }

  trigger_reset(): void {
    this.fill_cellules(LifeState.Dead);
  }

  fill_cellules(generator): void {
    for (let x=0;x<this.cellulesHeight;x++) {
      for (let y=0;y<this.cellulesWidth;y++) {
        this.cellulesRef[x][y].changeState(generator === 'random' ? Math.round(Math.random()) : generator);
      }
    }
  }

  commute(): void {
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
          if (GameCelluleComponent.is_loneliness(neighbors) || GameCelluleComponent.is_overpopulation(neighbors)) {
            this.cellulesRef[row][col].changeState(LifeState.Dead);
          }
        } else if (GameCelluleComponent.revive(neighbors)) {
          this.cellulesRef[row][col].changeState(LifeState.Live);
        }
      }
    }
  }

  play(): void {
    this.updateRate = setInterval(() => {
      this.commute();
    }, 50);
  }

  stop(): void {
    clearInterval(this.updateRate);
  }

  triggerState(gameState): void {
    switch (gameState) {
      case 'random': this.random_mutate(); break;
      case 'start' : this.play(); break;
      case 'stop'  : this.stop(); break;
      case 'reset' : this.trigger_reset(); break;
      default:
    }
  }

  ngOnInit() {
    this.cellulesGenerator = Array.from(new Array(this.cellulesHeight),(v,i) => Array.from(new Array(this.cellulesWidth),(val,index) => null));
    console.log(this.cellulesRef)
  }

  ngOnDestroy() {
    this.stop();
  }

  callClick(e) {
    alert(e)
  }
}
