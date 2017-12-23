import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
    alert();
  }

}
