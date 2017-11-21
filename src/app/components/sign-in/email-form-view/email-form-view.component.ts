import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'yv-email-form-view',
  templateUrl: './email-form-view.component.html',
  styleUrls: ['email-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EmailFormViewComponent implements OnInit, OnDestroy {

  public emailInput = new FormControl('', Validators.email);
  public passwordInput = new FormControl('', [Validators.minLength(8), Validators.required]);
  public submitErrorMessage: string = '';
  public loginOption = new FormControl('signIn', Validators.required);
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginOption.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if (this.submitErrorMessage) {
          this.submitErrorMessage = '';
        }
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  register() {
    this.authService.registerUser(this.emailInput.value, this.passwordInput.value);
    this.router.navigate(['/Search']);
  }

  signIn() {
    this.authService.getRegisteredUserData(this.emailInput.value)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      (userData) => {
        this.authService.saveRegisteredUserData(userData);
        this.router.navigate(['/SignIn/password']);
      }, (error) => {
        this.submitErrorMessage = 'User with this email is not registered.';
      }
    );
  }

  isRegistrationSelected = (): boolean => {
    return this.loginOption.value === 'register';
  };

  onSubmit() {
    return this.isRegistrationSelected() ? this.register() : this.signIn();
  };

  isSubmissionDisabled() {
    return this.isRegistrationSelected() ? this.isRegistrationDisabled(): this.isSignInDisabled();
  }

  isSignInDisabled(): boolean {
    return this.emailInput.invalid;
  }

  isRegistrationDisabled(): boolean {
    return this.emailInput.invalid || this.passwordInput.invalid;
  }
}
