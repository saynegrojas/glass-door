import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EmployerBrandingComponent } from "../employer-branding/employer-branding.component";
import { CreateEmployerBrandingComponent } from "../create-employer-branding/create-employer-branding.component";
import { EmployerNavComponent } from '../../employers/employer-nav/employer-nav.component';
import { EditEmployerBrandingComponent } from '../edit-employer-branding/edit-employer-branding.component';
import { DetailEmployerBrandingComponent } from '../detail-employer-branding/detail-employer-branding.component';
import { EmployerBrandingListComponent } from '../employer-branding-list/employer-branding-list.component';
// user components
import { RegisterComponent } from '../users/register/register.component';
import { ProfileComponent } from '../users/profile/profile.component';
import { LoginComponent } from '../users/login/login.component';

import { ValidateService } from '../../../services/employer-service/validate.service';
import { AuthService } from '../../../services/employer-service/auth.service';
import { AuthGuard } from '../../../services/employer-service/auth.guard';
import { AuthGuard2 } from '../../../services/employer-service/auth2.guard';
// import { HomeComponent } from '../../home/home.component';
import { JobsComponent } from '../../Jobs/Jobs.component';
import { AboutComponent } from '../../about/about.component';

const routes: Routes = [
  {
    path: '', component: JobsComponent, canActivate: [AuthGuard2], children: [
      { path: "jobs", loadChildren: () => import("../../Jobs/jobs.module").then((mod) => mod.JobsModule) }
    ]
  },
  { path: 'employer-branding', component: EmployerBrandingComponent, canActivate: [AuthGuard] },
  { path: 'employer-branding/create', component: CreateEmployerBrandingComponent, canActivate: [AuthGuard] },
  { path: 'employer-branding/details/:id', component: DetailEmployerBrandingComponent, canActivate: [AuthGuard] },
  { path: 'employer-branding/edit/:id', component: EditEmployerBrandingComponent, canActivate: [AuthGuard] },
  { path: 'employer-branding/list', component: EmployerBrandingListComponent, canActivate: [AuthGuard] },
  //   { path: "employers/employer-branding/delete/:id", component: UserDeleteComponent },

  // User routes /employer/
  { path: 'register', component: RegisterComponent },
  // { path: 'employers/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class EmployerRoutingModule { }
