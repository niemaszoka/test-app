import {
  Component, ElementRef, Input, OnChanges, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { ScrollElementService } from '../../../services/scrollElement.service';

@Component({
  selector: 'yv-search-results-list',
  templateUrl: './search-results-list.component.html',
  styleUrls: ['./search-results-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsListComponent implements OnInit, OnChanges {

  @Input() resultsList: Array<any>;
  @Input() scrollEndCallback: (any?)=>any;
  @Input() searchComplete: boolean;
  @ViewChild('scrollableList') scrollableList: ElementRef;

  public showLoader: boolean = false;
  private scrollBottomLatitude = 40;
  private lastScrollTop: number = 0;
  private scrollDownTimeout: number = null;

  constructor(private scrollElementService: ScrollElementService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('resultsList') && !changes.resultsList.firstChange) {
        if(changes.resultsList.previousValue.length >= changes.resultsList.currentValue.length) {
          this.scrollElementService.scrollTop(this.scrollableList.nativeElement);
      }
    }
  }

  onScroll(event) {
    const currentScroll = event.srcElement.scrollTop;
    console.log('on scroll', currentScroll, this.lastScrollTop);
    if (currentScroll > this.lastScrollTop) {
      this.showLoader = true;
      if (this.scrollDownTimeout) {
        window.clearTimeout(this.scrollDownTimeout);
      }

      this.scrollDownTimeout = window.setTimeout(() => {
        this.onScrollDown(event);
        this.scrollDownTimeout = null;
      }, 0);
    }
    this.lastScrollTop = event.srcElement.scrollTop;
  }

  public onScrollDown(event) {
    console.log('on scroll down', this.scrollableList);
    if (this.scrollElementService.isElementScrolledToBottom(this.scrollableList.nativeElement, this.scrollBottomLatitude)) {
      console.log('search');
      this.scrollEndCallback();
      this.showLoader = false;
    }
  }
}
