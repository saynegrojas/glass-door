import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: any = {};
  user: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      console.log(data)
      this.username = data;
      if (this.username.success) {
        console.log(this.user);
        this.user = this.username.user.username;
      } else {
        this.username = '';
      } // Set username
    });
  }

}
