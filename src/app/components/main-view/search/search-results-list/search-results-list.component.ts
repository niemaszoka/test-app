import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yv-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsListComponent implements OnInit {

  @Input() resultsList: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onVideoClick(video) {
    this.router.navigate(['/video', video.id.videoId])
  }


}
