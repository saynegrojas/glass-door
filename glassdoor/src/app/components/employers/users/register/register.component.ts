import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register_model';
import { IRegister } from '../models/register';
import { ValidateService } from '../../../../services/employer-service/validate.service';
import { AuthService } from '../../../../services/employer-service/auth.service';
import { Router } from '@angular/router';
import { JobOpening } from '../../../employers/models/job-opening';
// import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public regModel = new Register();
  reg: IRegister[];
  regData: any = {};
  errorMessage: string;

  // firstName: String;
  // lastName: String;
  // workEmail: String;
  // jobOpening: String;
  // password: String;
  // company: String;
  // jobTitle: String
  // regData: any ={};

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  public openings: JobOpening[];

  ngOnInit() {

    this.openings = [
      { id: 1, opening: '1-5' },
      { id: 2, opening: '6-10' },
      { id: 3, opening: '21-50' },
      { id: 4, opening: '51-100' },
      { id: 5, opening: '100+' },
      { id: 6, opening: 'No open jobs' },
    ]
  }

  onRegisterSubmit(empForm) {
    // const user = {
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   workEmail: this.workEmail,
    //   jobOpening: this.jobOpening,
    //   password: this.password,
    //   company: this.company,
    //   jobTitle: this.jobTitle
    // }
    const user = this.regModel;
    console.log(user);

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.workEmail)) {
      console.log('Please use a valid email');
      return false;
    }

    // register user
    this.authService.registerUser(user).subscribe(
      // this.regData = data;
      (data) => {
        this.regData = data;
        this.reg = this.regData;
      },
      (error) => (this.errorMessage = error)
      // if (data) {
      //   this.reg = data;

      //   console.log('Registered');
      //   // this.router.navigate(['/login'])
      // } else {
      //   console.log('Could not register');
      // }
    )
  }
}