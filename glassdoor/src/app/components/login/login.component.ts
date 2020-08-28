import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass: string;
  message: any;
  processing: boolean = false;
  form: any;
  previousUrl: string;
  loginData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public authGuard: AuthGuard
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // modalClose(): void {
  //   this.router.navigate(['/review']);
  // }
  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe(data => {
      console.log(data)
      this.loginData = data;
      // Check if response was a success or error
      if (!this.loginData.success) {
        this.messageClass = 'alert alert-success'; // Set bootstrap error class
        this.message = this.loginData; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
        user.username = '';
        user.password = '';
      } else {
        // this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = this.loginData; // Set success message
        // Function to store user's token in client local storage
        this.authService.storeUserData(this.loginData.token, this.loginData.user);
        // After 2 seconds, redirect to dashboard page
        this.router.navigate(['/review'])
        // setTimeout(() => {
        //   // Check if user was redirected or logging in for first time
        //   if (this.previousUrl) {
        //     this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
        //   } else {
        //     this.router.navigate(['/']); // Navigate to dashboard view
        //   }
        // }, 2000);
      }
    });
  }

  ngOnInit() {
    // On page load, check if user was redirected to login
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
  }

}
