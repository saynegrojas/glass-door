// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployerBrandingModule } from '../employers/employer-branding/employer-branding.module';
import { JobsRoutingModule } from './Jobs-routing.module';

// components
import { JobsdetailsComponent } from './jobsdetails/jobsdetails.component';
import { JoblistComponent } from './joblist/joblist.component';
import { EditjobsComponent } from './editjobs/editjobs.component';
import { CreatejobsComponent } from './createjobs/createjobs.component';
import { JobsComponent } from './Jobs.component';
import { JobsnavComponent } from './jobsnav/jobsnav.component';
// import { ProfileComponent } from '../employers/users/profile/profile.component';
// import { EmployerNavComponent } from '../employers/employer-nav/employer-nav.component';

// services
import { JobService } from '../../services/job.service';
import { EmployerService } from '../../services/employer-service/employer.service';
import { AuthService } from '../../services/employer-service/auth.service';
import { AuthGuard } from '../../services/employer-service/auth.guard';
import { JobsprofileComponent } from './jobsprofile/jobsprofile.component';


@NgModule({
  declarations: [
    JobsComponent,
    JobsdetailsComponent,
    JoblistComponent,
    EditjobsComponent,
    CreatejobsComponent,
    JobsnavComponent,
    JobsprofileComponent,
    // ProfileComponent
  ],

  imports: [
    CommonModule,
    // BrowserModule,
    HttpClientModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [JobService, EmployerService, AuthService, AuthGuard],
  bootstrap: []
})
export class JobsModule { }
