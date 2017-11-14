import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EmailFormViewComponent} from "./views/email-form-view/email-form-view.component";
import {PasswordFormViewComponent} from "./views/password-form-view/password-form-view.component";
import {SearchViewComponent} from "./views/search-view/search-view.component";
import {VideoViewComponent} from "./views/video-view/video-view.component";

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
