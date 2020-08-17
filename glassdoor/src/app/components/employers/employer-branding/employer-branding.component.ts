import { Component, OnInit } from '@angular/core';
import { EmployerService } from "../../../services/employer-service/employer.service";
// import { filter } from "minimatch";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { IEmployerBranding } from '../models/employer_branding';
@Component({
  selector: 'app-employer-branding',
  templateUrl: './employer-branding.component.html',
  styleUrls: ['./employer-branding.component.css']
})
export class EmployerBrandingComponent implements OnInit {
  pageTitle = 'Employer Branding'
  errorMessage: string;
  // public userId;
  filterEmployer: IEmployerBranding[];
  employers: IEmployerBranding[] = [];

  //getter and setter
  _listFilter: string;
  //calls getter when data binding needs a value
  get listFilter(): string {
    //return a string after getting a value
    return this._listFilter;
  }
  //data binding calls setter when user modifies the value, passing in the changed value
  set listFilter(value: string) {
    this._listFilter = value;
    //set to filterUsers
    //condition if true, filter function passing in listFilter value
    //if false, assign entire set of users
    this.filterEmployer = this.listFilter
      ? this.filterOut(this.listFilter)
      : this.employers;
  }

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employerService.getEmployers().subscribe({
      next: (data) => {
        this.employers = data;
        this.filterEmployer = this.employers;
        console.log(this.filterEmployer);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  filterOut(filterBy: string): IEmployerBranding[] {
    //lowercase the value for comporision
    filterBy = filterBy.toLocaleLowerCase();
    //JS filter method creates a new array with elements that pass the test defined in the function
    return this.employers.filter(
      (employer: IEmployerBranding) =>
        employer.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  //route to details component
  goDetails(employer) {
    console.log(employer);
    console.log(employer._id);
    this.router.navigate(["/employers/employer-branding/details/", employer._id]);
  }

  //route to create component
  goCreate() {
    // this.userId ? this.userId : null;
    this.router.navigate(["/employers/employer-branding/create"]);
    // this.router.navigate(['/users/create', { id: this.userId }], { relativeTo: this.route });
    console.log("create");
  }

  //route to edit component
  goEdit(employer) {
    console.log("edit");
    this.router.navigate(["/employers/employer-branding/edit/", employer._id]);
  }

  //back to users
  goDelete(employer) {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this.router.navigate(["/employers/employer-branding/delete/", employer._id]);
  }

}
