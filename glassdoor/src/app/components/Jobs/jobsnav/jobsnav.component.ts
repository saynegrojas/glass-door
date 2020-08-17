import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/employer-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobsnav',
  templateUrl: './jobsnav.component.html',
  styleUrls: ['./jobsnav.component.css']
})
export class JobsnavComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/employers"]);
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/employers/login']);
    return false;
  }
}
