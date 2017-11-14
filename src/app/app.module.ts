import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './components/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './components/password-form-view/password-form-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailFormViewComponent,
    PasswordFormViewComponent,
    SearchViewComponent,
    VideoViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
