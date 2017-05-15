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

  public getGroups(): Promise<Group[]> {
    return this.http.get(apiUrls.groups())
      .toPromise().then(response => response.json() as Group[])
  }

  public getGroup(groupID: number): Promise<Group> {
    return this.http.get(apiUrls.groupById(groupID))
      .toPromise().then(response => response.json() as Group);
  }

  public createGroup(group: Group): Promise<any> {
    return this.http.post(apiUrls.groups(), group)
      .toPromise().then(response => response.json());
  }

  public updateGroup(group: Group): Promise<Group> {
    return this.http.put(apiUrls.groupById(group.id), group)
      .toPromise().then(response => response.json() as Group);
  }

  public joinGroup(groupID: number, userID: number): Promise<any> {
    return this.http.put(apiUrls.joinGroup(groupID, userID), {})
      .toPromise().then(response => response.json());
  }

  public deleteGroup(groupID: number): Promise<any> {
    return this.http.delete(apiUrls.groupById(groupID))
      .toPromise().then(response => response.json());
  }
}
