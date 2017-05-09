import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavComponent } from './nav.component';
// import { LoginComponent } from './login.component';
// import { RegisterComponent } from './register.component';
// import { HomeComponent } from './home.component';
// import { GroupsComponent } from './groups.component';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  declarations: [AppComponent, RoutedComponents],
  bootstrap: [AppComponent]
})
export class AppModule { }
