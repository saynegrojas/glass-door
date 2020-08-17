import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/employer-service/auth.service';
import { Router } from '@angular/router';
import { Login } from '../models/login_model';
import { ILogin } from '../models/login';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: ILogin[];
  errorMessage: string;
  workEmail: string;
  password: string;
  loginData: any = {};
  public logModel = new Login();

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }

  onLoginSubmit() {
    // console.log(this.workEmail);

    const user = {
      workEmail: this.workEmail,
      password: this.password
    }

    // const user = this.logModel;
    // this.logModel = user;

    console.log(user);

    // this.authService.authenticateUser(this.userModel).subscribe(data => {
    //   // data => (this.userModel = data),
    //   // error => (this.errorMessage = error)
    //   // (data) => (this.user = data),
    //   // (error) => (this.errorMessage = error)
    //   console.log(data);
    //   if (data) {
    //     console.log('logged in');
    //     this.router.navigate(['login'])
    //   } else {
    //     console.log('login failed');
    //     this.router.navigate(['login'])
    //   }
    // })
    this.authService.authenticateUser(user).subscribe(data => {

      this.loginData = data;
      console.log(this.loginData)

      if (this.loginData.success) {
        console.log(this.loginData)

        console.log(this.loginData.success);
        console.log('logged in');
        this.authService.storeUserData(this.loginData.token, this.loginData.user);

        this.router.navigate(['employers/employer-branding']);
        // console.log(this.logModel);

      } else {
        this.errorMessage = 'log in failed';
        console.log(this.errorMessage);

        this.router.navigate(['employers/login']);

        user.workEmail = '';
        user.password = '';

      }
    }, error => this.errorMessage = error);

  }

}
