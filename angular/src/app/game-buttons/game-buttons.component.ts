import {
  Component, EventEmitter,
  OnInit, Output
} from '@angular/core';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit {

  @Output() triggerClick: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickHandler(origin) {
    this.triggerClick.emit(origin);
  }

}
