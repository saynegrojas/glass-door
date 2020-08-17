import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreatejobsComponent } from './createjobs/createjobs.component';
import { EditjobsComponent } from './editjobs/editjobs.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobsdetailsComponent } from './jobsdetails/jobsdetails.component';
import { JobsComponent } from './Jobs.component';
import { AuthGuard2 } from '../../services/employer-service/auth2.guard';
import { AuthConfig } from 'angular2-jwt';

const routes: Routes = [
    { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard2] },
    { path: 'jobs/joblist', component: JoblistComponent, canActivate: [AuthGuard2] },
    { path: 'jobs/joblist/:id', component: JobsdetailsComponent, canActivate: [AuthGuard2] },
    { path: 'jobs/editjob/:id', component: EditjobsComponent, canActivate: [AuthGuard2] },
    { path: 'jobs/createjob', component: CreatejobsComponent, canActivate: [AuthGuard2] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class JobsRoutingModule { }
