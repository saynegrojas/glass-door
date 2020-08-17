import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-jobsdetails',
  templateUrl: './jobsdetails.component.html',
  styleUrls: ['./jobsdetails.component.css']
})
export class JobsdetailsComponent implements OnInit {

  public id;
  public job;
  public errorMsg;

  constructor(private jobService: JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {

      let id = params.get("id");
      console.log(id)
      this.id = id;
      console.log(this.id);
    });
    this.jobService.getjobsbyID(this.id).subscribe(
      (data) => {
        this.job = data;
        console.log(data);
      },
      (error) => { this.errorMsg = error; console.log(error); }

    );
  }

  goBack() {
    this.router.navigate(['/employers/jobs']);
  }

}