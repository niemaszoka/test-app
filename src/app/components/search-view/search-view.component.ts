import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'yv-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['search-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchViewComponent implements OnInit {

  public searchInput = new FormControl();

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/SignIn');
    }
  }

}
