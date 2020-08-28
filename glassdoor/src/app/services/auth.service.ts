import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
// import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  // domain = ""; // Production
  url: string = "http://localhost:8080/"
  authToken;
  user;
  options;

  constructor(
    private http: HttpClient
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    // this.options = new RequestOptions({
    //   headers: new Headers({
    //     'Content-Type': 'application/json', // Format set to JSON
    //     'authorization': this.authToken // Attach token
    //   })
    // });
    this.options = new HttpHeaders({ 'Authorization': this.authToken, 'Content-Type': 'application/json' });
    // headers.append('authorization': this.authToken 'Content-Type', 'application/json')
    return this.options;
  }

  // Function to get token from client local storage
  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token; // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'authentication/register', user, { headers: headers }).pipe(map(res => JSON.stringify(res)))
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.url + 'authentication/checkUsername/' + username).pipe(map(res => JSON.stringify(res)));
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.url + 'authentication/checkEmail/' + email).pipe(map(res => JSON.stringify(res)));
  }

  // Function to login user
  login(user: any) {
    let headers = new HttpHeaders();
    console.log(headers);
    headers.append('Content-Type', 'application/json')
    return this.http.post(this.url + 'authentication/login', user, { headers: headers }).pipe(map(res => res));
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.url + 'authentication/profile', this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.url + 'authentication/publicProfile/' + username, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to check if user is logged in
  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
