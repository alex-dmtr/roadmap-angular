import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { HomeComponent } from './home.component';
@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  declarations: [AppComponent, NavComponent, LoginComponent, RegisterComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
