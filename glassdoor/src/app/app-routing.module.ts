import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
