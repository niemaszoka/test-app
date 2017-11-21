import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'yv-password-form-view',
  templateUrl: './password-form-view.component.html',
  styleUrls: ['password-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordFormViewComponent implements OnInit {

  public passwordInput = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public errorMessage:string = '';

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.loginUserWithPassword(this.passwordInput.value).subscribe(
      () => {
        this.router.navigate(['/Search']);
      }, (error) => {
        this.errorMessage = 'Incorrect password';
      }
    );
  }

  isSubmissionDisabled(): boolean {
    return this.passwordInput.invalid;
  }
}
