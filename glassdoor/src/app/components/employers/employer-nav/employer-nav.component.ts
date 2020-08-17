import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/employer-service/auth.service';
@Component({
  selector: 'app-employer-nav',
  templateUrl: './employer-nav.component.html',
  styleUrls: ['./employer-nav.component.css']
})
export class EmployerNavComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
  }

  // logout
  // direct to members
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/employers/employer-branding"]);
  }
  goCreate() {
    // this.userId ? this.userId : null;
    this.router.navigate(["/employers/employer-branding/create"]);
    // this.router.navigate(['/users/create', { id: this.userId }], { relativeTo: this.route });
    console.log("create");
  }
  // onLogout() {
  //   this.authService.logout();
  //   this.router.navigate(['']);
  // }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/employers/login']);
    return false;
  }
}
