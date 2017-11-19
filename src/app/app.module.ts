import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { TextInputComponent } from './components/shared/text-input/text-input.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RestService } from './services/rest.service';
import { SearchResultsListComponent } from './components/search-view/search-results-list/search-results-list.component';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthorizationGuard, RegistrationGuard } from './activation-guards';
import { LocalStorageService } from './services/localStorage.service';


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
    RestService,
    DatabaseService,
    LocalStorageService,
    RegistrationGuard,
    AuthorizationGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
