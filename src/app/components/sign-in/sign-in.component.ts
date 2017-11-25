import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'yv-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
	public WELCOME_MESSAGE: string = 'Welcome to youtube viewer!';

	constructor() { }

	ngOnInit() {

	}
}
