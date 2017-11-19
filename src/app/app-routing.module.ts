import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthorizationGuard, RegistrationGuard } from './activation-guards';
import { MainViewComponent } from './components/main-view/main-view.component';
import { VideoComponent } from './components/main-view/video/video.component';
import { SearchComponent } from './components/main-view/search/search.component';

const routes: Routes= [
  { path: 'SignIn', component: SignInComponent, children: [
      { path: 'email', component: EmailFormViewComponent, canActivate: [AuthorizationGuard]},
      { path: 'password', component: PasswordFormViewComponent, canActivate: [AuthorizationGuard, RegistrationGuard]},
      { path: '', redirectTo: 'email', pathMatch: 'full' },
  ]},
  { path: '', component: MainViewComponent, canActivate: [AuthorizationGuard], children: [
    { path: 'video', component: VideoComponent},
    { path: '', component: SearchComponent},
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {
}
