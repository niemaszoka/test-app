import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { TextInputComponent } from './components/shared/text-input/text-input.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from "./components/shared/services/user.service";
import {AuthService} from "./components/shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {RestService} from "./components/shared/services/rest.service";
import { SearchResultsListComponent } from './components/search-view/search-results-list/search-results-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailFormViewComponent,
    PasswordFormViewComponent,
    SearchViewComponent,
    VideoViewComponent,
    TextInputComponent,
    SignInComponent,
    SearchResultsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
