import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/employer-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobsprofile',
  templateUrl: './jobsprofile.component.html',
  styleUrls: ['./jobsprofile.component.css']
})
export class JobsprofileComponent implements OnInit {

  emp: Object;
  profileData: any = {}

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.profileData = profile;
      this.emp = this.profileData.emp;
      console.log(this.emp);
      console.log('load');
    },
      err => {
        console.log(err);
        return false;
      });
  }
}
