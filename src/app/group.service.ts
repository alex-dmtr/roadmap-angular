import { Injectable } from '@angular/core';
import { Group } from './group';

@Injectable()
export class GroupService {
  getGroups(): Group[] {
    return [
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
}