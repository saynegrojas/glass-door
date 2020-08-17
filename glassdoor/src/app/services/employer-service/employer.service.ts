import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, /*map*/ } from "rxjs/operators";
// import { FormGroup, AbstractControl } from "@angular/forms";

//employer
import { IEmployerBranding } from '../../components/employers/models/employer_branding';
import { EmployerBranding } from '../../components/employers/models/employer_branding_model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private url: string = 'http://localhost:8080/employers/employer_branding'
  constructor(private http: HttpClient) { }


  // get
  getEmployers(): Observable<IEmployerBranding[]> {
    console.log(this.url);
    return this.http.get<IEmployerBranding[]>(this.url).pipe(
      tap((data) => console.log("All " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // get/:id
  getEmployerById(id: number): Observable<IEmployerBranding[]> {
    return this.http.get<IEmployerBranding[]>(this.url + "/" + id).pipe(
      tap((data) => console.log("All " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //put/:id + data
  updateEmployer(id: number, employerData): Observable<IEmployerBranding[]> {
    console.log(employerData);
    console.log(this.url + "/" + id);
    return this.http
      .put<IEmployerBranding[]>(this.url + "/" + id, employerData)
      .pipe(catchError(this.handleError));
  }

  //delete/:id
  deleteEmployer(id) {
    return this.http.delete(this.url + "/" + id);
  }

  //post/:id + data
  postEmployer(employerData): Observable<EmployerBranding[]> {
    console.log(employerData)
    return this.http.post<EmployerBranding[]>(this.url, employerData).pipe(
      tap((data) => console.log("Post" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // validateUsernameNotTaken(control: AbstractControl) {
  //   return this.checkUsernameNotTaken(control.value).pipe(
  //     map(res => {
  //       return res ? null : { emailTaken: true };
  //     })
  //   );
  // }

  //Fake API call -- You can have this in another service
  // checkUsernameNotTaken(workEmail: string): Observable<boolean> {
  //   return this.http.get(this.url).pipe(
  //     map((employerData: IEmployerBranding[]) =>
  //       employerData.filter(e => e.workEmail === workEmail)
  //     ),
  //     map(e => !e.length)
  //   );
  // }

  // error handler
  private handleError(err: HttpErrorResponse) {
    //in a real world app, we may send server to some remote logging infrastructure
    //instead of just logging it the console
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      //client-side or network error occurred, handle it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}