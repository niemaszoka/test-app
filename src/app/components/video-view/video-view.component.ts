import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'yv-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['video-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
