import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yv-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onKeyUp($event) {
    
  }

}
