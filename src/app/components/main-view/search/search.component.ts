import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'yv-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

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
