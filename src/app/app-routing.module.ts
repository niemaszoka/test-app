import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthorizationGuard, SignInEmailRouteGuard, SignInPasswordRouteGuard } from './activation-guards';
import { SearchComponent } from './components/search/search.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes= [
	{ path: 'SignIn', component: SignInComponent, children: [
		{ path: 'email', component: EmailFormViewComponent, canActivate: [SignInEmailRouteGuard]},
		{ path: 'password', component: PasswordFormViewComponent, canActivate: [SignInPasswordRouteGuard]},
		{ path: '', redirectTo: 'email', pathMatch: 'full' },
	]},
	{ path: 'video/:videoId', component: VideoComponent, canActivate: [AuthorizationGuard]},
	{ path: '', component: SearchComponent, canActivate: [AuthorizationGuard]},
	{ path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	exports: [RouterModule],
	imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {
}
