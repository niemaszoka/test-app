import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {FormControl} from "@angular/forms";
import {RestService} from "../shared/services/rest.service";

@Component({
  selector: 'yv-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['search-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchViewComponent implements OnInit {

  public searchInput = new FormControl();
  public results: any[] = [];
  private keyUpTimeout: number = null;

  constructor(private authService: AuthService,
              private router: Router,
              private restService: RestService) {
  }

  ngOnInit() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/SignIn');
    }
  }

  public onKeyUp = () => {
    if (this.keyUpTimeout) {
      window.clearTimeout(this.keyUpTimeout);
    }

    this.keyUpTimeout = window.setTimeout(() => {
      this.searchVideos(this.searchInput.value);
    }, 100);
  };

  private searchVideos = (phrase: string) => {
    this.restService.getVideosListForPhrase(phrase).subscribe((data) => {
      this.results = data['items'];
    });
  };

}
