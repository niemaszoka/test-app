import {
	Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, ViewChild,
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
	@Input() scrollEndCallback: (any?) => any;
	@Input() searchComplete: boolean;
	@ViewChild('scrollableList') scrollableList: ElementRef;

	public showLoader = false;
	private lastScrollTop = 0;
	private scrollDownTimeout: number = null;
	private readonly SCROLL_BOTTOM_LATITUDE = 40;

	constructor(private scrollElementService: ScrollElementService) { }

	ngOnInit() {
	}

	ngOnChanges(changes) {
		if (changes.hasOwnProperty('resultsList') && !changes.resultsList.firstChange) {
		  this.scrollToTopIfResultsAreFresh(changes.resultsList);
		}
	}

	onResultsScroll(event) {
		const currentScroll = event.srcElement.scrollTop;

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
		if (this.scrollElementService.isElementScrolledToBottom(this.scrollableList.nativeElement, this.SCROLL_BOTTOM_LATITUDE)) {
			this.scrollEndCallback();
			this.showLoader = false;
		}
	}

	private scrollToTopIfResultsAreFresh = (resultsListChange: SimpleChange) => {
		if (resultsListChange.previousValue.length >= resultsListChange.currentValue.length) {
			this.scrollElementService.scrollTop(this.scrollableList.nativeElement);
		}
    }
}
