import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  onBack(): void {
    //router instance and call the navigate method and pass in a link param array
    //param navigates back to previous path
    this._location.back();
  }

}
