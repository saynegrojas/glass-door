import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.firstName == undefined || user.lastName == undefined || user.workEmail == undefined || user.jobTitle == undefined || user.password == undefined || user.jobOpening == undefined || user.company == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(workEmail) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(workEmail);
  }

}
