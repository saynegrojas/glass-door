import { Component, OnInit } from '@angular/core';
import { IEmployerBranding } from '../models/employer_branding';
import { EmployerService } from '../../../services/employer-service/employer.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employer-branding-list',
  templateUrl: './employer-branding-list.component.html',
  styleUrls: ['./employer-branding-list.component.css']
})
export class EmployerBrandingListComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }
  // cardClick() {
  //   console.log('click');
  // }
  errorMessage: string;
  dataFromChild: string;
  // public userId;
  filterEmployers: IEmployerBranding[];
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
    this.filterEmployers = this.listFilter
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
      next: (employers) => {
        this.employers = employers;
        this.filterEmployers = this.employers;
        console.log(this.filterEmployers);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  filterOut(filterBy: string): IEmployerBranding[] {
    //lowercase the value for comporision
    filterBy = filterBy.toLocaleLowerCase();
    //JS filter method creates a new array with elements that pass the test defined in the function
    return this.employers.filter(
      (user: IEmployerBranding) =>
        user.company.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  cardClick() {
    console.log('click');
  }
  //route to details component
  goDetails(employer) {
    console.log(employer);
    console.log(employer._id);
    this.router.navigate(["/employers/employer-branding/details/", employer._id]);
  }

  //route to create component
  // goCreate() {
  //   // this.userId ? this.userId : null;
  //   this.router.navigate(["/users/create"]);
  //   // this.router.navigate(['/users/create', { id: this.userId }], { relativeTo: this.route });
  //   console.log("create");
  // }

  //route to edit component
  // goEdit(user) {
  //   console.log("edit");
  //   this.router.navigate(["/users/edit/", user.UserID]);
  // }

  //back to users
  // goDelete(user) {
  //   //router instance and call the navigate method and pass in a link param array
  //   //param navigates back to previous path
  //   this.router.navigate(["/users/delete/", user.UserID]);
  // }

}
