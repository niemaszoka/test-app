import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RestService } from './services/rest.service';
import { SearchResultsListComponent } from './components/main-view/search/search-results-list/search-results-list.component';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import {
  AuthorizationGuard,
  SignInEmailRouteGuard,
  SignInPasswordRouteGuard
} from './activation-guards';
import { LocalStorageService } from './services/localStorage.service';
import { MainViewComponent } from './components/main-view/main-view.component';
import { SearchComponent } from './components/main-view/search/search.component';
import { VideoComponent } from './components/main-view/video/video.component';
import { AppHeaderComponent } from './components/main-view/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailFormViewComponent,
    PasswordFormViewComponent,
    SignInComponent,
    SearchResultsListComponent,
    MainViewComponent,
    SearchComponent,
    VideoComponent,
    AppHeaderComponent,
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
    SignInPasswordRouteGuard,
    AuthorizationGuard,
    SignInEmailRouteGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
