import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard2 implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/employers/login']);
            return false;
        }
    }
}