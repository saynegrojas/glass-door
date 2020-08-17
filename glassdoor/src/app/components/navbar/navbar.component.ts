import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/employer-service/auth.service';
import { Router } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    // private flashMessagesService: FlashMessagesService
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    // this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      }); // Navigate back to home page
    return false;
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/"]);
  }

  ngOnInit() {
  }

}
