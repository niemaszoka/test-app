import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'yv-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit {

  private currentUserEmail: string = '';
  private showSearchRedirectButton: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url !== '/') {
      this.showSearchRedirectButton = true;
    }
  }

  logoutFromApp() {
    this.authService.logoutFromApp();
    this.router.navigate(['/SignIn/email']);
  }

  goToSearchView() {
    return this.router.navigate(['']);
  }
}
