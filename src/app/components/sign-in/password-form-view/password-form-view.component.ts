import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { CommonTexts } from '../../../constants/commonTexts';

@Component({
	selector: 'yv-password-form-view',
	templateUrl: './password-form-view.component.html',
	styleUrls: ['password-form-view.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PasswordFormViewComponent implements OnInit, OnDestroy {

	@ViewChild('passwordInputElement') passwordInputElement: ElementRef;

	public passwordInput: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
	public errorMessage: string = '';
	public  texts: CommonTexts;

	private ngUnsubscribe: Subject<boolean> = new Subject();

	private readonly errorMessages = {
	  INCORRECT_PASSWORD: 'Incorrect password'
    };

	constructor(commonTexts: CommonTexts,
				private router: Router,
	            private authService: AuthService) {
	}

	ngOnInit() {
		this.texts = new CommonTexts();
		this.passwordInputElement.nativeElement.focus();
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	onSubmit() {
		this.authService.loginUserWithPassword(this.passwordInput.value)
			.takeUntil(this.ngUnsubscribe)
			.subscribe(
				() => {
					this.router.navigate(['']);
				}, (error) => {
					this.errorMessage = this.errorMessages.INCORRECT_PASSWORD;
				}
			);
	}

	isSubmissionDisabled(): boolean {
		return this.passwordInput.invalid;
	}
}
