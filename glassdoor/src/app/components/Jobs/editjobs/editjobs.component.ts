import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobService } from '../job.service'
import { JobTypes } from '../../../jobtypes';
import { States } from '../../../states';
import { EmployerService } from '../../../services/employer-service/employer.service';

@Component({
  selector: 'app-editjobs',
  templateUrl: './editjobs.component.html',
  styleUrls: ['./editjobs.component.css']
})
export class EditjobsComponent implements OnInit {

  jobID;
  jobs;
  errorMsg;
  public state: States[];
  public type: JobTypes[];
  //editjobsForm;
  empBrands;

  constructor(private actRoute: ActivatedRoute, private fb: FormBuilder, private JobService: JobService, private route: Router, private empService: EmployerService) { }


  public editjobForm = this.fb.group({
    Job_Title: ['', [Validators.required, Validators.minLength(3)]],
    Job_Location: ['', [Validators.required, Validators.minLength(3)]],
    Job_Description: ['', [Validators.required, Validators.minLength(3)]],
    Salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    Company_Name: ['', [Validators.required, Validators.minLength(3)]],
    Job_Type: ['',],
    Poste_Date: ['', [Validators.required, Validators.minLength(3)]],
    App_Deadeline: ['', [Validators.required, Validators.minLength(3)]]

  });

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
      this.actRoute.paramMap.subscribe((params: ParamMap) => {
        let id = params.get('id');
        console.log(id)
        this.jobID = id;
        console.log(this.jobID);
        this.jobs = this.JobService.getjobsbyID(this.jobID).subscribe(
          (data) => {
            this.jobs = data; console.log(data);
            this.editjobForm = this.fb.group({
              Job_Title: [this.jobs.Job_Title, [Validators.required, Validators.minLength(3)]],
              Job_Location: [this.jobs.Job_Location, [Validators.required, Validators.minLength(3)]],
              Job_Description: [this.jobs.Job_Description, [Validators.required, Validators.minLength(3)]],
              Salary: [this.jobs.Salary, [Validators.required, Validators.pattern('^[0-9]+$')]],
              Company_Name: [this.jobs.Company_Name, [Validators.required, Validators.minLength(3)]],
              Job_Type: [this.jobs.Job_Type, [Validators.required, Validators.minLength(3)]],
              Poste_Date: [this.jobs.Poste_Date, [Validators.required, Validators.minLength(3)]],
              App_Deadeline: [this.jobs.App_Deadeline, [Validators.required, Validators.minLength(3)]]
            });
          },
          (error) => { this.errorMsg = error; console.log(error); }
        );
      });
  }


  get Job_Title() {
    return this.editjobForm.get('Job_Title');
  }

  get Job_Location() {
    return this.editjobForm.get('Job_Location');
  }

  get Job_Description() {
    return this.editjobForm.get('Job_Description');
  }

  get Salary() {
    return this.editjobForm.get('Salary');
  }

  get Company_Name() {
    return this.editjobForm.get('Company_Name');
  }

  get Job_Type() {
    return this.editjobForm.get('Job_Type');
  }

  get Poste_Date() {
    return this.editjobForm.get('Poste_Date');
  }

  get App_Deadeline() {
    return this.editjobForm.get('App_Deadeline');
  }



  update(jobID, editjobForm) {
    console.log(this.jobID);
    console.log(this.editjobForm);
    this.JobService.updateJob(this.jobID, this.editjobForm.value).subscribe(
      (data) => { this.jobs = data; console.log(data); },
      (error) => { this.errorMsg = error; console.log(error); }
    )
    this.route.navigate(['/employers/jobs/joblist']);
  }


}
