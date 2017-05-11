import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

const UID = 'local.user.angular';

export class LocalUser {

  id: number;
  username: string;
  jwt: string;
  isAuth: boolean = false;

  public save() {
    localStorage.setItem(UID, JSON.stringify(this));
  }

  public fetch() {
    var properties = (JSON.parse(localStorage.getItem(UID)));

    if (properties && typeof (properties) === 'object')
      Object.keys(properties).forEach(key => {
        this[key] = properties[key];
      });
  }

  public destroy() {
    localStorage.removeItem(UID);
    this['id'] = this['username'] = this['jwt'] = null;
    this['isAuth'] = false;
  }
}

@Injectable()
export class AuthService {
  user: LocalUser = new LocalUser();

  /**
   * LocalUser observable stream. Will update on login/logout.
   * 
   */
  user$: Observable<LocalUser>;
  private handlers: any[] = [];
  private loginUrl = `http://localhost:3000/api/auth`;

  private notifyHandlers() {
    this.handlers.forEach((subscriber: any) => {
      subscriber.next(this.user);
    });
  }
  constructor(private http: Http) {

    this.user.fetch();

    this.user$ = new Observable<LocalUser>((subscriber: any) => {
      this.handlers.push(subscriber);
      subscriber.next(this.user);
    });

  }

  public isAuthenticated(): boolean {
    return this.user.isAuth && this.user.jwt != null;
  }

  public getToken(): string {
    if (!this.isAuthenticated())
      throw new Error('User not authenticated');
    return this.user.jwt;
  }

  public doLogin(username: string, password: string): Promise<LocalUser> {
    return this.http.post(this.loginUrl, { username, password })
      .toPromise().then(response => {
        var data = response.json();


        this.user.isAuth = true;
        this.user.username = data.user.username;
        this.user.id = data.user.id;
        this.user.jwt = data.jwt;

        this.user.save();

        this.notifyHandlers();

        return Promise.resolve(this.user);
      });
  }

  public doLogout() {
    this.user.destroy();

    this.notifyHandlers();
  }
}


