import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewComponent } from './components/review/review.component';
import { EditReviewComponent } from './components/review/edit-review/edit-review.component';
import { DeleteReviewComponent } from './components/review/delete-review/delete-review.component';

import { NotAuthGuard } from './guards/notAuth.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'edit-review/:id', component: EditReviewComponent, canActivate: [AuthGuard] },
  { path: 'delete-review/:id', component: DeleteReviewComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "employers", pathMatch: "full" },
  {
    path: "employers",
    loadChildren: () =>
      import("../app/components/employers/employer-branding/employer-branding.module").then((mod) => mod.EmployerBrandingModule),
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
