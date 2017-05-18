import { Injectable } from '@angular/core';
import { Group } from './group';
import { User } from './user';
import { Headers, Http } from '@angular/http';
import { AuthHttpService } from './auth.http.service';
import { apiUrls } from './config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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

  public removeFromGroup(groupID: number, userID: number): Promise<any> {
    return this.http.delete(apiUrls.groupRemoveMember(groupID, userID))
      .toPromise().then(response => response.json());
  }

  public addPost(groupID: number, userID: number, message: string) {
    return this.http.post(apiUrls.groupPosts(groupID), {
      ownerId: userID,
      groupId: groupID,
      message: message
    }).toPromise()
      .then(response => response.json());
  }

  public savePost(groupID: number, postID: number, message: string) {
    return this.http.put(apiUrls.groupPost(groupID, postID), {
      message
    })
      .toPromise()
      .then(response => response.json());
  }

  public deletePost(groupID: number, postID: number) {
    return this.http.delete(apiUrls.groupPost(groupID, postID))
      .toPromise()

  }

  public searchUsers({term}: { term: string }): Observable<User[]> {
    return this.http
      .get(apiUrls.usersSearch(term))
      .map(response => {
        console.log(response.json());

        return response.json() as User[]
      });

  }
}
