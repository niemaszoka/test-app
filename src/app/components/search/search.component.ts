import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoogleAPIRestService } from '../../services/gooleAPIRest.service';
import { CommonTexts } from '../../constants/commonTexts';

@Component({
	selector: 'yv-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

	public searchInput: FormControl = new FormControl();
	public results: any[] = [];
	public isSearchComplete: boolean = false;
	public texts: CommonTexts;
	private keyUpTimeout: number = null;
	private nextPageToken: string = null;
	private currentPageToken: string = null;

	private readonly DEFAULT_RESULTS_LIMIT: number = 20;

	constructor(commonTexts: CommonTexts,
	            private authService: AuthService,
				private router: Router,
				private googleApiService: GoogleAPIRestService){
	}

	ngOnInit() {
		this.texts = new CommonTexts();
		if (!this.authService.isUserAuthenticated()) {
			this.router.navigateByUrl('/SignIn');
		}
	}

	public onKeyPress = (event) => {
		if (event.charCode === 13) {
			return;
		}

		if (this.keyUpTimeout) {
			window.clearTimeout(this.keyUpTimeout);
		}

		this.keyUpTimeout = window.setTimeout(() => {
			if (this.searchInput.value) {
				this.searchVideos(this.searchInput.value);
			} else {
				this.results = [];
			}
		}, 500);
	};

	onKeyUp = (event) => {
		if(event.code === 'Backspace') {
			this.onKeyPress(event);
		}
	};

	private searchNextPageVideos = () => {
		return this.searchVideos(this.searchInput.value, true);
	};

	private searchVideos = (phrase: string, searchNextPage: boolean = false) => {
		if (searchNextPage && this.currentPageToken === this.nextPageToken) {
			return;
		}

		this.currentPageToken = this.nextPageToken;

		return this.googleApiService.getVideosListForPhrase(phrase, this.nextPageToken, this.DEFAULT_RESULTS_LIMIT).subscribe((data) => {
			// clean current results if search is not dedicated for a next page
			if (!searchNextPage) {
				this.results = [];
			}
			this.processNewVideosListData(data);
		});
	};

	private processNewVideosListData = (data: object) => {
		const newVideosList = data['items'];
		this.nextPageToken = data['nextPageToken'];
		this.results = this.results.concat(newVideosList);
		this.isSearchComplete = newVideosList.length === 0;
    }
}
