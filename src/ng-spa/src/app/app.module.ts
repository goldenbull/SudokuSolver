import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material';
import {AppComponent} from './app.component';
import {PopupFormComponent} from './popup-form/popup-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PopupFormComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PopupFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
