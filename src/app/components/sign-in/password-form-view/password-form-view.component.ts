import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'yv-password-form-view',
  templateUrl: './password-form-view.component.html',
  styleUrls: ['password-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordFormViewComponent implements OnInit {

  public passwordInput = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.passwordInput);
  }

  onSubmit() {
    this.userService.setUserEmail(this.passwordInput.value);
    this.router.navigateByUrl('/Search');
  }

  isSubmissionDisabled(): boolean {
    return this.passwordInput.status === 'INVALID';
  }
}
