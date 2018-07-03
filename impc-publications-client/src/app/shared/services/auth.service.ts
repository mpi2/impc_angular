import { TokenStorage } from './token-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private _http: HttpClient, private _tokenStorage: TokenStorage) { }

  login(user) {
    return this._http.post(environment.impcAuthUrl, user).toPromise().then(data => {
      this._tokenStorage.saveToken(data['token']);
      this.loggedIn = true;
    });
  }

  isLoggedIn() {
    return !!this._tokenStorage.getToken();
  }

  logout() {
    this._tokenStorage.signOut();
  }

}
