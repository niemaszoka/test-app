import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EmailFormViewComponent} from "./components/email-form-view/email-form-view.component";
import {PasswordFormViewComponent} from "./components/password-form-view/password-form-view.component";
import {SearchViewComponent} from "./components/search-view/search-view.component";
import {VideoViewComponent} from "./components/video-view/video-view.component";

const routes: Routes= [
  { path: 'EmailForm', component: EmailFormViewComponent},
  { path: 'PasswordForm', component: PasswordFormViewComponent},
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
