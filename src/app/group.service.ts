import { Injectable } from '@angular/core';
import { Group } from './group';
import { Headers, Http } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  private groupsUrl = `http://localhost:3000/api/groups`;
  constructor(private http: Http, private authService: AuthService) {

  }

  //  [`Authorization: Bearer ${this.jwt}`]
  getGroups(): Promise<Group[]> {
    return this.http.get(this.groupsUrl, {
      headers: new Headers({ 'Authorization': `Bearer ${this.authService.getToken()}` })
    }
    ).toPromise().then(response => {
      console.log(response.json());
      return response.json() as Group[]
    });
  }
}
