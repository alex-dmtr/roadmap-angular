import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthHttpService } from './auth.http.service';
// import { NavComponent } from './nav.component';
// import { LoginComponent } from './login.component';
// import { RegisterComponent } from './register.component';
// import { HomeComponent } from './home.component';
// import { GroupsComponent } from './groups.component';

@NgModule({
  providers: [AuthService, AuthHttpService],
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  declarations: [AppComponent, RoutedComponents],
  bootstrap: [AppComponent]
})
export class AppModule { }
