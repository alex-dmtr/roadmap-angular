import { Injectable } from '@angular/core';
import { Group } from './group';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  private groupsUrl = `http://localhost:3000/api/groups`;
  private jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcnRoLnZhZGVyIiwiaWQiOjMsImlhdCI6MTQ5NDMyMjAyOX0.-8cNJ7umC0lNf11_7aJAXfQwRLq1jFxvEX5x3yZjakU";
  constructor(private http: Http) {

  }

  //  [`Authorization: Bearer ${this.jwt}`]
  getGroups(): Promise<Group[]> {
    return this.http.get(this.groupsUrl, {
      headers: new Headers({ 'Authorization': `Bearer ${this.jwt}` })
    }
    ).toPromise().then(response => {
      console.log(response.json());
      return response.json() as Group[]
    });
  }
}
