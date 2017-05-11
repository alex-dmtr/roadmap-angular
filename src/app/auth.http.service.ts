import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Headers, Http, Response, ResponseOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthHttpService {
  constructor(private http: Http, private authService: AuthService) {

  }

  private appendHeaders(options?: ResponseOptionsArgs) {
    let _options: ResponseOptionsArgs = options || {};

    _options.headers = _options.headers || new Headers();

    _options.headers.append('Authorization', `Bearer ${this.authService.getToken()}`);

    return _options;
  }

  get(url: string, options?: ResponseOptionsArgs): Observable<Response> {
    let _options = this.appendHeaders(options);

    return this.http.get(url, _options);
  }
}