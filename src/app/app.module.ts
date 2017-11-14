import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailFormViewComponent } from './views/email-form-view/email-form-view.component';
import { PasswordFormViewComponent } from './views/password-form-view/password-form-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { VideoViewComponent } from './views/video-view/video-view.component';


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
