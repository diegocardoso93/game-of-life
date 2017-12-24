import {
  Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickHandler(e) {
    this.buttonClick.emit(e);
  }

}
