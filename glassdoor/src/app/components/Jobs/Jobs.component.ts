import { Component, OnInit } from '@angular/core';
import { JobService } from '../../components/Jobs/job.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { EmployerService } from '../../services/employer-service/employer.service';

@Component({
  selector: 'app-Jobs',
  templateUrl: './Jobs.component.html',
  styleUrls: ['./Jobs.component.css']
})
export class JobsComponent implements OnInit {

  public jobs;
  public errorMsg;

  constructor(private JobService: JobService, private route: Router) { }
  ngOnInit() {
    this.JobService.getjobs().subscribe(
      (data) => { this.jobs = data; console.log(data) },
      (error) => this.errorMsg = error,
      () => console.log("The sequence completed")
    )
  }

  onSelect(job) {
    this.route.navigate(['/employers/jobs/joblist/', job._id])
  }
}
