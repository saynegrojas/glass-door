import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { EmployerBranding } from "../models/employer_branding_model";
import { IEmployerBranding } from "../models/employer_branding";
import { EmployerService } from "../../../services/employer-service/employer.service";


@Component({
  selector: 'app-detail-employer-branding',
  templateUrl: './detail-employer-branding.component.html',
  styleUrls: ['./detail-employer-branding.component.css']
})
export class DetailEmployerBrandingComponent implements OnInit {
  pageTitle = 'Company Details'
  public employerId;
  public employer;
  errorMsg: string;
  employers: IEmployerBranding;

  constructor(private router: Router, private employerService: EmployerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('id'))
      let id = params.get("id");
      // this.pageTitle += `: ${id}`;
      // console.log(id);
      this.employerId = id;
      // console.log(this.userId);
    });
    this.employerService.getEmployerById(this.employerId).subscribe({
      next: (data) => {
        this.employer = data;
        console.log(this.employer);
      },
      error: (err) => (this.errorMsg = err),
    });
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path

    // ROUTE BACK TO EMPLOYER CENTER not employer-branding
    this.router.navigate(["/employers/employer-branding/list"]);
  }

}

// export class UserDetailsComponent implements OnInit {

//   constructor(
//   ) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe((params: ParamMap) => {
//       // console.log(params.get('id'))
//       let id = params.get("id");
//       // this.pageTitle += `: ${id}`;
//       // console.log(id);
//       this.userId = id;
//       // console.log(this.userId);
//     });
//     this.userService.getUsersById(this.userId).subscribe({
//       next: (data) => {
//         this.user = data;
//         console.log(this.user);
//       },
//       error: (err) => (this.errorMsg = err),
//     });
//   }
//   onBack(): void {
//     //router instance and call the navigate method and pass in a link param array
//     //param navigates back to previous path
//     this.router.navigate(["/users"]);
//   }
// }
