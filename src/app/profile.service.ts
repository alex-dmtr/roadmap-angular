import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth.http.service';
import { User } from './user';
import { apiUrls } from './config';

@Injectable()
export class ProfileService {

  constructor(
    private http: AuthHttpService
  ) {

  }

  public getUser(userID: number): Promise<User> {
    return this.http.get(apiUrls.user(userID))
      .toPromise()
      .then(response => response.json());
  }

  public saveUser(user: User) {
    return this.http.put(apiUrls.user(user.id), user)
      .toPromise()
      .then(response => response.json());
  }

  public deleteUser(userID: number) {
    return this.http.delete(apiUrls.user(userID))
      .toPromise()
      .then(response => response.json());
  }
}