//modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { EmployerRoutingModule } from '../employer-routing/employer-routing.module';
import { JobsModule } from '../../Jobs/jobs.module';

//components
import { EmployerBrandingComponent } from "./employer-branding.component";
import { CreateEmployerBrandingComponent } from "../create-employer-branding/create-employer-branding.component";
import { EmployerNavComponent } from '../../employers/employer-nav/employer-nav.component';
import { EditEmployerBrandingComponent } from '../edit-employer-branding/edit-employer-branding.component';
import { DetailEmployerBrandingComponent } from '../detail-employer-branding/detail-employer-branding.component';
import { EmployerBrandingListComponent } from '../employer-branding-list/employer-branding-list.component';

// user components
import { RegisterComponent } from '../users/register/register.component';
import { ProfileComponent } from '../users/profile/profile.component';
import { LoginComponent } from '../users/login/login.component';

//providers
import { EmployerService } from "../../../services/employer-service/employer.service";
import { ValidateService } from '../../../services/employer-service/validate.service';
import { AuthService } from '../../../services/employer-service/auth.service';
import { AuthGuard } from '../../../services/employer-service/auth.guard';
import { AuthGuard2 } from '../../../services/employer-service/auth2.guard';
// import { JobService } from '../../Jobs/job.service';

@NgModule({
    declarations: [
        // Employer-branding
        EmployerBrandingComponent,
        CreateEmployerBrandingComponent,
        EmployerNavComponent,
        EditEmployerBrandingComponent,
        DetailEmployerBrandingComponent,
        EmployerBrandingListComponent,
        // User
        RegisterComponent,
        ProfileComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        EmployerRoutingModule,
        JobsModule

    ],
    exports: [EmployerNavComponent, CommonModule],
    providers: [EmployerService, ValidateService, AuthService, AuthGuard, AuthGuard2]
})
export class EmployerBrandingModule { }
// export { EmployerNavComponent } from '../employer-nav/employer-nav.component';
