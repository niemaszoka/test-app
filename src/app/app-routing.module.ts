import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EmailFormViewComponent} from "./components/sign-in/email-form-view/email-form-view.component";
import {PasswordFormViewComponent} from "./components/sign-in/password-form-view/password-form-view.component";
import {SearchViewComponent} from "./components/search-view/search-view.component";
import {VideoViewComponent} from "./components/video-view/video-view.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";

const routes: Routes= [
  { path: 'SignIn', component: SignInComponent, children: [
      { path: 'email', component: EmailFormViewComponent},
      { path: 'password', component: PasswordFormViewComponent},
      { path: '', redirectTo: 'email', pathMatch: 'full' },
  ]},
  { path: 'Video', component: VideoViewComponent},
  { path: 'Search', component: SearchViewComponent},
  { path: '', redirectTo: 'Search', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {
}
