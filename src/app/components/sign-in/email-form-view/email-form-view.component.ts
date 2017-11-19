import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'yv-email-form-view',
  templateUrl: './email-form-view.component.html',
  styleUrls: ['email-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EmailFormViewComponent implements OnInit {

  public emailInput = new FormControl('', Validators.email);
  public passwordInput = new FormControl('', [Validators.minLength(8), Validators.required]);
  public errorMessage: string = '';

  public loginOption = new FormControl('signIn', Validators.required);

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.registerUser(this.emailInput.value, this.passwordInput.value);
    this.router.navigate(['/Search']);
  }

  signIn() {
    this.authService.getRegisteredUserData(this.emailInput.value).subscribe(
      (userData) => {
        this.authService.saveRegisteredUserData(userData);
        this.router.navigate(['/SignIn/password']);
      }, (error) => {
        this.errorMessage = 'User with this email is not registered.';
      }
    );
  }

  onSubmit() {
    return this.loginOption.value === 'register' ? this.register() : this.signIn();
  };

  isSubmissionDisabled() {
    return this.loginOption.value === 'register' ? this.isRegistrationDisabled(): this.isSignInDisabled();
  }

  isSignInDisabled(): boolean {
    return this.emailInput.invalid;
  }

  isRegistrationDisabled(): boolean {
    return this.emailInput.invalid || this.passwordInput.invalid;
  }
}
