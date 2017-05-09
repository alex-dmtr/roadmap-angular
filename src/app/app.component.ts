import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
  <p>The quick brown fox jumps over the lazy dog.`,
})
export class AppComponent { name = 'world!'; }
