import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { States } from '../../../states'
import { JobTypes } from '../../../jobtypes';
import { EmployerService } from '../../../services/employer-service/employer.service'
@Component({
  selector: 'app-createjobs',
  templateUrl: './createjobs.component.html',
  styleUrls: ['./createjobs.component.css']
})
export class CreatejobsComponent implements OnInit {

  public jobForm;
  jobs;
  errorMsg;
  public state: States[];
  public type: JobTypes[];
  empBrands;

  constructor(private fb: FormBuilder, private JobService: JobService, private route: Router, private empService: EmployerService) { }

  ngOnInit(): void {
    this.empService.getEmployers().subscribe(
      (data) => { this.empBrands = data; console.log(data) },
      (error) => this.errorMsg = error,
      () => console.log("The sequence completed")
    )

    this.state = [
      new States(1, "Alabama"), new States(2, "Alaska"), new States(3, "Arizona"),
      new States(4, "Arkansas"), new States(5, "California"), new States(6, "Colorado"),
      new States(7, "Connecticut"), new States(8, "Delaware"), new States(9, "Florida"),
      new States(10, "Georgia"), new States(11, "Hawaii"), new States(12, "Idaho"),
      new States(13, "Illinois"), new States(14, "Indiana"), new States(15, "Iowa"),
      new States(16, "Kansas"), new States(17, "Kentucky"), new States(18, "Louisiana"),
      new States(19, "Maine"), new States(20, "Maryland"), new States(21, "Massachusetts"),
      new States(22, "Michigan"), new States(23, "Minnesota"), new States(24, "Mississippi"),
      new States(25, "Missouri"), new States(26, "Alaska"), new States(27, "Alaska"),
      new States(28, "Alaska"), new States(29, "Alaska"), new States(30, "Alaska"),
      new States(31, "Alaska"), new States(32, "Alaska"), new States(33, "Alaska"),
      new States(34, "Alaska"), new States(35, "Alaska"), new States(36, "Alaska"),
      new States(37, "Alaska"), new States(38, "Alaska"), new States(39, "Alaska"),
      new States(40, "Alaska"), new States(41, "Alaska"), new States(42, "Alaska"),
      new States(43, "Alaska"), new States(44, "Alaska"), new States(45, "Alaska"),
      new States(46, "Alaska"), new States(47, "Alaska"), new States(48, "Alaska"),
      new States(49, "Alaska"), new States(50, "Alaska")

    ],

      this.type = [
        new JobTypes(1, "Full Time"),
        new JobTypes(2, "Part Time"),
        new JobTypes(3, "Internship"),
        new JobTypes(4, "Temporary")

      ],
      this.jobForm = this.fb.group({
        Job_Title: ['', [Validators.required, Validators.minLength(3)]],
        Job_Location: ['', [Validators.required, Validators.minLength(3)]],
        Job_Description: ['', [Validators.required, Validators.minLength(3)]],
        Salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        Company_Name: ['', [Validators.required, Validators.minLength(3)]],
        Job_Type: ['',],
        Poste_Date: ['', [Validators.required, Validators.minLength(3)]],
        App_Deadeline: ['', [Validators.required, Validators.minLength(3)]]

      });
  }

  onSubmit() {
    console.log(this.jobForm.value);
    this.JobService.postJob(this.jobForm.value).subscribe(
      (data) => {
        this.jobs = data;
        console.log(this.jobs);
        this.JobService.getjobs().subscribe(
          (data) => this.jobs = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => this.errorMsg = error
    )
    this.route.navigate(['/employers/jobs/joblist']);
    this.jobForm.reset();
  }

  get Job_Title() {
    return this.jobForm.get('Job_Title');
  }

  get Job_Location() {
    return this.jobForm.get('Job_Location');
  }

  get Job_Description() {
    return this.jobForm.get('Job_Description');
  }

  get Salary() {
    return this.jobForm.get('Salary');
  }

  get Company_Name() {
    return this.jobForm.get('Company_Name');
  }

  get Job_Type() {
    return this.jobForm.get('Job_Type');
  }

  get Poste_Date() {
    return this.jobForm.get('Poste_Date');
  }

  get App_Deadeline() {
    return this.jobForm.get('App_Deadeline');
  }


}
