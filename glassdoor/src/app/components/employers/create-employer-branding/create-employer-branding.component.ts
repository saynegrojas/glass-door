import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployerService } from "../../../services/employer-service/employer.service";
import { EmployerBranding } from "../models/employer_branding_model";
import { IEmployerBranding } from "../models/employer_branding";
import { Countries } from '../models/countries';
import { JobOpening } from '../models/job-opening';
// import { FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-create-employer-branding',
  templateUrl: './create-employer-branding.component.html',
  styleUrls: ['./create-employer-branding.component.css']
})
export class CreateEmployerBrandingComponent implements OnInit {
  pageTitle = "Create";
  employers: IEmployerBranding[];
  errorMessage: string;

  constructor(private router: Router, private employerService: EmployerService, /*private fb: FormBuilder*/) { }

  public empModel = new EmployerBranding();
  public countries: Countries[];
  public countrySelected: Number;
  public modifiedText: String;

  public openings: JobOpening[];
  public openSelected: Number;

  // empForm = this.fb.group(
  //   {
  //     workEmail: ["", [Validators.required, Validators.minLength(3)], this.employerService.validateUsernameNotTaken.bind(this.employerService)]
  //   }
  // )

  ngOnInit() {
    this.countries = [
      { id: 1, name: 'United States' },
      { id: 2, name: 'Canada' },
      { id: 3, name: 'Japan' },
      { id: 4, name: 'Peru' }
    ];
    this.countrySelected = 1;

    this.openings = [
      { id: 1, opening: '1-5' },
      { id: 2, opening: '6-10' },
      { id: 3, opening: '21-50' },
      { id: 4, opening: '51-100' },
      { id: 5, opening: '100+' },
      { id: 6, opening: 'No open jobs' },
    ]
  }



  //on submit
  onSubmit(empForm) {
    console.log(empForm);
    this.employerService.postEmployer(this.empModel).subscribe(
      (data) => (this.employers = data),
      (error) => (this.errorMessage = error)
    );
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/employers/employer-branding"]);
  }

  onEmployeeSelected(val: any) {
    this.custom(val);
  }
  custom(val: any) {
    this.modifiedText = val;
  }

  // get workEmail() {
  //   return this.empForm.get("workEmail");
  // }

}
