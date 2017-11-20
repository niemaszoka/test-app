import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'yv-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  logoutFromApp() {
    return this.authService.logoutFromApp().subscribe(() => {
      this.router.navigate(['/SignIn/email']);
    });
  }

}
