import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  pageTitle = "glassdoor"
  constructor(private _location: Location) { }

  ngOnInit() {
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this._location.back();
  }

}
