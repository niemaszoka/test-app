import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './components/sign-in/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/sign-in/password-form-view/password-form-view.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { GoogleAPIRestService } from './services/gooleAPIRest.service';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import {
	AuthorizationGuard,
	SignInEmailRouteGuard,
	SignInPasswordRouteGuard
} from './activation-guards';
import { LocalStorageService } from './services/localStorage.service';

import { VideoComponent } from './components/video/video.component';
import { SearchResultsListComponent } from './components/search/search-results-list/search-results-list.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListItemComponent } from './components/search/search-list-item/search-list-item.component';
import { ScrollElementService } from './services/scrollElement.service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CommonTexts } from './constants/commonTexts';

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		EmailFormViewComponent,
		PasswordFormViewComponent,
		SignInComponent,
		SearchResultsListComponent,
		SearchComponent,
		VideoComponent,
		SearchListItemComponent,
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
		GoogleAPIRestService,
		DatabaseService,
		LocalStorageService,
		SignInPasswordRouteGuard,
		AuthorizationGuard,
		SignInEmailRouteGuard,
		ScrollElementService,
		CommonTexts
	],
	bootstrap: [AppComponent]
})

export class AppModule {

}
