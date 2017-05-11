import { Injectable } from '@angular/core';
import { Group } from './group';
import { Headers, Http } from '@angular/http';
import { AuthHttpService } from './auth.http.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  private groupsUrl = `http://localhost:3000/api/groups`;
  constructor(private http: AuthHttpService) {

  }

  //  [`Authorization: Bearer ${this.jwt}`]
  getGroups(): Promise<Group[]> {
    return this.http.get(this.groupsUrl)
      .toPromise().then(response => {
        console.log(response.json());
        return response.json() as Group[]
      });
  }
}
