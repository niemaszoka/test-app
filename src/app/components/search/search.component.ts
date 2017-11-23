import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'yv-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  public searchInput = new FormControl();
  public results: any[] = [];
  public isSearchComplete: boolean = false;
  private keyUpTimeout: number = null;
  private nextPageToken: string = null;
  private currentPageToken: string = null;
  private DEFAULT_RESULTS_LIMIT: number = 20;

  constructor(private authService: AuthService,
              private router: Router,
              private restService: RestService) {
  }

  ngOnInit() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/SignIn');
    }
  }

  public onKeyPress = (event) => {
    if(event.charCode === 13) {
      return;
    }

    if (this.keyUpTimeout) {
      window.clearTimeout(this.keyUpTimeout);
    }

    this.keyUpTimeout = window.setTimeout(() => {
      if(this.searchInput.value) {
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
    return this.restService.getVideosListForPhrase(phrase, this.nextPageToken, this.DEFAULT_RESULTS_LIMIT).subscribe((data) => {
      const newList = data['items'];
      if (searchNextPage) {
        this.results = this.results.concat(newList);
      } else {
        this.results = newList;
      }
      this.isSearchComplete = newList.length === 0;
      this.nextPageToken = data['nextPageToken'];
    });
  };

}