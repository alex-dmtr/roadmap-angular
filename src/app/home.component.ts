import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `  <h2>Home</h2>
  <p>Welcome to our groups website! You can meet awesome people here.</p>
  <p>Joining is easy. Just click <a routerLink='/register'>here</a> to go to to the sign up page.</p>`
})
export class HomeComponent {

}