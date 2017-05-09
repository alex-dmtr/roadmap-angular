import { Component } from '@angular/core';

import { Group } from './group';

@Component({
  selector: 'app',
  templateUrl: './app.template.html'
})

export class AppComponent {
  Groups: Group[] = [
    {
      "name": "Explorers",
      "description": "Hiking and outdoor activities",
      "avatarUrl": "http://s.hswstatic.com/gif/how-to-hike-1.jpg",
      owner: {
        username: "jango.fett"
      }
    }
  ];
}
