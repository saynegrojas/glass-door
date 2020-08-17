import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login } from '../../components/employers/users/models/login_model'
import { tokenNotExpired } from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private regUrl: string = 'http://localhost:8080/employee/register';
  private authUrl: string = 'http://localhost:8080/employee/authenticate'
  private proUrl: string = 'http://localhost:8080/employee/profile';
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  //req in backend
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.regUrl, user, { headers: headers })
      .pipe(map(res => JSON.stringify(res)))
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.authUrl, user, { headers: headers })
      .pipe(map(res => res))
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken, 'Content-Type': 'application/json' });
    return this.http.get(this.proUrl, { headers: headers })
      .pipe(map(res => res));
  }


  // fetch token from localstorage
  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log(token)
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
