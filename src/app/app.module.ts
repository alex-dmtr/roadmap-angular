import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, NavComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
