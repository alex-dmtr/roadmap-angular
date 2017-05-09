import { Component } from '@angular/core';

class User {
  id?: Number
  username: String
}
class Group {
  id?: Number
  name: String
  description: String
  avatarUrl: String
  owner: User
  members?: User[]
}
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
