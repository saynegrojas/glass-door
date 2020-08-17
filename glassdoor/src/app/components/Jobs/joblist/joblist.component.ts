import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  public jobs;
  jobLength: number;
  public errorMsg;
  public dataFromChild;
  page: number = 1;

  constructor(private JobService: JobService, private route: Router) { }

  ngOnInit(): void {
    this.JobService.getjobs().subscribe(
      (data) => { this.jobs = data; console.log(data), this.jobLength = data.length },
      (error) => this.errorMsg = error,
      () => console.log("The sequence completed")
    )

  }

  handleNotify(eventData) {
    this.dataFromChild = eventData;
  }

  onSelect(job) {

    this.route.navigate(['/employers/jobs/joblist/', job._id])

  }

  editjob(job) {
    this.route.navigate(['/employers/jobs/editjob/', job._id]);
  }

  createjob() {
    this.route.navigate(['/employers/createjobs']);
  }

  deletejob(job) {
    this.JobService.deleteJob(job._id).subscribe(() => {
      this.JobService.getjobs().subscribe(
        (data) => this.jobs = data,
        (error) => this.errorMsg = error
      )
    })

  }

}
