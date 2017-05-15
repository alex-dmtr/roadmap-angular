import { Injectable } from '@angular/core';
import { Group } from './group';
import { Headers, Http } from '@angular/http';
import { AuthHttpService } from './auth.http.service';
import { apiUrls } from './config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {
  constructor(private http: AuthHttpService) {

  }

  getGroups(): Promise<Group[]> {
    return this.http.get(apiUrls.groups())
      .toPromise().then(response => response.json() as Group[])
  }

  getGroup(groupID: number): Promise<Group> {
    return this.http.get(apiUrls.groupById(groupID))
      .toPromise().then(response => response.json() as Group);
  }

  createGroup(group: Group): Promise<any> {
    return this.http.post(apiUrls.groups(), group)
      .toPromise().then(response => response.json());
  }

  updateGroup(group: Group): Promise<Group> {
    return this.http.put(apiUrls.groupById(group.id), group)
      .toPromise().then(response => response.json() as Group);
  }
}
