import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'yv-email-form-view',
  templateUrl: './email-form-view.component.html',
  styleUrls: ['email-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailFormViewComponent implements OnInit, AfterViewInit {

  public emailInput = new FormControl('', Validators.email);

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.emailInput);
  }

  onSubmit() {
    this.userService.setUserEmail(this.emailInput.value);
    this.router.navigateByUrl('/SignIn/password');
  }

  isSubmissionDisabled(): boolean {
    return this.emailInput.status === 'INVALID';
  }

}
